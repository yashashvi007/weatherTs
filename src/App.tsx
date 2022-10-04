import { Routes , Route , BrowserRouter } from 'react-router-dom';
import FormScreen from './pages/FormScreen';
import Weather from './pages/Weather'
import './App.css'
import Information from './pages/Information';

interface props{
}

const App : React.FC<props> = () => {
  return (
   <BrowserRouter>
        <Routes>
            <Route path='/' element={<FormScreen/>} />
            <Route path='/information/:country' element={<Information/>} />
            <Route path='/weather/:capital' element={<Weather/>} />
        </Routes>
   </BrowserRouter>
   
  )
}

export default App;
