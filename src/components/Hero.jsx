import React from "react"
import { Link } from "react-router-dom";


const Hero=()=>{
  
    return(
     <div className="heroContainer mb-28 mt-19">
        <div className="mb-8">
            <p className="text-6xl md:text-8xl font-bold leading-tight mb-12">
                The best
                <br/>
                 vegan Donuts
                 <br/>
                 are here.
            </p>
        </div>
       
       <div className="mb-8">
       <Link to ="/cart" 
        className="button  text-white py-2 px-4 rounded text-center"> 
        Order now
        </Link>
       </div>
       
     </div>
    )
}

export default Hero;