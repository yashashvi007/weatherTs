import React , {useState , useEffect} from 'react'
import {useParams , useNavigate} from 'react-router-dom'

type country ={
    capital : string , 
    capitalInfo : number[] , 
    currency : string , 
    flag : string , 
    population : number
}

const Information: React.FC =()=> {
    const {country} = useParams<{country?: string}>()
    const [error  , setError] = useState<string>('')
    const navigate = useNavigate()
    const [information  , setInformation] = useState<country>({
        capital : "test" , 
        capitalInfo : [0 , 0] , 
        currency : "test", 
        flag : "test" , 
        population : 500
    })

    useEffect(()=>{
        const getData =async ()=>{
            console.log('calling');
            setError('')
            try {
              const res = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
              const data =await res.json()
              console.log(data);
             
              setInformation({
                 capital : data[0].capital  ,
                 capitalInfo : data[0].capital[0] , 
                 currency : data[0].currencies.INR.name , 
                 flag : data[0].flags.png , 
                 population : data[0].population
              });
             
              
            } catch (error) {
              setError('Please check if country name is valid or not')
            }
          }    
          getData()
    } , [])

    const clickHandler = (event : React.MouseEvent<HTMLButtonElement>)=>{
        navigate(`/weather/${information?.capital[0]}`)
    }

  return (
    <div> 
                {error ? <h1>{error}</h1> : information?.flag==="test" ? "Loading" : 
               ( <div>
                    <img src={information?.flag}  alt='flag'/>
                    <h1>Capital : {information?.capital[0]}</h1>
                    <p>Population : {information?.population}</p>
                    <button onClick={clickHandler} >
                        Weather
                    </button>
                </div>)
                }
    </div>
  )
}

export default Information