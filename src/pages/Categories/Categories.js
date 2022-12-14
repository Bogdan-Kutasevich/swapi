import React from "react";
import {useEffect, useState} from "react";
import Requests from "../../requests/requests";
import {useParams} from "react-router-dom";
import Pagination from "../../components/Pagination/pagination";
import styles from './Categories.module.css'
import loaderLogo from '../../assets/loader.gif'
import {Images} from '../../imgLinks/imgLinks'
import Details from "../../components/Details/Details";
import Card from "../../components/Card/Card";
import {ref, set, onValue} from "firebase/database";
import {db} from "../../Base";


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
                    onValue(ref(db, "cards/"), (snapshot) => {
                        if(snapshot.val()){
                            const list = Object.keys(snapshot.val());
                            if(list.includes((elem.name || elem.title))){

                            } else {
                                set(ref(db, "cards/" + (elem.name || elem.title)),{
                                    countOfLike:0,
                                    comments:[],
                                    userLikeList:[]
                                })
                            }
                        }else{
                            set(ref(db, "cards/" + (elem.name || elem.title)),{
                                countOfLike:0,
                                comments:[],
                                userLikeList:[]
                            })
                        }

                    }, {
                        onlyOnce: true
                    });
                    return elem
                })
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
            <h1 className={styles.categoriesTitle}>{(params.categories).toUpperCase()}</h1>
            {loader && <div className={styles.loader}><img src={loaderLogo} alt='Loading...'/></div>}
            {(items && !loader) && <div className={styles.WrapperCategories}>
                {/*animation block*/}
                <Details details={details} animationCard={animationCard} currentPage={currentPage}/>
                {/*cards*/}
                <div className={styles.cardsWrapper}>
                    {items.map(item => {
                        return (
                            <Card key={item.title || item.name}
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