import React from 'react';
import Card from "../../Card/Card";

const Films = ({items}) => {
    return (
        <>
            <h1>Films</h1>
            <div className='cardsWrapper'>
                {items.map(item=>{
                    return (
                        <Card className='itemCard' key={item.title}>
                            <div>{item.title}</div>
                        </Card>
                    )
                })}
            </div>
        </>
    );
};

export default Films;