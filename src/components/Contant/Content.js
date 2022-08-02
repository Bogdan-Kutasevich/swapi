import React from "react";
import {useEffect, useState} from "react";
import Requests from "../../requests/requests";
import {useParams} from "react-router-dom";
import Films from "./categories/Films";
import Planets from "./categories/Planets";
import People from "./categories/People";
import Species from "./categories/Species";
import StarShips from "./categories/StarShips";
import Vehicles from "./categories/Vehicles";
import Pagination from "./categories/pagination";
import './Content.css'
import loaderLogo from './806.gif'



const Content = () => {
    const [loader, setLoader] = useState(true)
    const [items, setItems] = useState({})
    const params = useParams()
    //Pagination params
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(0)
    const numberOfPages = Math.ceil(count/itemPerPage)

    useEffect(()=>{

        setLoader(true)
        Requests.getCategories(`https://swapi.dev/api/${params.categories}`)
            .then(response => {
                setCount(response.data.count)
                setItemPerPage(response.data.results.length)
                setCurrentPage(1)
                let data = response.data.results
                return data
            })
            .then(data =>{
                setItems(data)
                setLoader(false)
            })
    },[params])

    //UseEffect for pagination
    useEffect(()=>{

        setLoader(true)
        Requests.getCategories(`https://swapi.dev/api/${params.categories}/?page=${currentPage}`)
            .then(response => {
                let data = response.data.results
                return data
            })
            .then(data =>{
                setItems(data)
                setLoader(false)
            })
    },[currentPage])




    if(loader){
        return(
            <div className='Loader'><img src={loaderLogo} alt='Loading...'/></div>
        )
    }else if(params.categories === 'films'){
        return (
            <>
                <Films items={items}/>
                {(numberOfPages>1)&&<Pagination
                numberOfPages = {numberOfPages}
                setCurrentPage = {setCurrentPage}

                />}
            </>
        );
    }else if(params.categories === 'planets'){
        return (
            <>
            <Planets items={items}/>
            {(numberOfPages>1)&&<Pagination numberOfPages = {numberOfPages}
             setCurrentPage = {setCurrentPage}
             currentPage = {currentPage}/>}
            </>
        );
    }else if(params.categories === 'people') {
        return (
            <>
                <People items={items}/>
                {(numberOfPages>1)&&<Pagination numberOfPages = {numberOfPages}
                setCurrentPage = {setCurrentPage}
                currentPage = {currentPage}
                />}
            </>

        );
    }
    else if(params.categories === 'species') {
        return (
            <>
                <Species items={items}/>
                {(numberOfPages>1)&&<Pagination numberOfPages = {numberOfPages}
                setCurrentPage = {setCurrentPage}
                currentPage = {currentPage}/>}
            </>
        );
    }else if(params.categories === 'starships') {
        return (
            <>
                <StarShips items={items}/>
                {(numberOfPages>1)&&<Pagination numberOfPages = {numberOfPages}
                setCurrentPage = {setCurrentPage}
                currentPage = {currentPage}/>}
            </>
        );
    }else if(params.categories === 'vehicles') {
        return (
            <>
                <Vehicles items={items}/>
                {(numberOfPages>1)&&<Pagination numberOfPages = {numberOfPages}
                setCurrentPage = {setCurrentPage}
                currentPage = {currentPage}/>}
            </>
        );
    }

}


export default Content;