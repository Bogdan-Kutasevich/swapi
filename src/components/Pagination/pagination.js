import React from 'react';
import styles from './pagination.module.css'



const Pagination = ({currentPage, setCurrentPage, numberOfPages}) => {



    const pages = []
    for (let i=1; i<=numberOfPages; i++){
        pages.push(i)
    }


    return (
        <div className={styles.pagination}>
            {pages.map(page=>(
                <div className={(currentPage === page)? styles.pageActive:styles.page}
                     key={page}
                     onClick={()=>{setCurrentPage(page)}}>
                    {page}
                </div>
            ))}
        </div>
    );
};

export default Pagination;