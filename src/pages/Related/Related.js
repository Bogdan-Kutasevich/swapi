import React from 'react';
import {animated, useTransition} from "react-spring";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import stylesCss from './Related.module.css'
import Requests from "../../requests/requests";
import {Images} from "../../imgLinks/imgLinks";
import loaderLogo from "../../assets/loader.gif";
import RelatedLink from "../../components/RelatedLink/RelatedLink";


const Related = () => {
    const params = useParams()
    const [item, setItem] = useState({})
    const [loader, setLoader] = useState(true)
    const [relatedItems, setRelatedItems] = useState([])




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
    }, [params.categories,params.moreInfo])

    useEffect(() => {
        let relatedArr = []
        Object.keys(item).map(property => {
            if (typeof item[property] === "number") {
                return null
            } else if (property === 'image') {
                return null
            } else if ((Array.isArray(item[property])) || (item[property].slice(0, 4) === 'http')) {
                if (item[property].length > 0) {
                    if (property !== 'url') {
                        const link = item[property]
                        const category = property
                        relatedArr.push({category, link})
                    }
                }
            } else {
                return null
            }
            return null
        })
        setRelatedItems(relatedArr)
    }, [item])

    const appear = useTransition(true, {
        from: {left: '-1500px'},
        enter: {left: '0px', config: {duration: 500}},
        leave: {left: '-1500px', config: {duration: 500}}
    })

    return (
        <>
            {loader && <div className='loader'><img src={loaderLogo} alt='Loading...'/></div>}
            <div className={stylesCss.RelatedMainWrapper}>
            {item && appear((styles) => (
                <animated.div className={stylesCss.moreInfoMain} style={styles}>
                    <>
                        <div className={stylesCss.relatedTitleblock}>
                            <h1 className={stylesCss.relatedTitle}>{item.name || item.title}</h1>
                            <Link to={`/${params.categories}/${params.moreInfo}`} className={stylesCss.returnBtn} >Return back</Link>
                        </div>
                        <div className={stylesCss.MoreInfoWrapper}>
                            <div className={stylesCss.MoreInfoIMG}>
                                <img src={item.image} alt=''/>
                            </div>
                            <div className={stylesCss.MoreInfoText}>
                                {relatedItems.map((categorie)=>{
                                    if(Array.isArray(categorie.link)){
                                        return(
                                            <>
                                                <h2>{categorie.category}:</h2>
                                                {<div className={stylesCss.RelatedCardWrapper}>
                                                    {categorie.link.map((link)=>{
                                                        return <RelatedLink categorieLink={link} title={categorie.category}/>
                                                    })}
                                                </div>}
                                            </>
                                        )
                                    }
                                    return (
                                        <>
                                            <h2 className={stylesCss.titleCard}>{categorie.category}:</h2>
                                            <div className={stylesCss.RelatedCardWrapper}>
                                                <RelatedLink categorieLink={categorie.link}/>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                </animated.div>))}
            </div>
        </>
    );
};

export default Related;