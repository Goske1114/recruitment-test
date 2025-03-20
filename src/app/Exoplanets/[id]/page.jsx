'use client'
import { useForm } from "react-hook-form";
import { useExoplanets } from "../../../context/ExoplanetsContext.jsx";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { createValidation } from "../../../utils/exoplanetValidation.js";

dayjs.extend(utc);
function ExoplanetFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createExoplanet, getExoplanet, updateExoplanet, setErr } = useExoplanets();
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    async function loadExoplanet() {
      if (params.id) {
        const Exoplanet = await getExoplanet(params.id);
        setValue("name", Exoplanet.name);
        setValue("discoverYear", Exoplanet.discoverYear);
        setValue("distance", Exoplanet.distance);
        setValue("description", Exoplanet.description);
        setValue("url", Exoplanet.url);
      }
    }
    loadExoplanet();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if ( !createValidation(data) ) {
      setErr('Input is not correct.')
      return
    }
    if (params.id) {
      updateExoplanet(params.id, data);
    } else {
      createExoplanet(data);
    }
    router.push("/");
  });
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Name</label>
        <input
          type="text"
          placeholder="Name of Exoplanet"
          {...register("name")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "
          autoFocus
        />
        <label htmlFor="title">Distance from the Earth</label>
        <input
          type="text"
          placeholder="Distance from the Earth"
          {...register("distance")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "
          autoFocus
        />
        <label htmlFor="title">Discovery Year</label>
        <input
          type="text"
          placeholder="Distance from the Earth"
          {...register("discoverYear")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "
          autoFocus
        />
        <label htmlFor="description">Description</label>
        <textarea
          rows="5"
          placeholder="Description"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("description")}
        />
        <label htmlFor="title">Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          {...register("url")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "
          autoFocus
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md my-2 hover:bg-blue-700">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default ExoplanetFormPage;
