import React from "react"
import { Link } from "react-router-dom";


const Hero=()=>{
  
    return(
     <div className=" heroContainer h-screen flex flex-col justify-start pt-20">
      <div>
            <p className="best-title text-6xl md:text-8xl font-bold leading-tight mb-12">
                The best
                <br/>
                 vegan Donuts
                 <br/>
                 are here.
            </p>
        
       <Link to ="/cart" 
        className="button  text-white py-2 px-4 rounded text-center"> 
        Order now
        </Link>
       </div>
       
     </div>
    )
}

export default Hero;