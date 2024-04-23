import { useState } from 'react'
import { Layout } from './Layout'
import FileManager from './page/FileManager/FileManager'
import Home from './page/Home'

type useStateType = {
  user: {
    name: string
  }
}

export default function App() {
  const [user, setUser] = useState<useStateType['user']>()

  return (
    <Layout>
      {
        user
          ? <FileManager />
          : <Home />
      }

    </Layout>
  )
}
