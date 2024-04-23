import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useContent } from '@/hooks/useContent'
import useRoute from '@/hooks/useRoute'
import { pathApiFormat } from '@/lib/utils'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@radix-ui/react-menubar'
import { Ellipsis, Folder } from 'lucide-react'
import { toast } from 'sonner'

interface TableContentType {
  handleRouteFolder: (name: string) => void
}

export default function TableContent({ handleRouteFolder }: TableContentType) {
  const { refreshContent, content } = useContent()
  const { routeApi } = useRoute()

  const handleDeleteElement = (name: string) => {
    const path = pathApiFormat(`${routeApi}>${name}`, 'rmdir')
    fetch(path, { method: 'DELETE' })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          refreshContent()
          toast.success(`${name} fue eliminado exitosamente!`)
        }
      })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead className='text-center'>Tipo</TableHead>
          <TableHead className='text-center w-32'>Tamaño</TableHead>
          <TableHead className='text-center w-64'>Ultima modificación</TableHead>
          <TableHead className='w-10'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          content.map(({ name, path, size, type, last_modified }) => (
            <TableRow onDoubleClick={() => handleRouteFolder(name)} className='hover:bg-[--primary-hover] :bg-slate-500 select-none' key={`${path}\\${name}`}>
              <TableCell className='flex gap-x-3 items-center'>
                {
                  type === 'Carpeta de archivos' && <Folder />
                }
                {name}
              </TableCell>
              <TableCell className='text-center'>{type}</TableCell>
              <TableCell className='text-center'>{size}</TableCell>
              <TableCell className='text-center'>{last_modified}</TableCell>
              <TableCell className=' flex justify-center'>
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger><Ellipsis /></MenubarTrigger>
                    <MenubarContent className='border-[0.3px] border-[#777] hover:bg-[--primary-hover] rounded-md px-3 w-32 bg-[--primary] cursor-pointer'>
                      <MenubarItem onClick={() => handleDeleteElement(name)} className='py-2 hover:outline-none'>Eliminar</MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

