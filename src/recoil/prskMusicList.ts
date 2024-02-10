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

export const ALL = 'all'
export const VIRTUAL = 'virtual_singer'
export const LEONEED = 'leo_need'
export const MOREMOREJUMP = 'more_more_jump'
export const VIVIDBADSQUARE = 'vivid_bad_square'
export const WONDERLANDS_SHOWTIME = 'wonderlands_showtime'
export const NIGHTCODE = 'night_code'
export const LEADERS = 'leaders'

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

export const selectUnit = atom<string>({
  key: 'selected unit',
  default: 'all'
})

export const sortMusicList = selector({
  key: 'sort prsk music list',
  get: ({ get }) => {
    const musicList = get(prskMusicList)
    const selectedUnit = get(selectUnit)

    if(ALL === selectedUnit) return musicList

    const res: PrskMusicListType[] = []
    for(let i = 0; i < musicList.length; ++i) {
      if(selectedUnit === musicList[i].id || LEADERS === musicList[i].id) res.push(musicList[i])
    }

    return res
  }
})