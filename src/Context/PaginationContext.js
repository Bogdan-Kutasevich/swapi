import React,{createContext, useState}  from 'react';

export const PaginationContext = createContext()

const ContextPagination = (props) => {
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(0)
    const numberOfPages = Math.ceil(count / itemPerPage)

    const value = {
        count, setCount, currentPage, setCurrentPage, numberOfPages, itemPerPage, setItemPerPage
    }

    return (
        <PaginationContext.Provider value={value}>
            {props.children}
        </PaginationContext.Provider>
    );
};

export default ContextPagination;