import { useEffect, useState } from "react";
import AnimeCarousel from "../components/home-page/AnimeCarousel";
import api from "../services/api";
import type { AnimeJikanList } from "../types/anime-jikan.types";
import AnimeListSection from "../components/home-page/AnimeListSection";
import AnimeTopViewsSection from "../components/home-page/AnimeTopViewsSection";

const HomePage = () => {
  const [seasonAnime, setSeasonAnime] = useState<AnimeJikanList[]>([])
  const [trendingAnime, setTrendingAnime] = useState<AnimeJikanList[]>([])
  const [topViewsAnime, setTopViewsAnime] = useState<AnimeJikanList[]>([])
  const [loadingSeasonAnime, setLoadingSeasonAnime] = useState<boolean>(false)
  const [loadingTrendingAnime, setLoadingTrendingAnime] = useState<boolean>(false)

  useEffect(() => {
    setLoadingSeasonAnime(true)
    api.getSeasonalAnime(6).then((res) => {
      if (res) {
        setSeasonAnime(res.data)
      }
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoadingSeasonAnime(false)
    })
  }, [])

  useEffect(() => {
    setLoadingTrendingAnime(true)
    api.getTrendingAnime(10).then((res) => {
      if (!res) return
      setTrendingAnime(res.data.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoadingTrendingAnime(false)
    })
  }, [])

  useEffect(() => {
    api.getTopViewsAnime().then((res) => {
      if(!res) return
      setTopViewsAnime(res.data)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoadingSeasonAnime(false)
    })
  }, [])
  

  return (
    <div className="flex justify-center w-full pt-10">
      <div className="w-full px-4 md:px-6 lg:px-8 mx-auto 
                max-w-screen-sm sm:max-w-screen-md 
                md:max-w-screen-lg lg:max-w-screen-xl 
                xl:max-w-[1400px]">
        <AnimeCarousel  seasonAnime={seasonAnime} loading={loadingSeasonAnime}/>
        <div className="mt-15 flex justify-between flex-wrap">
            <div className="w-2/3">
              <AnimeListSection title="SEASONAL / NOW AIRING" loading={loadingSeasonAnime} animeList={seasonAnime}/>
              <div className="mt-3">
                <AnimeListSection title="TRENDING PAGE" loading={loadingTrendingAnime} animeList={trendingAnime}/>
              </div>
            </div>
            <div className="w-[30%]">
              <AnimeTopViewsSection title="Top Views" animeList={topViewsAnime} />
            </div>
        </div>
      </div>
    </div>
  )

}

export default HomePage;