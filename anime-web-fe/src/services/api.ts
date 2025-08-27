import axiosClient from "./axiosClient";

const api = {
    getSeasonalAnime: (year: number, season: 'winter' | 'spring' | 'summer' | 'fall') =>
         axiosClient.get(`/anime/seasonal`, {
            params: { year, season },
        }),
    getTrendingAnime: (limit: number) => axiosClient.get('anime/trending', {params: {limit: limit}}),
    getTopViewsAnime: (filter: 'day' | 'week' | 'month' | 'year' | 'all' = 'all') => axiosClient.get('anime/top-view', {params: {filter}})
}

export default api;