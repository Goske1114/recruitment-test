import React from "react";
import { useExoplanets } from "../context/ExoplanetsContext";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function ExoplanetCard({ Exoplanet }) {
  const router = useRouter()
  const { deleteExoplanet } = useExoplanets();

  const handleEdit = e => {
    e.stopPropagation()
    router.push(`/Exoplanets/${Exoplanet._id}`)
  }
  const handleRemove = e => {
    e.stopPropagation()
    deleteExoplanet(Exoplanet._id)
  }

  return (
    <div
      className="bg-zinc-800 max-w-md w-full p-10 rounded-md hover:bg-zinc-500" 
      onClick={() => router.push(`/Exoplanets/detail/${Exoplanet._id}`)}
    >
      <header className="flex justify-between flex-wrap">
        <h1 className="text-2xl font-bold">{Exoplanet.name}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md my-2 hover:bg-blue-700"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md my-2 hover:bg-red-700"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </header>
      <p className="text-slate-300">{`Distance: ${Exoplanet.distance} light years`}</p>
      <p className="text-slate-300">{`Discovery Year: ${Exoplanet.discoverYear}`}</p>
    </div>
  );
}

export default ExoplanetCard;
