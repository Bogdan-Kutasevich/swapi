import './App.css';
import Header from "./components/headers/Header";
import Crumbs from "./components/Crumbs/Crumbs";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Categories from "./components/Categories/Categories";
import MoreInfo from './components/Content/MoreInfo/MoreInfo'

function App() {

    return (
        <div className="App">
            <Header/>
            <Crumbs/>
            <div className='ContentMain'>
                <Routes>
                    <Route path='/' element={<Categories/>}/>
                    <Route path='/:categories/*' element={<Content/>}/>
                    <Route path='/:categories/:object' element={<MoreInfo/>}/>
                    <Route path='login' element={<Login/>}/>
                </Routes>
            </div>
            <Footer className='footerWrapper'/>
        </div>
    );
}

export default App;
