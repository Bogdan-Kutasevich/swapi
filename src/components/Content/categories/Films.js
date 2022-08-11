import React, {useContext} from 'react';
import Card from "../Card/Card";
import {ObjectContext} from '../../../Context/objectContext'


const Films = () => {
    const objectData = useContext(ObjectContext)
    return (
        <>
            <div className='cardsWrapper'>
                {objectData.items.map(item=>{
                    return (
                        <Card key={item.title}
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

export default Films;