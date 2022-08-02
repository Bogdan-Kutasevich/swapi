import './App.css';
import Header from "./components/headers/Header";
import Interactive from "./components/interectivePage/interactivePage";
import Crumbs from "./components/Crumbs/Crumbs";
import Content from "./components/Contant/Content";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import ContentEmpty from "./components/Contant/ContentEmpty";
import React from "react";
import {Route, Routes} from "react-router-dom";

function App() {

    return (
        <div className="App">
            <Header/>
            <Crumbs/>
            <Interactive className='Interactive'/>
            <div className='ContentMain'>
                <Routes>
                    <Route path='/:categories' element={<Content/>}/>
                    <Route path='/' element={<ContentEmpty/>}/>
                    <Route path='login' element={<Login/>}/>
                </Routes>
            </div>
            <Footer className='footerWrapper'/>
        </div>
    );
}

export default App;
