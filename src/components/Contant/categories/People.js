import React from 'react';
import Card from "../../Card/Card";
import '../Content.css'

const People = ({items}) => {

    return (
        <>
            <h1>People</h1>
            <div className='cardsWrapper'>
                {items.map(item=>{
                    return (
                        <Card className='itemCard' key={item.height}>
                            <div key={item.height}>
                                <div>{item.name}</div>
                                <div>{item.gender}</div>
                                <div>{item.height}</div>
                                <div>{item.mass}</div>
                                <div>{item.birth_year}</div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </>
    );
};

export default People;