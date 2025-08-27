export interface AnimeModel {
  data: Daum[]
  paging: Paging
  season: Season
}

export interface Daum {
  node: Node
}

export interface Node {
  id: number
  title: string
  main_picture: MainPicture
  start_date: string
  genres: Genre[]
  num_episodes: number
}

export interface MainPicture {
  medium: string
  large: string
}

export interface Genre {
  id: number
  name: string
}

export interface Paging {
  next: string
}

export interface Season {
  year: number
  season: string
}


