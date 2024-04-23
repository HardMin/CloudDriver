import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import { pathApiFormat } from '@/lib/utils'
import useRoute from '@/hooks/useRoute'
import { useContent } from '@/hooks/useContent'

type useStateType = {
  nameFolder: string,
  errorNameFolder: { message?: string, error: boolean }
  open: boolean
}

export default function DialogMkdir() {
  const [errorNameFolder, setErrorNameFolder] = useState<useStateType['errorNameFolder']>()
  const [nameFolder, setNameFolder] = useState<useStateType['nameFolder']>('')
  const [open, setOpen] = useState<useStateType['open']>(false)

  const { refreshContent, content } = useContent()
  const { routeApi } = useRoute()


  const refresh = () => {
    refreshContent()
    setNameFolder('')
    setErrorNameFolder({ error: false })
    setOpen(false)
  }

  const handleMkdir = () => {
    if (nameFolder === '') {
      toast.warning(`Ingresa un nombre para la nueva carpeta.`)
      return
    }
    else if (errorNameFolder?.error) {
      toast.error(`No se puede crear la carpeta "${nameFolder}", ya existe.`)
      return
    }

    const path = pathApiFormat(`${routeApi}>${nameFolder}`, 'mkdir')
    fetch(path, { method: 'POST' })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.status !== 200) {
          toast.error(`No se puede crear la carpeta ${nameFolder}, ya existe.`)
          return
        }
        refresh()
        toast.success(`${nameFolder} fue creado exitosamente!`)
      });
  }

  const handleNameFolder = ({ target }: { target: { value: string } }) => {
    const name = target.value
    setNameFolder(name)

    const nameExists = content.find(n => n.name === name)

    if (nameExists) {
      setErrorNameFolder({ message: 'Nombre de carpeta ya existente.', error: true })
    }
    else if (name.length === 0) {
      setErrorNameFolder({ error: true })
    }
    else {
      setErrorNameFolder({ error: false })
    }

    console.log(errorNameFolder)
  }

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={() => setOpen(true)}>
        Crear carpeta
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[--primary]" contentEditable={false} >
        <DialogHeader>
          <DialogTitle>Nueva carpeta</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid grid-cols-3 items-center gap-x-2 gap-1">
            <Input
              id="name"
              placeholder="Nombre de la nueva carpeta"
              className={`col-span-3 ${errorNameFolder?.error && errorNameFolder?.message ? "border-red-600" : ""}`}
              value={nameFolder}
              onChange={handleNameFolder}
              autoComplete='off'
              onKeyDown={(e) => {
                console.log(e.code === 'Enter')
                e.code === 'Enter' && handleMkdir()
              }}
            />
            <Label
              className='text-red-600 col-span-3'
            >
              {
                errorNameFolder?.message
              }
            </Label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose disabled={errorNameFolder?.error} onClick={handleMkdir}>
            Crear carpeta
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
