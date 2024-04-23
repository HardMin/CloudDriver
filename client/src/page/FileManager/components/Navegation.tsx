import { Button } from '@/components/ui/button'
import { CornerUpLeft, Menu } from 'lucide-react'
import DialogMkdir from './DialogMkdir'
import DialogUpload from './DialogUpload'

interface NavegationType {
  handleRouteFolder: (name?: string, down?: boolean) => void
  route: string
}

export default function Navegation({ handleRouteFolder, route }: NavegationType) {

  return (
    <section className='flex justify-between'>
      <div>
        <Button onClick={() => handleRouteFolder('', true)}><CornerUpLeft /></Button>
        <span>
          /
          {route}
        </span>
      </div>

      <section className='flex items-center gap-2'>
        <DialogMkdir />
        <DialogUpload />
        <Button><Menu /></Button>
      </section>
    </section >
  )
}
