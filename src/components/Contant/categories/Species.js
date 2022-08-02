import React from 'react';
import Card from "../../Card/Card";

const Species = ({items}) => {
    return (
        <>
            <h1>Species</h1>
            <div className='cardsWrapper'>
                {items.map(item=>{
                    return (
                        <Card className='itemCard' key={item.average_height}>
                            <div>{item.name}</div>
                        </Card>
                    )
                })}
            </div>
        </>

    );
};

export default Species;