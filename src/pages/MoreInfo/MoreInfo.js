import React from 'react';
import './moreInfo.module.css'
import {animated, useTransition} from "react-spring";
import {useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import stylesCss from './moreInfo.module.css'
import Requests from "../../requests/requests";
import {Images} from "../../imgLinks/imgLinks";
import AddBtn from "../../components/Buttons/Add/AddBtn";
import LikeBtn from "../../components/Buttons/Like/LikeBtn";
import loaderLogo from "../../assets/loader.gif";
import Comments from "../../components/Comments/Comments";


const MoreInfo = () => {
    const params = useParams()
    const [item, setItem] = useState({})
    const [loader, setLoader] = useState(true)
    const [itemProperty, setItemProperty] = useState([])

    useEffect(() => {
        setLoader(true)
        Requests.getCategories(`https://swapi.dev/api/${params.categories}/${params.moreInfo}/`)
            .then(response => {
                let data = response.data
                data = {
                    ...data,
                    image: Images[data.name || data.title]
                }
                setItem(data)
                setLoader(false)
            })
    }, [params.categories, params.moreInfo])

    useEffect(()=>{
        const itemArr = []
        Object.keys(item).map(property => {
            if(typeof item[property] === "number"){
                return null
            }else if (property==='image') {
                return null
            }else if ((Array.isArray(item[property])) || (item[property].slice(0, 4)==='http')){
                return null
            }else {
                itemArr.push(property)
            }
            return null
        })
        setItemProperty(itemArr)
    },[item])

    const appear = useTransition (true, {
        from: {left:'-1500px'},
        enter: {left:'0px', config:{duration:500}},
        leave: {left:'-1500px', config:{duration:500}}
        })

    return (
            <>
                {loader && <div className='loader'><img src={loaderLogo} alt='Loading...'/></div>}
                <div className={stylesCss.moreInfoMainWrapper}>
                {item && appear((styles) => (
                <animated.div className={stylesCss.moreInfoMain} style={styles}>
                    <>
                        <h1 className={stylesCss.MoreInfoTitle}>{item.name || item.title}</h1>
                        <div className={stylesCss.MoreInfoWrapper}>
                            <div className={stylesCss.MoreInfoIMG}>
                                <img src={item.image} alt=''/>
                            </div>
                            <div className={stylesCss.MoreInfoText}>
                                {itemProperty.map((property)=>{
                                    return  <p key={property}>{property}: {item[property]}</p>
                                })}
                                <div className={stylesCss.MoreInfoTextBtns}>
                                    <AddBtn item={item}/>
                                    <Link to={`related`} className={stylesCss.MoreInfoRelated}>Related stuff</Link>
                                    <LikeBtn itemTitle = {item.name || item.title}/>
                                </div>
                            </div>

                        </div>
                        <Comments itemTitle = {item.name || item.title}/>
                    </>
                </animated.div>))}
                </div>
            </>
    );
};

export default MoreInfo;