import type { AnimeJikanList } from "../../types/anime-jikan.types"
import './home-page.scss'

interface AnimeSectionModel {
    animeList: AnimeJikanList[],
    title: string
}

export default function AnimeListSection(props: AnimeSectionModel) {

    return <div>
        <div className="flex justify-between items-center">
            <h3 className="trending-title relative inline-block">
                {props.title}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded"></span>
            </h3>
            <button
                type="button"
                className="px-4 py-1 text-sm font-semibold text-white 
             bg-gradient-to-r from-pink-500 to-purple-500 
             rounded-full shadow-md hover:opacity-90 
             transition-all"
            >
                VIEW ALL
            </button>
        </div>
        <div className="mt-5 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {props.animeList.slice(0, 6).map((item) => (
                <div key={item.mal_id} style={{ width: '255px' }}>
                    <div className="relative anime-banner" style={{ height: '325px', borderRadius: '12px', maxWidth: '255px' }}>
                        <img className="w-full h-full object-fill" style={{ borderRadius: '12px' }} src={item.images.jpg.image_url} />
                        <div className="anime-badge eps">
                            <p className="badge">{item.episodes} - {item.status}</p>
                        </div>
                        <div className="anime-badge score">
                            <p className="badge">{item.score}</p>
                        </div>
                        <div className="anime-badge members">
                            <p className="badge">{item.members}</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="flex flex-wrap gap-2">
                            {item.genres.map((genre) => (
                                <div key={genre.mal_id} className="tag-badge">
                                    <p className="tags">{genre.name}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-3">{item.title_english}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>

}