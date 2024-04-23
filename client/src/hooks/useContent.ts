import { contentStore } from "@/store/contentStore"
import { pathApiFormat } from "@/lib/utils"
import useRoute from "./useRoute"

export const useContent = () => {
  const {content, fetchContent} = contentStore()
  const { routeApi } = useRoute()

  const refreshContent = (route: string = routeApi) => {
    const path = pathApiFormat(route, 'dir')
    fetchContent(path)
  }

  return {
    content,
    refreshContent
  }
}