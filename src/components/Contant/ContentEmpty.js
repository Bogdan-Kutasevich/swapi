import React from "react";
import {useEffect, useState} from "react";
import Requests from "../../requests/requests";
import {useParams} from "react-router-dom";



const Content = () => {
    const [loader, setLoader] = useState(true)
    const [items, setItems] = useState(null)
    const params = useParams()
    console.log(params.categories)

    useEffect(()=>{
        const response = Requests.getCategories(`https://swapi.dev/api/${params.categories}/`)
            .then(response => {
                let data = response.data.results
                return data
            })
            .then(data =>{
                setItems(data)
                setLoader(false)
            })
    },[params])


    if(loader){
        return(
            <div>...loading</div>
        )
    }else if(params.categories === 'films'){
        return (
            <div>
                <h1>Hello</h1>
                {items.map(item=>{
                    console.log(item)
                    return (<div key={item.episode_id}>{item.title}</div>)
                })}
            </div>

        );
    }else if(params.categories === 'planets'){
        return (
            <div>
                <h1>Planets</h1>
                {items.map(item=>{
                    console.log(item)
                    return (<div key={item.name}>{item.name}</div>)
                })}
            </div>

        );
    }
}


export default Content;