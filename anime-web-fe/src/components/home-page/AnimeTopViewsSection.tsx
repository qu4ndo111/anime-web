import { Skeleton } from "primereact/skeleton";
import type { AnimeJikanList } from "../../types/anime-jikan.types";
import { useState } from "react";

interface AnimeTopViewsModel {
    title: string;
    animeList: AnimeJikanList[]
    loading: boolean
    getTopViewsAnime: (filter: 'day' | 'month' | 'week' | 'year') => void
}

export default function AnimeTopViewsSection(props: AnimeTopViewsModel) {
    const [filter, setFilter] = useState<'day' | 'month' | 'week' | 'year'>('day')

    const handleChangeFilter = (newFilter: 'day' | 'month' | 'week' | 'year') => {
        setFilter(newFilter)
        props.getTopViewsAnime(newFilter)
    }

    return <div className="anime-top-views-container">
        <div>
            <h3 className="trending-title relative inline-block">
                {props.title}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded"></span>
            </h3>
            <div className="flex mt-4 gap-2">
                <button
                    onClick={() => handleChangeFilter('day')}
                    type="button"
                    className={"px-4 py-1 text-sm font-semibold rounded-full shadow-md hover:opacity-90 " + (filter === 'day' ? "bg-gradient-to-r from-pink-500 to-purple-500" : "text-white border border-white/30 hover:border-pink-400 hover:text-pink-300")}
                >
                    Day
                </button>
                <button
                    onClick={() => handleChangeFilter('week')}
                    type="button"
                    className={"px-4 py-1 text-sm font-semibold rounded-full shadow-md hover:opacity-90 " + (filter === 'week' ? "bg-gradient-to-r from-pink-500 to-purple-500" : "text-white border border-white/30 hover:border-pink-400 hover:text-pink-300")}
                >
                    Week
                </button>
                <button
                    onClick={() => handleChangeFilter('month')}
                    type="button"
                    className={"px-4 py-1 text-sm font-semibold rounded-full shadow-md hover:opacity-90 " + (filter === 'month' ? "bg-gradient-to-r from-pink-500 to-purple-500" : "text-white border border-white/30 hover:border-pink-400 hover:text-pink-300")}
                >
                    Month
                </button>
                <button
                    onClick={() => handleChangeFilter('year')}
                    type="button"
                    className={"px-4 py-1 text-sm font-semibold rounded-full shadow-md hover:opacity-90 " + (filter === 'year' ? "bg-gradient-to-r from-pink-500 to-purple-500" : "text-white border border-white/30 hover:border-pink-400 hover:text-pink-300")}
                >
                    Year
                </button>
            </div>
        </div>
        <div className="mt-5 flex flex-col gap-5">
            {
                props.loading ? Array.from({ length: 6 }).map((_, i) => {
                    return <Skeleton key={i} height="200px" borderRadius="12px" />
                }) : props.animeList.map((anime) => (
                    <div key={anime.mal_id} className="anime-box relative shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl group" style={{ background: `url(${anime.images.webp.large_image_url}) no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <div className="anime-badge eps">
                            <p className="badge">{anime.episodes}</p>
                        </div>
                        <div className="anime-badge members">
                            <p className="badge">{anime.members}</p>
                        </div>
                        <div className="anime-name text-white text-sm font-semibold tracking-wide drop-shadow-lg bg-black/40 px-2 py-1 rounded">{anime.title_english}</div>
                    </div>
                ))
            }
        </div>
    </div>
}