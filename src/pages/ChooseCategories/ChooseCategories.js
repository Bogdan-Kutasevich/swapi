import styles from './ChooseCategories.module.css'
import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Requests from '../../requests/requests'
import {categoriesImages} from '../../imgLinks/imgLinks'
import loaderLogo from "../../assets/loader.gif"


const ChooseCategories = () => {
    const [loader, setLoader] = useState(true)
    const [categories, setCategories] = useState([])

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
                setCategories(data)
                setLoader(false)
            })
    },[])


    if(loader){
        return(
            <div className={styles.loader}><img src={loaderLogo} alt='Loading...'/></div>
        )
    }else{
        return (
            <Carousel>
                {categories.map(
                    (elem, index) => {
                        return (
                            <Carousel.Item key={index}>
                                    <div className={styles.CarouselImg} style={{backgroundImage: `url(${elem[2]})`}}>
                                    </div>
                                    <NavLink className={styles.itemLink} key={index} to={elem[0]}>
                                        {elem[0].toUpperCase()}
                                    </NavLink>
                            </Carousel.Item>
                        )
                    })}
            </Carousel>
        );
    }
}


export default ChooseCategories;