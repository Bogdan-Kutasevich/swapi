import './interective.css'
import React, {useState} from "react";
import {Transition} from "react-transition-group";
import CategoriesContainer from "./Categories/CategoriesContainer";


const Interactive = () => {
    const[hidden, setHidden] = useState(false)
    const hiddenCategories = () =>{
        setHidden(!hidden)
    }


    return (

            <div className='Interactive'>
                <div className='getCategories'>
                    <button onClick={hiddenCategories}>{hidden?`Close categories`:`Choose categories`}</button>
                </div>
                <div className='carouselContainer'>
                    <Transition
                        in={hidden}
                        timeout={1000}
                    >
                        {state => <div className={`animation ${state}`}>
                            <CategoriesContainer className='CategoriesContainer'/>
                        </div>}
                    </Transition>
                </div>
            </div>


    );
}

export default Interactive;