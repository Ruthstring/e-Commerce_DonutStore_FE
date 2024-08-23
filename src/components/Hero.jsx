import React from "react"
import { useNavigate } from "react-router-dom";


const Hero=()=>{
    const navigate= useNavigate();

    const handleButtonClick=()=>{
        navigate("/shopping-cart")
    }
    return(
     <div className="heroContainer mb-28 mt-28">
        <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-12">
                The best
                <br/>
                 vegan Donuts
                 <br/>
                 are here.
            </h1>
        </div>
       
       <div className="mb-8">
       <button 
        onClick={handleButtonClick}
        className="button  text-white py-2 px-4 rounded text-center"> Order now</button>
       </div>
       
     </div>
    )
}

export default Hero;