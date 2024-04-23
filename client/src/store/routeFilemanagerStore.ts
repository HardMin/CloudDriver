import { create } from 'zustand'

type routeState = {
  route: string[], 
}
type routeAction = {
  upRoute: (action:string) => void,
  downRoute: () => void,
}


export const routeFilemanager = create<routeState & routeAction>((set) => (
  {
    route: [],
    upRoute: (action: string) => set((state) => ({
      route: [...state.route, action],
    })),

    downRoute: () => set((state) => {
      const newRoute = [...state.route]
      newRoute.pop()

      return {
        route: newRoute
      }

    })
  }
))

