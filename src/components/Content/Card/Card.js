import React from 'react';
import styles from './Card.module.css'






const Card = ({item, setAbout, setClassChange, classChange}) => {

    const changePlanet = ()=>{
        setAbout(prevAbout=>{
            prevAbout.unshift(item)
            if (prevAbout.length>2){
                prevAbout.pop()
            }
            return prevAbout
        })
        setClassChange(!classChange)
    }

    return (
        <div className={styles.mainCard} onClick={changePlanet}
             style={{backgroundImage: `url(${item.image})`, backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
            <div className={styles.children}>
                {item.name}
                {item.title}
            </div>
        </div>
    );
};

export default Card;