import React , {useState , useEffect} from 'react'
import {useParams} from 'react-router-dom'

type weather = {
    capital : string ,
    temprature : number , 
    weather : string
}

const Weather= ()=> {
   const {capital} = useParams<{capital : string}>()
   const [error , setError] = useState<string>('')
   const [information  , setInformation] = useState<weather>({
    capital : '' , 
    temprature : 0 , 
    weather : ''
   })

   useEffect(()=>{
    const getData = async()=>{
       try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=2f307f361343f471569db6cada2071fe`)
        const data = await res.json()
        console.log(data);
        
        setInformation({
            capital : data.name , 
            temprature : data.main.temp , 
            weather : data.weather[0].description
        })
       } catch (error) {
        setError('Cannot get data for this capital')
       }
    }
    getData()
} , [])
   
   return (
    <div>
      {

        information.capital === '' ? <h1>Loading</h1> : (
          <div className="blog_post">
          <div className="container_copy">
          <img src='https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/5-Best-Free-and-Paid-Weather-APIs-2019-e1587582023501-1024x576.png'  alt='flag'/>
          <h1>{information.capital}</h1>
                <h1>{Math.floor(information.temprature - 273)} degrees</h1>
                <h1>{information.weather}</h1>
          </div>
          </div>
        )
      }
    </div>
  )
}

export default Weather
