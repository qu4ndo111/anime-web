import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import { redisStore } from 'cache-manager-ioredis-yet';
import { ConfigModule } from '@nestjs/config';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AnimeModule
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   useFactory: async () => ({
    //     store: await redisStore({
    //       url: process.env.REDIS_URL,
    //     }),
    //   }),
    // }),
  ],
})
export class AppModule {}
