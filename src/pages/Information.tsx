import React , {useState , useEffect} from 'react'
import {useParams , useNavigate} from 'react-router-dom'
import './Information.css'

interface countrystrc {
    capital : string[] , 
    capitalInfo :{
      latlng : number[]
    }, 
    flags : {
      png : string
    } , 
    population : number
}

const Information: React.FC =()=> {
    const {country} = useParams<{country : string}>()
    const [error  , setError] = useState<string>('')
    const [loading , setLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const [information  , setInformation] = useState<countrystrc | null>(null)

    useEffect(()=>{
        const getData =async ()=>{
            setLoading(true)
            setError('')
            try {
              const res = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
              const data =await res.json()
             
              setInformation(data[0]);
              console.log(information);
              setLoading(false)
              
            } catch (error) {
              setError('Please check if country name is valid or not')
              setLoading(false)
            }
          }    
          getData() 
    } , [])

    const clickHandler = (event : React.MouseEvent<HTMLButtonElement>)=>{
        navigate(`/weather/${information?.capital[0]}`)
    }

  return (
    <div> 

        {error ? <h1>{error}</h1> : loading === true ? <h1>Loading...</h1>: information  ? 
               ( 
                <div className="blog_post">
                    <div className="container_copy">
                    <img src={information?.flags.png}  alt='flag'/>
                    <h1>Capital : {information?.capital[0]}</h1>
                    <p>Population : {information?.population}</p>
                    <button className="btn_primary" onClick={clickHandler} >
                        Weather
                    </button>
                    </div>
                 </div>  ) : (
                   <div className="blog_post">
                      <div className="container_copy">
                        <h1>Country Name is invalid</h1> 
                       </div>
                    </div> 
                 )
                }
    </div>
  )
}

export default Information