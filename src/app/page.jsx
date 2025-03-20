'use client'
import { useExoplanets } from "../context/ExoplanetsContext.jsx";
import { useEffect } from "react";
import ExoplanetCard from "../components/ExoplanetCard.jsx";
import { searchExoplanets } from "../utils/search.js";
import { useAuth } from "@/context/AuthContext.jsx";
import { useRouter } from "next/navigation";
import PageController from '../components/PageController.jsx'
import YesNo from '../components/YesNo.jsx'

function ExoplanetsPage() {
  const { 
    getExoplanets, 
    Exoplanets, 
    pattern, 
    page, 
    maxPage, 
    nextPage, 
    prevPage,
    loading,
    yesnoOpen,
    setYesNoOpen
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
    return <div>No Exoplanets</div>;
  }

  return (
    <>
      <div className="flex flex-row justify-center">
        <h1 className={loading ? "text-3xl" : "text-3xl text-transparent"}>
          {loading ? 'Loading...' : '<>'}
        </h1>
      </div>
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
      <YesNo 
        isOpen={yesnoOpen.open} 
        setIsOpen={v => setYesNoOpen({...yesnoOpen, open: v})}
        onYes={yesnoOpen.callback}
        title='Are you sure you want to delete?'
        content="If you delete this one, you'll never see it again. Are you sure?"
      />
    </>
  );
}

export default ExoplanetsPage;
