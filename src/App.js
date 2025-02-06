import './style/global-style.css'
import { Navbar } from './components/Navbar'
import { DogList } from './components/DogList'

function App() {
  return (
    <>
      <Navbar />
      <DogList/>
    </>
  )
}

export { App }
