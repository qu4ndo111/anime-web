import { Controller, Get, Query } from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) { }

  @Get('seasonal')
  getSeasonal(
    @Query('year') year: string,
    @Query('season') season: string,
    @Query('limit') limit?: number,
  ) {
    return this.animeService.getSeasonalAnime(year, season, limit);
  }

  @Get('trending')
  trending(
    @Query('limit') limit: number,
  ) {
    return this.animeService.getTrendingAnime(limit);
  }

  @Get('top-view')
  topViews(
    @Query('filter') filter: 'day' | 'week' | 'month' | 'year' | 'all'
  ) {
    return this.animeService.getTopViewsAnime(filter)
  }
}
