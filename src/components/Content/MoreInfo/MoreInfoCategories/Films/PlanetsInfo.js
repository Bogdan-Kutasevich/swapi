import React from 'react';
import './PlanetsInfo.css'
import AddBtn from "../../../../Buttons/Add/AddBtn";
import LikeBtn from "../../../../Buttons/Like/LikeBtn";

const PlanetsInfo = ({data}) => {
    const ignoreParametrs = ['name', 'films', 'url', 'image', 'residents']
    return (

        <>
            <h1 className='planetsMoreInfoTitle'>{data.name}</h1>
            <div className='planetsMoreInfoWrapper'>
                <div className='planetsMoreInfoIMG'>
                    <img src={data.image} alt=''/>
                </div>
                <div className='planetsMoreInfoText'>
                    {Object.keys(data).map(item=>{
                        if(!(ignoreParametrs.includes(item))){
                           return  <p key={item}>{item}: {data[item]}</p>
                        }
                        return null
                        })}
                    <div className='planetsMoreInfoTextBtns'>
                        <AddBtn/>
                        <LikeBtn/>
                    </div>

                </div>
            </div>


        </>
    );
};

export default PlanetsInfo;