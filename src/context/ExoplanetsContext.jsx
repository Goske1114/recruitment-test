import { createContext, useContext, useState, useEffect } from "react";
import {
  createExoplanetRequest,
  getExoplanetsRequest,
  getExoplanetsCountRequest,
  deleteExoplanetRequest,
  getExoplanetRequest,
  updateExoplanetRequest,
} from "../api/exoplanet";
import { floor } from 'exact-math'
import { PAGE_SIZE } from "../constants/pagenation";

const ExoplanetsContext = createContext();

export const useExoplanets = () => {
  const context = useContext(ExoplanetsContext);
  if (!context) {
    throw new Error("useExoplanets must be used within an ExoplanetsProvider");
  }
  return context;
};

export function ExoplanetProvider({ children }) {
  const [Exoplanets, setExoplanets] = useState([]); // Cambiado a [Exoplanets, setExoplanets]
  const [pattern, setPattern] = useState('')
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  // clear errors after 5 seconds
  useEffect(() => {
    if (err !== '') {
      const timer = setTimeout(() => {
        setErr('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [err]);

  const getExoplanets = async () => {
    try {
      setLoading(true)
      const res = await getExoplanetsRequest(page); // ✅ Llamamos a la API correctament

      // set max page
      let max = floor(res.data.count / PAGE_SIZE, 1)
      if (max * PAGE_SIZE == res.data.count)
        max = max - 1
      setMaxPage(max)

      // set exolanets data
      setExoplanets(res.data.exoplanets); // Actualizamos la lista de tareas
      setLoading(false)
    } catch (error) {
      setErr(error.response.data.message)
    }
  };
  const createExoplanet = async (Exoplanet) => {
    try {
      const res = await createExoplanetRequest(Exoplanet); // ✅ Llamamos a la API correctamente
      setExoplanets([...Exoplanets, {...Exoplanet, ...res.data}]); // Agregamos la nueva tarea a la lista
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };
  const deleteExoplanet = async (id) => {
    try {
      const res = await deleteExoplanetRequest(id);
      if (res.status === 204) {
        await getExoplanets()
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getExoplanet = async (id) => {
    try {
      const res = await getExoplanetRequest(id);
      return res.data;
    } catch (error) {
      setErr(error.response.data.message)
      return {}
    }
  };

  const updateExoplanet = async (id, Exoplanet) => {
    try {
      await updateExoplanetRequest(id, Exoplanet);
    } catch (error) {
      console.error(error);
    }
  };

  const changePattern = (newPattern) => {
    setPattern(newPattern)
  }

  const nextPage = () => {
    if (page < maxPage)
      setPage(page + 1)
  }
  const prevPage = () => {
    if (page > 0)
      setPage(page - 1)
  }

  return (
    <ExoplanetsContext.Provider
      value={{ 
        Exoplanets, 
        createExoplanet, 
        getExoplanets, 
        deleteExoplanet, 
        getExoplanet, 
        updateExoplanet,
        pattern,
        changePattern,
        page,
        maxPage,
        nextPage,
        prevPage,
        loading,
        setLoading,
        err,
        setErr,
      }}
    >
      {children}
    </ExoplanetsContext.Provider>
  );
}
