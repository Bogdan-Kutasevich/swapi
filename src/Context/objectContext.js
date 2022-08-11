import React,{createContext, useState}  from 'react';

export const ObjectContext = createContext()

const ContextObject = (props) => {
    const [items, setItems] = useState({})
    const [about, setAbout] = useState([])
    const [classChange, setClassChange] = useState(false)
    const value = {
        about, setAbout, classChange, setClassChange, items, setItems
    }
    return (
        <ObjectContext.Provider value={value}>
            {props.children}
        </ObjectContext.Provider>
    );
};

export default ContextObject;