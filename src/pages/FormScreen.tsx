import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";
import './Form.css'


const FormScreen : React.FC = () =>{
    const [country , setCountry] = useState<string>('')
    const [disabled , setDisabled] = useState<boolean>(true)
    const navigate = useNavigate()

    const inputHandler = (event : React.ChangeEvent<HTMLInputElement> )=>{
        setCountry(event.currentTarget.value)

        if(event.target.value.length > 0){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }   

    const handleClick = (event : React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault()
        navigate(`/information/${country}`)
    }

    return (
        <div className="wrap">
          <div className="search">
            <input placeholder='Enter country Name' className="searchTerm"  type='text' value={country} onChange={inputHandler}  />
            <button onClick={handleClick} disabled={disabled} >
                Search
            </button>
          </div>
        </div>
    )
}

export default FormScreen