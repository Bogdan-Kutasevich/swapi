import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import styles from './Related.module.css'
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


    return (
        <>
            {loader && <div className={styles.loader}><img src={loaderLogo} alt='Loading...'/></div>}
            {((Object.keys(item)).length) &&  <div className={styles.relatedMainWrapper}>
                        <div className={styles.relatedTitleblock}>
                            <h1 className={styles.relatedTitle}>{item.name || item.title}</h1>
                            <Link to={`/${params.categories}/${params.moreInfo}`} className={styles.relatedReturnBtn} >Return back</Link>
                        </div>
                        <div className={styles.relatedInfoWrapper}>
                            <img className={styles.relatedInfoIMG} src={item.image} alt=''/>
                            <div className={styles.relatedInfoText}>
                                {relatedItems.map((categorie)=>{
                                    if(Array.isArray(categorie.link)){
                                        return(
                                            <>
                                                <h2 className={styles.titleCard}>{(categorie.category).toUpperCase()}:</h2>
                                                {<div className={styles.relatedCardWrapper}>
                                                    {categorie.link.map((link)=>{
                                                        return <RelatedLink categorieLink={link} title={categorie.category}/>
                                                    })}
                                                </div>}
                                            </>
                                        )
                                    }
                                    return (
                                        <>
                                            <h2 className={styles.titleCard}>{(categorie.category).toUpperCase()}:</h2>
                                            <div className={styles.relatedCardWrapper}>
                                                <RelatedLink categorieLink={categorie.link}/>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                </div>}
        </>
    );
};

export default Related;