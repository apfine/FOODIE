import {Routes , Route} from 'react-router-dom'
import './App.css'
import FOODIE from './pages/FOODIE'

function App(){
  return(
    <Routes>
      <Route path="/" element={<FOODIE />} />
    </Routes>
  )
}
export default App
