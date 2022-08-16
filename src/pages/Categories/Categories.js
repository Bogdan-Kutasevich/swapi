import React from "react";
import {useEffect, useState} from "react";
import Requests from "../../requests/requests";
import {useParams} from "react-router-dom";
import Pagination from "../../components/Pagination/pagination";
import './Categories.css'
import loaderLogo from '../../assets/loader.gif'
import {Images} from '../../imgLinks/imgLinks'
import Details from "./Details";
import Card from "../../components/Card/Card";


const Categories = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [countOfItems, setCountOfItems] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(0)
    const numberOfPages = Math.ceil(countOfItems / itemPerPage)

    const [items, setItems] = useState([])
    const [details, setDetails] = useState([])
    const [animationCard, setAnimationCard] = useState(false)

    const [loader, setLoader] = useState(true)
    const params = useParams()

    useEffect(() => {
        setCurrentPage(1)
    }, [params.categories])

    useEffect(() => {
        setLoader(true)
        Requests.getCategories(`https://swapi.dev/api/${params.categories}/?page=${currentPage}`)
            .then(response => {
                setDetails([])
                setCountOfItems(response.data.count)
                setItemPerPage(response.data.results.length)
                let data = response.data.results
                data = data.map(elem => {
                    let addingImage = elem.name ? elem.name : elem.title
                    elem.image = Images[addingImage]
                    return elem
                })
                console.log(data)
                return data
            })
            .then(data => {
                setItems(data)
                setLoader(false)
            })
            .finally(

            )
    }, [currentPage, params.categories])

    return (
        <>
            {loader && <div className='loader'><img src={loaderLogo} alt='Loading...'/></div>}
            {items && <div className='WrapperCategories'>
                {/*animation block*/}
                <Details details={details} animationCard={animationCard}/>
                {/*cards*/}
                <div className='cardsWrapper'>
                    {items.map(item => {
                        return (
                            <Card key={item.title}
                                  item={item}
                                  setDetails={setDetails}
                                  setAnimationCard={setAnimationCard}
                                  animationCard={animationCard}
                            >
                            </Card>
                        )
                    })}
                </div>
                {/*pagination block*/}
                {(numberOfPages > 1) && <Pagination
                    numberOfPages={numberOfPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />}
            </div>}
        </>
    )
}
export default Categories;