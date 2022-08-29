import React, {useState} from 'react';
import styles from './MyPageCard.module.css'
import {useEffect} from "react";
import Requests from "../../requests/requests";
import {Images} from "../../imgLinks/imgLinks";


const MyPageCard = ({url, setDetails, setAnimationCard, animationCard}) => {
    const [item, setItem] = useState()

    const changePlanet = ()=>{
        setDetails(prev=>{
            prev.unshift(item)
            if (prev.length>2){
                prev.pop()
            }
            return prev
        })
        setAnimationCard(!animationCard)
    }

    useEffect(() => {
        Requests.getCategories(url)
            .then(response => {
                let data = response.data
                data = {
                    ...response.data,
                    image: Images[data.name || data.title]
                }
                setItem(data)
            })
    }, [url])

    return (
        <>
            {item && <div onClick={changePlanet}
                className={styles.mainCard} style={{backgroundImage: `url(${item.image})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
                        <div className={styles.children} >
                            {item.name ? item.name : item.title}
                        </div>
            </div>}
        </>
    );
};

export default MyPageCard;