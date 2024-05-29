import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import AddLocation from './components/AddLocation';
import UpdateLocation from './components/UpdateLocation';
import LocationDetails from './components/LocationDetails';

function App() {
  const [locationList, setLocationList] = useState([]);

  return (
    <>
      <div>
        <h1>ClimaTrack</h1>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path="/addLocation" element={<AddLocation locationList={locationList} setLocationList={setLocationList} />}/>
          <Route path='/location/:id' element={<LocationDetails/>}/>
          <Route path="/location/updateLocation/:id" element={<UpdateLocation/>}/>
          <Route path='/dashboard' element={<Dashboard locationList={locationList} setLocationList={setLocationList} />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App