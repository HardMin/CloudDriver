import { ContentType } from '@/types'
import { create } from 'zustand'

// TIPA
type State = {
  content: ContentType['content'][],
  fetchContent:  (path: string) => Promise<void>,
}

// FUNCTION                       TIPO
export const contentStore = create<State>((set) => ({
    content: [],
    fetchContent: async (path: string) => {
      const res = await fetch(path)
      const json = await res.json()

      const content = json.directory

      set({ content }) 
    }
  }
))