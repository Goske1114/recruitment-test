import { createContext, useContext, useState, useEffect } from "react";
import {
  createExoplanetRequest,
  getExoplanetsRequest,
  deleteExoplanetRequest,
  getExoplanetRequest,
  updateExoplanetRequest,
} from "../api/exoplanet";
import { floor } from 'exact-math'
import { PAGE_SIZE } from "../constants/config";

const ExoplanetsContext = createContext();

export const useExoplanets = () => {
  const context = useContext(ExoplanetsContext);
  if (!context) {
    throw new Error("useExoplanets must be used within an ExoplanetsProvider");
  }
  return context;
};

export function ExoplanetProvider({ children }) {
  const [Exoplanets, setExoplanets] = useState([]);
  const [pattern, setPattern] = useState('')
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [yesnoOpen, setYesNoOpen] = useState({open: false, callback: () => {}})
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
      const res = await getExoplanetsRequest(page);

      // set max page
      let max = floor(res.count / PAGE_SIZE, 1)
      if (max * PAGE_SIZE == res.count)
        max = max - 1
      setMaxPage(max)

      // set exolanets data
      setExoplanets(res.exoplanets);
      setLoading(false)
    } catch (error) {
      setErr(error.message)
    }
  };
  const createExoplanet = async (Exoplanet) => {
    try {
      const res = await createExoplanetRequest(Exoplanet);
      await getExoplanets()
    } catch (error) {
      setErr(error.message)
    }
  };
  const deleteExoplanet = (id) => {
    setYesNoOpen({
      open: true,
      callback: async () => {
        try {
          await deleteExoplanetRequest(id);
          await getExoplanets()
        } catch (error) {
          console.error(error);
        }
      }
    })
  };

  const getExoplanet = async (id) => {
    try {
      const res = await getExoplanetRequest(id);
      return res;
    } catch (error) {
      setErr(error.message)
      return {}
    }
  };

  const updateExoplanet = async (id, Exoplanet) => {
    try {
      await updateExoplanetRequest(id, Exoplanet);
    } catch (error) {
      setErr(error.message)
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
        yesnoOpen,
        setYesNoOpen,
        err,
        setErr,
      }}
    >
      {children}
    </ExoplanetsContext.Provider>
  );
}
