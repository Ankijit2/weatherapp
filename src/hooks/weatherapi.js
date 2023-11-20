import { useState, useEffect } from 'react';

function useWeather(locations) {
    
    const [data, setData] = useState(null);

    useEffect(() => {
        
        fetch(`http://api.weatherapi.com/v1/current.json?key=2fb0063579934aefb8451233231511&q=${locations}&aqi=no`)
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
