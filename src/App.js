import './App.css';
import Header from "./components/headers/Header";
import Crumbs from "./components/Crumbs/Crumbs";
import Categories from "./pages/Categories/Categories";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import React from "react";
import {Route, Routes} from "react-router-dom";
import MoreInfo from "./pages/MoreInfo/MoreInfo";
import ChooseCategories from "./pages/ChooseCategories/ChooseCategories";

function App() {

    return (
        <div className="App">
            <Header/>
            <Crumbs/>
            <div className='ContentMain'>
                <Routes>
                    <Route path='/' element={<ChooseCategories/>}/>
                    <Route path='/:categories/' element={<Categories/>}/>
                    <Route path='/:categories/:id' element={<MoreInfo/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </div>
            <Footer className='footerWrapper'/>
        </div>
    );
}

export default App;
