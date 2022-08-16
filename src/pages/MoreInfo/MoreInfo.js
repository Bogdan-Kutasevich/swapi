import React from 'react';
import './moreInfo.module.css'
import {animated, useTransition} from "react-spring";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import stylesCss from './moreInfo.module.css'
import Requests from "../../requests/requests";
import {Images} from "../../imgLinks/imgLinks";
import AddBtn from "../../components/Buttons/Add/AddBtn";
import LikeBtn from "../../components/Buttons/Like/LikeBtn";
import loaderLogo from "../../assets/loader.gif";


const MoreInfo = () => {

    const [item, setItem] = useState({})
    const [loader, setLoader] = useState(true)
    const params = useParams()
    const ignoreParametrs = ['name', 'films', 'url', 'image', 'residents']
    useEffect(() => {
        setLoader(true)

        Requests.getCategories(`https://swapi.dev/api/${params.categories}/${params.id}`)
            .then(response => {
                let data = response.data
                data = {
                    ...data,
                    image: Images[data.name]
                }
                setItem(data)
                console.log(data)
                setLoader(false)
            })
    }, [])


    const appear = useTransition (true, {
        from: {left:'-1500px'},
        enter: {left:'0px', config:{duration:500}},
        leave: {left:'-1500px', config:{duration:500}}
        })

    return (
            <>
                {loader && <div className='loader'><img src={loaderLogo} alt='Loading...'/></div>}
                {item && appear((styles) => (
                <animated.div className={stylesCss.moreInfoMain} style={styles}>
                    <>
                        <h1 className={stylesCss.MoreInfoTitle}>{item.name}</h1>
                        <div className={stylesCss.MoreInfoWrapper}>
                            <div className={stylesCss.MoreInfoIMG}>
                                <img src={item.image} alt=''/>
                            </div>
                            <div className={stylesCss.MoreInfoText}>
                                {Object.keys(item).map(obj=>{
                                    if(!(ignoreParametrs.includes(obj))){
                                        return  <p key={obj}>{obj}: {item[obj]}</p>
                                    }
                                    return null
                                })}
                                <div className={stylesCss.MoreInfoTextBtns}>
                                    <AddBtn/>
                                    <LikeBtn/>
                                </div>
                            </div>
                        </div>
                    </>
                </animated.div>))}
            </>
    );
};

export default MoreInfo;