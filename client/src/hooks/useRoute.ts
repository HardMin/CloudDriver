import { routeFilemanager } from "@/store/routeFilemanagerStore";

export default function useRoute() {
  const { route, upRoute, downRoute } = routeFilemanager()
  
  return {
    routeNavigation: route.join('/'),
    routeApi: route.join('>'),
    upRoute,
    downRoute
  }
}