import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Navigation, Autoplay } from 'swiper/modules'
import { useRef, useEffect } from 'react'
import type { AnimeJikanList } from '../../types/anime-jikan.types'

import { Skeleton } from "primereact/skeleton";

interface AnimeCarouselProps {
  seasonAnime: AnimeJikanList[]
  loading: boolean
}

export default function AnimeCarousel(props: AnimeCarouselProps) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
    // Swiper requires the buttons to exist before mount
  }, [])

  return (
    <div className="relative w-full mx-auto">
      <div>
        <button
          ref={prevRef}
          className="absolute top-1/2 left-4 z-10 -translate-y-1/2 
             bg-black/40 hover:bg-black/70 text-white 
             w-10 h-10 flex items-center justify-center 
             rounded-full shadow-lg backdrop-blur-sm 
             transition-transform hover:scale-110"
        >
          ◀
        </button>

        <button
          ref={nextRef}
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 
             bg-black/40 hover:bg-black/70 text-white 
             w-10 h-10 flex items-center justify-center 
             rounded-full shadow-lg backdrop-blur-sm 
             transition-transform hover:scale-110"
        >
          ▶
        </button>

      </div>
      {props.loading ? <Skeleton width="100%" height="325px" borderRadius="12px" /> :
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={props.seasonAnime?.length > 1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          centeredSlides={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }
          }}
          className="pb-10 w-full"
        >
          {props.seasonAnime?.map((anime, index) => (
            <SwiperSlide key={index}>
              <div className="relative group rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={anime.images.webp.large_image_url}
                  alt={anime.title_english}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>

                <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg drop-shadow-md">
                  {anime.title_english}
                </div>
              </div>
            </SwiperSlide>

          ))}
        </Swiper>
      }
    </div>
  )
}
