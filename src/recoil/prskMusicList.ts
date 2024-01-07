import { atom, selector } from 'recoil'

export type PrskMusicListType = {
  id: string,
  unit_name: {
    unit: string,
    feat: string
  },
  music_title: string,
  artist_name: string,
  youtube_src: {
    original: string,
    sekai_3d: string,
    sekai_2d: string
  }
}

export const prskMusicList = atom<PrskMusicListType[]>({
  key: "prsk music list",
  default: []
})

export const acquiredList = selector({
  key: "acquired list",
  get: ({ get }) => {
    const musicList = get(prskMusicList)
    return musicList.length > 1
  }
})