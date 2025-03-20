'use client'
import { useExoplanets } from "../context/ExoplanetsContext.jsx";
import { useEffect } from "react";
import ExoplanetCard from "../components/ExoplanetCard.jsx";
import { searchExoplanets } from "../utils/search.js";
import { useAuth } from "@/context/AuthContext.jsx";
import { useRouter } from "next/navigation";
import PageController from '../components/PageController.jsx'

function ExoplanetsPage() {
  const { 
    getExoplanets, 
    Exoplanets, 
    pattern, 
    page, 
    maxPage, 
    nextPage, 
    prevPage,
    loading
  } = useExoplanets();
  const { isAuthenticated } = useAuth()

  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated])

  useEffect(() => {
    getExoplanets();
  }, [page]);
  if (Exoplanets.length === 0) {
    return <div>No exoplanets</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {searchExoplanets(Exoplanets, pattern).map((Exoplanet) => (
          <ExoplanetCard key={Exoplanet._id} Exoplanet={Exoplanet} />
        ))}
      </div>
      <PageController 
        page={page} 
        maxPage={maxPage} 
        pattern={pattern} 
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </>
  );
}

export default ExoplanetsPage;
