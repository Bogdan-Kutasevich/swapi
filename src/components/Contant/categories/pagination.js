import React from 'react';

const Pagination = (props) => {
    const pages = []
    for (let i=1; i<=props.numberOfPages; i++){
        pages.push(i)
    }

    return (
        <div className='pagination'>
            {pages.map(page=>(
                <div className={(props.currentPage === page)?'page-active':'page'}
                     key={page}
                     onClick={()=>props.setCurrentPage(page)}>
                    {page}
                </div>
            ))}
        </div>
    );
};

export default Pagination;