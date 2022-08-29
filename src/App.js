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
import Related from "./pages/Related/Related";
import SignUp from "./pages/SignUp/SignUp";
import Logout from "./pages/Logout/Logout";
import {AuthProvider} from "./context/authContext";
import MyPage from "./pages/MyPage/MyPage";

function App() {

    return (
        <AuthProvider>
            <div className="App">
                <Header/>
                <Crumbs/>
                <div className='ContentMain'>
                    <Routes>
                        <Route path='/' element={<ChooseCategories/>}/>
                        <Route path='/:categories/' element={<Categories/>}/>
                        <Route path='/:categories/:moreInfo/' element={<MoreInfo/>}/>
                        <Route path='/:categories/:moreInfo/Related' element={<Related/>}/>
                        <Route path='/login' element={<Login />}/>
                        <Route path='/signUp' element={<SignUp/>}/>
                        <Route path='/logout' element={<Logout />}/>
                        <Route path='/myPage' element={<MyPage />}/>
                    </Routes>
                </div>
                <Footer className='footerWrapper'/>
            </div>
        </AuthProvider>
    );
}

export default App;
