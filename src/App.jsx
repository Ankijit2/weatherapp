import { useState, useEffect, useRef } from 'react'
import './App.css'
import weatherlogo from './assets/weather.svg'
import searchlogo from './assets/search.svg'
import useWeather from './hooks/weatherapi'
import loading from './assets/loading.svg'




function App() {
  const [locations, setLocation] = useState("Delhi,india");
  const data = useWeather(locations);

  const searchref = useRef(null)

  const [country, setCountry] = useState(null);
  const [name, setName] = useState(null);
  const [temp, setTemp] = useState(null);
  const [date, setDate] = useState(null);
  const [image, setImage] = useState(null);
  const [condition, setCondition] = useState(null);
  const [wind, setWind] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [UV, setUV] = useState(0);

  useEffect(() => {
    if (data && data.location) {
      setCountry(data.location.country);
      setName(data.location.name);
      setTemp(data.current.temp_c);
      setDate(data.location.localtime);
      setImage(data.current.condition.icon);
      setCondition(data.current.condition.text);
      setWind(data.current.wind_kph);
      setPressure(data.current.pressure_mb);
      setHumidity(data.current.humidity);
      setUV(data.current.uv);
    }
  }, [data], [locations]);
  if (data === null) {
    return <img src={loading} className= 'h-screen w-screen' />;
  }
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  };
  return (
    <>
      <div className=" text-white min-h-screen min-w-screen flex justify-evenly" id='screen'>
        <div className='text-2xl p-7 basis-3/4 relative' id='Menu'>
          <div id="logo" className='flex'>
            <div className='block'>
              <img src={weatherlogo} className='h-11 w-14 pr-4 text-2xl inline' /> Merry Weather
            </div>
            <input type="button" value="userlocation"  className='text-sm absolute right-7 bg-[#d15d45] px-3 py-2 rounded-md' onClick={handleGetLocation}/>
            
            <div className="absolute bottom-8 left-7 w-2/4 flex">
              <div className='inline-block text-6xl'>{temp}°C</div>
              <div className='inline-block text-2xl ml-5 pt-2'><span>{name},{country}</span><p className='text-sm'>{date}</p></div>
              <div className='text-sm text-center ml-4' ><img src={image} className='h-14 w-14 ' alt="" />{condition}</div>
              
            </div>
          
          </div>
        </div>
        <div id='glass' className='basis-1/4'>
          <div className='flex h-12'>
            <input type="search" className='w-[90%] text-[#d15d45] p-3 ' ref={searchref} />
            <img src={searchlogo} className=' h-12 w-14 p-3  bg-[#d15d45]' onClick={() => setLocation(searchref.current.value)} />
            
          </div>
         
          <div className='pl-12' >
            
            <p className=' pt-5 pb-4 text-base '>Famous Locations</p>
            <hr className='w-4/5 mb-11' />
            <div className='text-sm list-none'>
              <li className='mb-10 cursor-pointer ' onClick={() => setLocation("Mumbai")}>Mumbai</li>
              <li className='mb-10 cursor-pointer' onClick={() => setLocation("uttar pradesh")}>Uttar Pradesh</li>
              <li className='mb-10 cursor-pointer' onClick={() => setLocation("Darjeeling")}>Darjeeling</li>
              <li className='mb-10  cursor-pointer' onClick={() => setLocation("Shillong")}>Shillong</li>
              <hr className='w-4/5 mt-11' />
            </div>
            <p className=' pt-5 pb-10 text-base'>Weather Details</p>
            <div className='text-sm list-none'>
              <li className='mb-10'>Wind:-{wind} kph</li>
              <li className='mb-10'>Pressure-{pressure} mb</li>
              <li className='mb-10'>Humidity:- {humidity}</li>
              <li>UV:-{UV}</li>
            </div>



          </div>

        </div>

      </div>


    </>
  )
}

export default App
