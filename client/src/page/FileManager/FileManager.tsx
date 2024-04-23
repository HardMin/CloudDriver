import TableContent from './components/Table'
import Navegation from './components/Navegation'
import { Toaster } from 'sonner'
import useRoute from '@/hooks/useRoute'
import { useEffect } from 'react'
import { useContent } from '@/hooks/useContent'

export default function FileManager() {
  const { routeNavigation, upRoute, downRoute } = useRoute()
  const { refreshContent } = useContent()

  const handleRouteFolder = (name?: string, down = false) => {
    if (!down && name) {
      upRoute(name)
    }
    else {
      downRoute()
    }
  }

  useEffect(() => {
    refreshContent()
  }, [routeNavigation])

  return (
    <section>
      <Navegation handleRouteFolder={handleRouteFolder} route={routeNavigation} />
      <TableContent handleRouteFolder={handleRouteFolder} />
      <Toaster position='bottom-right' expand={true} richColors />
    </section>
  )
}
