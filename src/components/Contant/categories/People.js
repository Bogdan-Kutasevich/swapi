import React from 'react';

const Films = ({items}) => {
    return (
        <div>
            <h1>Hello</h1>
            {items.map(item=>{

                return (<div key={item.release_date}>{item.title}</div>)
            })}
        </div>
    );
};

export default Films;