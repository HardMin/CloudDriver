import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { pathApiFormat } from '@/lib/utils'
import { useContent } from '@/hooks/useContent'
import useRoute from '@/hooks/useRoute'
// import { toast } from 'sonner'

type useStateType = {
  errorFileUpload: { message?: string, error: boolean }
  dialogMkdir: boolean
}

export default function DialogUpload() {
  const [errorFileUpload, setErrorFileUpload] = useState<useStateType['errorFileUpload']>()
  const [selectedFile, setSelectedFile] = useState<File | null | File[]>([])

  const { routeApi } = useRoute()
  const { refreshContent, content } = useContent()

  const refresh = () => {
    setSelectedFile([])
    refreshContent()
  }

  const uploadFileServer = (file: File | File[]) => {
    const formData = new FormData();


    if (!Array.isArray(file)) {
      console.log('single')
      formData.append('file', file);
    }

    else {
      console.log('multiple')
      file.map(f => formData.append('file', f))
    }


    const path = pathApiFormat(routeApi, 'upload')

    fetch(path, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Archivo subido correctamente:', data);
        refresh()
      })
      .catch((error) => {
        console.error('Error al subir el archivo:', error);
      });
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (!files) return;

    if (files.length === 1) {
      if (content.find((e) => e.name === files[0].name)) {
        console.log('Hay un elemento con el nombre igual que el archivo')
      }
      return setSelectedFile(files[0])
    }

    const newArray = []
    for (const f of files) {
      newArray.push(f)
    }

    setSelectedFile(newArray)

  }

  const handleSubmitUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (selectedFile) {
      uploadFileServer(selectedFile)
      setErrorFileUpload({ error: false })
    }

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Subir archivo</Button>

      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-[--primary]' >
        <DialogHeader>
          <DialogTitle>Subir archivo</DialogTitle>
        </DialogHeader>
        <form className='grid gap-2 py-4' onSubmit={handleSubmitUpload} encType='multipart/form-data' method='post'>
          <div className='grid grid-cols-3 items-center gap-x-2 gap-1'>
            <Input
              id='upload'
              name='file'
              placeholder='Nombre de la nueva carpeta'
              className={`col-span-3 text-black bg-white shadow-xl shadow-[#9993]`}
              style={{
                color: 'black',
              }}
              type='file'
              onChange={handleFileUpload}
              multiple={true}
            />
            <Label
              className='text-red-600 col-start-2 col-span-3'
            >
              {
                errorFileUpload?.message
              }
            </Label>
          </div>
          <DialogClose type='submit'>
            Enviar
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}
