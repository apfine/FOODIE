import {Routes , Route} from 'react-router-dom'
import './App.css'
import FOODIE from './pages/FOODIE'
import Results from './pages/Results'

function App(){
  return(
    <Routes>
      <Route path="/" element={<FOODIE />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  )
}
export default App
