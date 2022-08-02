import React from 'react';
import Card from "../../Card/Card";

const Vehicles = ({items}) => {
    return (
        <>
            <h1>Vehicles</h1>
            <div className='cardsWrapper'>
                {items.map(item=>{
                    return (
                        <Card className='itemCard' key={item.edited}>
                            <div>{item.name}</div>
                        </Card>
                    )
                })}
            </div>
        </>
    );
};

export default Vehicles;