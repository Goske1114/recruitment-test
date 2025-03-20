'use client'
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from 'next/link'
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useExoplanets } from "../../../../context/ExoplanetsContext";
import { useAuth } from "@/context/AuthContext";
dayjs.extend(utc);

export default function ExoplanetDetailPage() {
  const [Exoplanet, setExoplanet] = useState(null)

  const { getExoplanet } = useExoplanets();
  const { isAuthenticated } = useAuth()
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    async function loadExoplanet() {
      if (params.id) {
        const Exoplanet = await getExoplanet(params.id);
        setExoplanet(Exoplanet)
      }
    }
    loadExoplanet()
  }, []);

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated])

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {Exoplanet === null ? "Loading ..." :
        <>
          <header className="flex justify-between">
            <h1 className="text-2xl font-bold">{Exoplanet.name}</h1>
          </header>
          <p className="text-slate-300">{`Distance: ${Exoplanet.distance}`}</p>
          <p className="text-slate-300">{`Discovery Year: ${Exoplanet.discoverYear}`}</p>
          <p className="text-slate-300">{`Description: ${Exoplanet.description}`}</p>
          <img src={Exoplanet.url} className="mb-3" width="100" height="100" alt={Exoplanet.name}/>
          
          <Link
            href={`/`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md my-2 hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </>
      }
    </div>
  );
}
