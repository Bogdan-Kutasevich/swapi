import React, {useContext} from 'react';
import Card from "../Card/Card";
import {ObjectContext} from '../../../Context/objectContext'

const StarShips = () => {
    const objectData = useContext(ObjectContext)

    return (
        <>
            <div className='cardsWrapper'>
                {objectData.items.map(item=>{
                    return (
                        <Card key={item.name}
                              item = {item}
                              setAbout={objectData.setAbout}
                              about={objectData.about}
                              setClassChange={objectData.setClassChange}
                              classChange={objectData.classChange}
                        >
                        </Card>
                    )
                })}
            </div>
        </>
    );
};

export default StarShips;