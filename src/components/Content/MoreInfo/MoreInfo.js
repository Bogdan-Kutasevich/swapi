import React, {useContext} from 'react';
import './moreInfo.css'
import {animated, useTransition} from "react-spring";
import {ObjectContext} from '../../../Context/objectContext'


const MoreInfo = () => {

    const contextData = useContext(ObjectContext)
    const data = contextData.about[0]




    const appear = useTransition (true, {
        from: {left:'-1500px'},
        enter: {left:'0px', config:{duration:1000}},
        })

    return (
            <div>
                {data && appear((styles) => (
                <animated.div className='moreInfoMain' style={styles}>
                    <img className='moreInfoImage' src={data.image} alt="logo"/>
                    {Object.keys(data).map(item=>{
                        return (<p key={item}>{item}: {data[item]}</p>)
                    })}
                </animated.div>))}
            </div>


    );
};

export default MoreInfo;