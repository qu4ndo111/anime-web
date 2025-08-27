import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AnimeModel } from './interfaces/anime.interface';
import { AnimeJikanModel, Daum } from './interfaces/anime-jikan.interface';


@Injectable()
export class AnimeService {
  private readonly baseUrl = 'https://api.myanimelist.net/v2';
  private readonly jikanUrl = 'https://api.jikan.moe/v4/'

  async getSeasonalAnime(year: string, season: string, limit = 10): Promise<AnimeModel[]> {
    const res = await axios.get<AnimeModel[]>(
      `${this.baseUrl}/anime/season/${year}/${season}`,
      {
        params: {
          limit,
          sort: 'anime_score',
          fields: 'id,title,main_picture,start_date,genres,num_episodes',
        },
        headers: {
          'X-MAL-CLIENT-ID': process.env.MAL_CLIENT_ID,
        },
      },
    );
    return res.data;
  }

  async getTrendingAnime(limit: number): Promise<AnimeJikanModel> {
    const res = await axios.get<AnimeJikanModel>(`${this.jikanUrl}seasons/now?order_by=members&sort=desc&limit=${limit}`)

    return res.data
  }

  async getTopViewsAnime(filter: 'day' | 'week' | 'month' | 'year' | 'all' = 'all'): Promise<Daum[]> {
    const response = await axios.get<AnimeJikanModel>(`${this.jikanUrl}top/anime`)
    const allAnime = response.data.data

    const now = new Date();
    let startDate: Date;
    
    switch (filter) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date();
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date(0);
    }

    const filtered = allAnime.filter((anime) => {
      if(!anime.aired?.from) return false
      return new Date(anime.aired?.from) >= startDate
    })

    return filtered.slice(0, 6);
  }
  //  getSeasonalAnime(year: string, season: string, limit = 10) {
  //   return {
  //     year,
  //     season,
  //     limit,
  //     data: ['Anime 1', 'Anime 2', 'Anime 3'],
  //   };
  // }
}
