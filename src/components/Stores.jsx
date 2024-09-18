import React from "react"
import DonutStore1 from "../assets/donut_store1.jpg"
import DonutStore2 from "../assets/donut_store2.jpg"
import DonutStore3 from "../assets/donut_store3.jpg"

const Stores=()=>{
    return(
     <div id="stores">
        <h1 className="title ml-10 md:ml-32 lg:ml-20 pt-10">Our stores</h1>
        {/* <ul className="flex gap-8 mt-20 mb-20 ml-4 mr-4 justify-center pb-10"> */}
        <ul className="grid gap-12 md:gap-0 mt-20 mb-20 ml-20 mr-4 justify-center pb-10 
                     grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> 
        <li className="store-card">
            <img
                className="store-card__background"
                src={DonutStore1}
                alt="Photo of our store in Berlin"
                width="1920"
                height="2193"
            />
            <div className="store-card__content | flow p-38">
                <div className="store-card__content--container | flow">
                <h2 className="store-card__title">Berlin</h2>
                <p className="store-card__description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
                    labore laudantium deserunt fugiat numquam.
                </p>
                </div>
                <div className="mb-10">
                    <a
                    href="https://www.google.com/maps/place/Mittenwalder+Str.,+10961+Berlin,+Germany/@52.4922606,13.3943405,16z/data=!3m1!4b1!4m14!1m7!3m6!1s0x47a851d2a928ad33:0xaaf7e0c15fce276c!2sTempodrom+Berlin!8m2!3d52.501626!4d13.381228!16s%2Fm%2F0k2y00z!3m5!1s0x47a84fd70249bab1:0x3067ad82b2499cb5!8m2!3d52.4922606!4d13.3969154!16s%2Fg%2F11cp8whq2s?entry=ttu"
                    target="_blank"
                    rel="noopener norefferer"
                    className="button"
                    >
                    <button c>View on map</button>
                    </a>
                </div>
            </div>
        </li>
        <li className="store-card">
            <img
                className="store-card__background"
                src={DonutStore3}
                alt="Photo of our store in Hamburg"
                width="1920"
                height="2193"
            />
            <div className="store-card__content | flow">
                <div className="store-card__content--container | flow">
                <h2 className="store-card__title">Hamburg</h2>
                <p className="store-card__description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
                    labore laudantium deserunt fugiat numquam.
                </p>
                </div>
                <div className="mb-10">
                    <a
                    href="https://www.google.com/maps/place/Lokstedt,+22529+Hamburg,+Germany/@53.5910386,9.9532168,17z/data=!3m1!4b1!4m15!1m8!3m7!1s0x47b161837e1813b9:0x4263df27bd63aa0!2sHamburg,+Germany!3b1!8m2!3d53.5488282!4d9.9871703!16zL20vMDNocno!3m5!1s0x47b18602657d5213:0x1ce2b45ea7af2771!8m2!3d53.5910386!4d9.9532168!16s%2Fg%2F11c61_xvgk?entry=ttu"
                    target="_blank"
                    rel="noopener norefferer"
                    className="button"
                    >
                    <button className=" button-store mb-10" >View on map</button>
                    </a>
                </div>
            </div>
        </li>
        <li class="store-card">
            <img
                className="store-card__background"
                src={DonutStore2}
                alt="Photo of our store in Dortmund"
                width="1920"
                height="2193"
            />
            <div className="store-card__content | flow">
                <div className="store-card__content--container | flow">
                <h2 className="store-card__title">Dortmund</h2>
                <p className="store-card__description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
                    labore laudantium deserunt fugiat numquam.
                </p>
                </div>
                <div className="mb-10">
                    <a
                    href="https://www.google.com/maps/place/Phoenixseestra%C3%9Fe+3,+44263+Dortmund,+Germany/@51.4870776,7.5038937,17z/data=!4m15!1m8!3m7!1s0x47b91760bff07a11:0x427f28131548750!2sDortmund,+Germany!3b1!8m2!3d51.5135872!4d7.4652981!16zL20vMDEzNWsy!3m5!1s0x47b91701294ea36b:0x207cf3484d50f633!8m2!3d51.4884301!4d7.5077824!16s%2Fg%2F11gdkndsly?entry=ttu"
                    target="_blank"
                    rel="noopener norefferer"
                    className="button"
                    >
                    <button >View on map</button>
                    </a>
                </div>
            </div>
        </li>

</ul>
     </div>
    )
}

export default Stores;