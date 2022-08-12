import React, {useContext} from 'react';
import './moreInfo.css'
import {animated, useTransition} from "react-spring";
import {ObjectContext} from '../../../Context/objectContext'
import PlanetsInfo from './MoreInfoCategories/Planets/PlanetsInfo'
import {useParams} from "react-router-dom";


const MoreInfo = () => {

    const contextData = useContext(ObjectContext)
    const data = contextData.about[0]
    const params = useParams()


    const appear = useTransition (true, {
        from: {left:'-1500px'},
        enter: {left:'0px', config:{duration:500}},
        leave: {left:'-1500px', config:{duration:500}}
        })

    return (
            <>

                {data && appear((styles) => (
                <animated.div className='moreInfoMain' style={styles}>
                    {(params.categories === 'planets') && <PlanetsInfo data={data}/>}

                </animated.div>))}
            </>


    );
};

export default MoreInfo;