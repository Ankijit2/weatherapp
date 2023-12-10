import { useState, useEffect } from 'react';
const api = import.meta.env.VITE_APIKEY;
function useWeather(locations) {
    
    const [data, setData] = useState(null);

    useEffect(() => {
        
        fetch(`http://api.weatherapi.com/v1/current.json?key=${api}&q=${locations}&aqi=no`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
            });
    }, [locations]); 


    return data;
}

export default useWeather;
