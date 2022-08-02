import React from 'react';
import Card from "../../Card/Card";

const StarShips = ({items}) => {
    return (
        <>
            <h1>Starships</h1>
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

export default StarShips;