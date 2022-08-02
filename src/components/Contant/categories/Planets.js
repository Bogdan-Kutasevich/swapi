import React from 'react';
import Card from "../../Card/Card";

const Planets = ({items}) => {
    return (
        <>
            <h1>Planets</h1>
            <div className='cardsWrapper'>
                {items.map(item=>{
                    return (
                        <Card className='itemCard' key={item.name}>
                            <div>{item.name}</div>
                        </Card>
                    )
                })}
            </div>
        </>
    );
};

export default Planets;