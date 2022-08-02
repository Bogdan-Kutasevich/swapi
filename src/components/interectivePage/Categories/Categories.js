import '../interective.css'
import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Requests from '../../../requests/requests'
import {categoriesImages} from '../../../imgLinks/imgLinks'


const Categories = (props) => {
    const [loader, setLoader] = useState(true)

        useEffect(()=>{
        Requests.getCategories('https://swapi.dev/api/')
            .then(response => {
                let data = response.data
                data = Object.entries(data)
                data = data.map(elem=>{
                    elem.push(categoriesImages[elem[0]])
                    return elem
                })
                return data
            })
            .then(data =>{
                props.setCategories(data)
                setLoader(false)
            })
    },[props])


    if(loader){
        return(
            <div>...loading</div>
        )
    }else{
        return (
            <Carousel className='Carousel'>
                {props.state.categories.map(
                    (elem, index) => {
                        return (
                            <Carousel.Item className='CarouselItem' key={index}>
                                <div style={{backgroundImage: `url(${elem[2]})`,
                                backgroundSize:'cover',
                                }} className='nameOfCategorie'>
                                    <NavLink key={index} to={elem[0]}>
                                        <div className='backdrop'>{elem[0].toUpperCase()}</div>
                                    </NavLink>
                                </div>
                            </Carousel.Item>
                        )
                    })}
            </Carousel>
        );
    }
}


export default Categories;