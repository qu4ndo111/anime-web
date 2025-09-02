import axiosClient from "./axiosClient";

const api = {
    getSeasonalAnime: (limit: number) =>
         axiosClient.get(`/anime/seasonal`, {
            params: { limit },
        }),
    getTrendingAnime: (limit: number) => axiosClient.get('anime/trending', {params: {limit: limit}}),
    getTopViewsAnime: (filter: 'day' | 'week' | 'month' | 'year' | 'all' = 'all') => axiosClient.get('anime/top-view', {params: {filter}})
}

export default api;