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
import Pagination from "../Pagination/pagination";
import './Content.css'
import loaderLogo from './loader.gif'
import {Images} from '../../imgLinks/imgLinks'
import About from "./About/About";
import {PaginationContext} from '../../Context/PaginationContext'
import {ObjectContext} from "../../Context/objectContext";
import {useContext} from "react";

const Content = () => {
    const paginationData = useContext(PaginationContext)
    const objectData = useContext(ObjectContext)
    const [loader, setLoader] = useState(true)
    const params = useParams()

    useEffect(()=>{
        paginationData.setCurrentPage(1)
    },[params.categories])

    useEffect(() => {
        setLoader(true)
        Requests.getCategories(`https://swapi.dev/api/${params.categories}/?page=${paginationData.currentPage}`)
            .then(response => {
                objectData.setAbout([])
                paginationData.setCount(response.data.count)
                paginationData.setItemPerPage(response.data.results.length)
                let data = response.data.results
                data = data.map(elem=>{
                    let addingImage = elem.name ? elem.name : elem.title
                    elem.image = Images[addingImage]
                    return elem
                })
                return data
            })
            .then(data => {
                objectData.setItems(data)
                setLoader(false)
            })
    }, [paginationData.currentPage,params.categories])

    if (loader) {
        return (
            <div className='loader'><img src={loaderLogo} alt='Loading...'/></div>
        )
    } else if (params.categories === 'films') {
        return (
            <div className='WrapperCategories'>
                <About/>
                <Films/>
                {(paginationData.numberOfPages > 1) && <Pagination/>}
            </div>
        );
    } else if (params.categories === 'planets') {
        return (
            <div className='WrapperCategories'>
                <About/>
                <Planets/>
                {(paginationData.numberOfPages > 1) && <Pagination/>}
            </div>
        );
    } else if (params.categories === 'people') {
        return (
            <div className='WrapperCategories'>
                <About/>
                <People/>
                {(paginationData.numberOfPages > 1) && <Pagination/>}
            </div>
        );
    } else if (params.categories === 'species') {
        return (
            <div className='WrapperCategories'>
                <About/>
                <Species/>
                {(paginationData.numberOfPages > 1) && <Pagination/>}
            </div>
        );
    } else if (params.categories === 'starships') {
        return (
            <div className='WrapperCategories'>
                <About/>
                <StarShips/>
                {(paginationData.numberOfPages > 1) && <Pagination/>}
            </div>
        );
    } else if (params.categories === 'vehicles') {
        return (
            <div className='WrapperCategories'>
                <About/>
                <Vehicles/>
                {(paginationData.numberOfPages > 1) && <Pagination/>}
            </div>
        );
    }

}


export default Content;