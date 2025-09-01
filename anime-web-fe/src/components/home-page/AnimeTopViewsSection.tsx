import type { AnimeJikanList } from "../../types/anime-jikan.types";

interface AnimeTopViewsModel {
    title: string;
    animeList: AnimeJikanList[]
}

export default function AnimeTopViewsSection(props: AnimeTopViewsModel) {
    console.log(props)

    return <div className="anime-top-views-container">
        <div>
            <h3 className="trending-title relative inline-block">
                {props.title}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded"></span>
            </h3>
            <div>

            </div>
        </div>
        <div className="mt-5 flex flex-col gap-5">
            {props.animeList.map((anime) => (
                <div key={anime.mal_id} className="anime-box relative shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl group" style={{ background: `url(${anime.images.webp.large_image_url}) no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="anime-badge eps">
                        <p className="badge">{anime.episodes}</p>
                    </div>
                    <div className="anime-badge members">
                        <p className="badge">{anime.members}</p>
                    </div>
                    <div className="anime-name text-white text-sm font-semibold tracking-wide drop-shadow-lg bg-black/40 px-2 py-1 rounded">{anime.title_english}</div>
                </div>
            ))}
        </div>
    </div>
}