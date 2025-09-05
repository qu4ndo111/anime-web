import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { AnimeJikanModel, Daum } from './interfaces/anime-jikan.interface';


@Injectable()
export class AnimeService {
  private readonly baseUrl = 'https://api.myanimelist.net/v2';
  private readonly jikanUrl = 'https://api.jikan.moe/v4/'

  async getSeasonalAnime(limit = 10): Promise<Daum[]> {
    try {
      const res = await axios.get<AnimeJikanModel>(`${this.jikanUrl}seasons/now?limit=25`)
      const allAnimeData = res.data.data

      const sortedAnime = allAnimeData.sort((a, b) => {
        const dateA = a.aired?.from ? new Date(a.aired.from).getTime() : 0;
        const dateB = b.aired?.from ? new Date(b.aired.from).getTime() : 0;
        return dateB - dateA;
      })

      return sortedAnime.slice(0, limit);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new HttpException(
            {
              statusCode: error.response.status,
              message: (error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data)
                ? (error.response.data as { message?: string }).message
                : 'Jikan API error',
            },
            error.response.status,
          );
        }
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_GATEWAY,
            message: 'Cannot reach Jikan API',
          },
          HttpStatus.BAD_GATEWAY,
        );
      }

      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Unexpected error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTrendingAnime(limit: number): Promise<AnimeJikanModel> {
    try {
      const res = await axios.get<AnimeJikanModel>(`${this.jikanUrl}seasons/now?order_by=members&sort=desc&limit=${limit}`)

      return res.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new HttpException(
            {
              statusCode: error.response.status,
              message: (error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data)
                ? (error.response.data as { message?: string }).message
                : 'Jikan API error',
            },
            error.response.status,
          );
        }
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_GATEWAY,
            message: 'Cannot reach Jikan API',
          },
          HttpStatus.BAD_GATEWAY,
        );
      }

      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Unexpected error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTopViewsAnime(filter: 'day' | 'week' | 'month' | 'year' | 'all' = 'all'): Promise<Daum[]> {
    try {
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
        if (!anime.aired?.from) return false
        return new Date(anime.aired?.from) >= startDate
      })

      return filtered.slice(0, 6);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new HttpException(
            {
              statusCode: error.response.status,
              message: (error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data)
                ? (error.response.data as { message?: string }).message
                : 'Jikan API error',
            },
            error.response.status,
          );
        }
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_GATEWAY,
            message: 'Cannot reach Jikan API',
          },
          HttpStatus.BAD_GATEWAY,
        );
      }

      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Unexpected error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
