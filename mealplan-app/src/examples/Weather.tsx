import { useEffect, useState } from 'react'

function Weather() {
    const [forecast, setForecast] = useState<any[] | null>(null)

  const generate_weatherforecast = async() => {
    try {
        const res = await fetch("http://localhost:5043/weatherforecast");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setForecast(data);
    } catch {
        setForecast(null);
    }
  }
  useEffect(() => {
    generate_weatherforecast(); 
  }, []);

  // helper determines additional tailwind color class based on Celsius temperature
  const tempClass = (tempC: number) => {
    if (tempC >= 35) return "bg-red-200 shadow-red-800/50 border border-red-300 hover:bg-red-300";               // hot
    if (tempC >= 20) return "bg-orange-200 shadow-orange-900/50 border border-orange-300 hover:bg-orange-300";   // warm
    if (tempC >= 5) return "bg-yellow-100 shadow-yellow-900/50 border border-yellow-200 hover:bg-yellow-200";    // mild
    if (tempC >= -5) return "bg-blue-200 shadow-blue-900/50 border border-blue-300 hover:bg-blue-300";          // cold
    return "bg-gray-100 shadow-gray-500/50 border border-gray-300 hover:bg-gray-300";                           // freezing
  };

  return (
    <div className="bg-white-200 rounded p-3 flex flex-row gap-3 self-center">
      {forecast ? forecast.map((item, index) => (
        <div
          key={index}
          className={`shadow-lg rounded p-3 ${tempClass(item.TemperatureC)}`}>
          <p className="font-bold">Date: {item.Date}</p>
          <p>Temp C: {item.TemperatureC}°C</p>
          <p>Temp F: {item.TemperatureF}°F</p>
        </div>
      )) : "Loading..."}
    </div>
  )
}

// (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 0 {Date: '03/11/2026', TemperatureC: 34, TemperatureF: 93}
// 1 {Date: '03/12/2026', TemperatureC: 14, TemperatureF: 57}
// 2 {Date: '03/13/2026', TemperatureC: 14, TemperatureF: 57}
// 3 {Date: '03/14/2026', TemperatureC: 9, TemperatureF: 48}
// 4 {Date: '03/15/2026', TemperatureC: 43, TemperatureF: 109}
// 5 {Date: '03/16/2026', TemperatureC: -18, TemperatureF: 0}
// 6 {Date: '03/17/2026', TemperatureC: -1, TemperatureF: 31}

// length: 7
// [[Prototype]]: Array(0)

export default Weather