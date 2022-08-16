import React from 'react';
import './pagination.css'



const Pagination = ({currentPage, setCurrentPage, numberOfPages}) => {



    const pages = []
    for (let i=1; i<=numberOfPages; i++){
        pages.push(i)
    }


    return (
        <div className='pagination'>
            {pages.map(page=>(
                <div className={(currentPage === page)?'page-active':'page'}
                     key={page}
                     onClick={()=>{setCurrentPage(page)}}>
                    {page}
                </div>
            ))}
        </div>
    );
};

export default Pagination;