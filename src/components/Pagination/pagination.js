import React, {useContext} from 'react';
import {PaginationContext} from '../../Context/PaginationContext'


const Pagination = () => {
    const paginationData = useContext(PaginationContext)
    const pages = []
    for (let i=1; i<=paginationData.numberOfPages; i++){
        pages.push(i)
    }

    return (
        <div className='pagination'>
            {pages.map(page=>(
                <div className={(paginationData.currentPage === page)?'page-active':'page'}
                     key={page}
                     onClick={()=>paginationData.setCurrentPage(page)}>
                    {page}
                </div>
            ))}
        </div>
    );
};

export default Pagination;