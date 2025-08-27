import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Navigation, Autoplay } from 'swiper/modules'
import { useRef, useEffect } from 'react'
import type { Daum } from '../../types/anime.types'

interface AnimeCarouselProps {
  seasonAnime: Daum[]
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
          className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-white text-black px-3 py-2 rounded-full shadow"
        >
          ◀
        </button>
        <button
          ref={nextRef}
          className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-white text-black px-3 py-2 rounded-full shadow"
        >
          ▶
        </button>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={20}
        autoplay={{delay: 3000, disableOnInteraction: false}}
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
            <div className="bg-pink-100 dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition hover:scale-105 pt-4">
              <div className="flex items-center justify-center h-60">
                <img
                  src={anime.node.main_picture.large}
                  alt={anime.node.title}
                  className="max-h-full w-auto object-contain shadow-2xl"
                />
              </div>
              <div className="p-4 text-center text-pink-800 dark:text-pink-200 font-semibold">
                {anime.node.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
