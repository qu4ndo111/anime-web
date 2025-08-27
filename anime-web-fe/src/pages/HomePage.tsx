import { useEffect, useState } from "react";
import AnimeCarousel from "../components/home-page/AnimeCarousel";
import getCurrentSeason from "../utils/getCurrentSeason";
import api from "../services/api";
import type { Daum } from "../types/anime.types";
import type { AnimeJikanList } from "../types/anime-jikan.types";
import AnimeListSection from "../components/home-page/AnimeListSection";



const HomePage = () => {
  const [seasonAnime, setSeasonAnime] = useState<Daum[]>([])
  const [trendingAnime, setTrendingAnime] = useState<AnimeJikanList[]>([])
  const [topViewsAnime, setTopViewsAnime] = useState<AnimeJikanList[]>([])
  const { season, year } = getCurrentSeason()

  useEffect(() => {
    api.getSeasonalAnime(year, season).then((res) => {
      setSeasonAnime(res.data.data)
    })
  }, [year, season])

  useEffect(() => {
    api.getTrendingAnime(10).then((res) => {
      if (!res) return
      setTrendingAnime(res.data.data)
    })
  }, [])

  useEffect(() => {
    api.getTopViewsAnime().then((res) => {
      if(!res) return
      setTopViewsAnime(res.data.data)
      console.log(res)
    })
  }, [])
  

  return (
    <div className="flex justify-center w-full pt-10">
      <div className="w-layout">
        <AnimeCarousel  seasonAnime={seasonAnime}/>
        <div className="mt-15 flex justify-between flex-wrap">
            <div className="w-2/3">
              <AnimeListSection title="TRENDING PAGE" animeList={trendingAnime}/>
            </div>
            <div className="w-[30%]" style={{border: '1px solid white',}}>

            </div>
        </div>
      </div>
    </div>
  )

}

export default HomePage;