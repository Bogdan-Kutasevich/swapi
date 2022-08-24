import React, {useState} from 'react';
import {useEffect} from "react";
import Requests from "../../requests/requests";
import styles from './ReletedCards.module.css'
import {Link} from "react-router-dom";


const ReletedCards = ({categorieLink}) => {
    const [reletedCardItem, setReletedCardItem] =  useState()

    useEffect(() => {
        Requests.getCategories(categorieLink)
            .then(response => {
                const data = response.data
                setReletedCardItem(data)
            })
    }, [categorieLink])

    return (
        <>
            {reletedCardItem &&
                <Link to={`/${reletedCardItem.url.slice(22)}`} className={styles.linkRelatedCard}>
                    {reletedCardItem.name || reletedCardItem.title},
                </Link>}
        </>
    );
};

export default ReletedCards;