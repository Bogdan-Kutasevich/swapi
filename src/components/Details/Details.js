import React from 'react';
import { useTransition, animated } from 'react-spring'
import {Link} from "react-router-dom";
import styleCss from './Details.module.css'



const Details = ({details, animationCard}) => {

    const aboutFirst = details[0]
    const aboutSecond = details[1]
    const screenWidth = window.screen.width
    let transitionRight = 0
    let transition1Right = 0
    let transitionTop = 0

    if(screenWidth>749){
            transitionRight = '350px'
            transition1Right = '1200px'
            transitionTop = '0px'
        }else{
        transitionRight = '0px'
        transition1Right = '400px'
        transitionTop = '-50px'
    }


    const transitions = useTransition (animationCard, {
        from: {right:'0px',top:transitionTop, opacity:0},
        enter: {right: transitionRight, top:transitionTop, opacity:1, config:{duration:1000}},
        leave:{opacity:0, config:{duration:0}},
    })
    const transitions1 = useTransition (animationCard, {
        from: {right: transitionRight,top:transitionTop, opacity:1},
        enter: {right:transition1Right,top:transitionTop,opacity:0, config:{duration:1000}},
        leave:{opacity:0},
    })
    const transitionsText = useTransition (animationCard, {
        from: {opacity:0},
        enter: {opacity:1, config:{duration:1000}},
        leave:{opacity:0},
    })
    const transitionsText1 = useTransition (animationCard, {
        from: {opacity:1},
        enter: {opacity:0},
        leave:{opacity:0},
    })

    return (
        <div className={styleCss.wrapperAbout}>
            {!aboutFirst && <div className={styleCss.aboutEmpty}>
                    YOUR CHOICE...
            </div>}
            {aboutFirst && transitions((styles) => (
                        <animated.div className={styleCss.wrapperAboutFirst} style={styles}>
                            <img className={styleCss.about_img} src={aboutFirst.image} alt="img"/>
                        </animated.div>))}
            {aboutFirst && transitionsText((styles) => (
                            <animated.div className={styleCss.about_info} style={styles}>
                                {aboutFirst.name && <h1> {aboutFirst.name}</h1>}
                                {aboutFirst.title && <h1> {aboutFirst.title}</h1>}
                                {aboutFirst.population && <p>Population: {aboutFirst.population}</p>}
                                {aboutFirst.release_date && <p>Release date:{aboutFirst.release_date}</p>}
                                {aboutFirst.climate && <p>Climate: {aboutFirst.climate}</p>}
                                {aboutFirst.gender && <p>Gender: {aboutFirst.gender}</p>}
                                {aboutFirst.birth_year && <p>Birth day: {aboutFirst.birth_year}</p>}
                                {aboutFirst.classification && <p>Classification: {aboutFirst.classification}</p>}
                                {aboutFirst.language && <p>Language: {aboutFirst.language}</p>}
                                {aboutFirst.cost_in_credits && <p>Cost in credits: {aboutFirst.cost_in_credits}</p>}
                                {aboutFirst.manufacturer && <p>Manufacturer: {aboutFirst.manufacturer}</p>}
                            </animated.div>))}
            {aboutSecond && transitions1((styles) => (
                    <animated.div className={styleCss.wrapperAboutSecond} style={styles}>
                        <img className={styleCss.about_img} src={aboutSecond.image} alt="img"/>
                    </animated.div>))}
            {aboutSecond && transitionsText1((styles) => (
                        <animated.div className={styleCss.about_info} style={styles} >
                            {aboutSecond.name && <h1> {aboutSecond.name}</h1>}
                            {aboutSecond.title && <h1> {aboutSecond.title}</h1>}
                            {aboutSecond.population && <p>Population: {aboutSecond.population}</p>}
                            {aboutSecond.release_date && <p>Release date:{aboutSecond.release_date}</p>}
                            {aboutSecond.climate && <p>Clemate: {aboutSecond.climate}</p>}
                            {aboutSecond.gender && <p>Gender: {aboutSecond.gender}</p>}
                            {aboutSecond.birth_year && <p>Birth day: {aboutSecond.birth_year}</p>}
                            {aboutSecond.classification && <p>Classification: {aboutSecond.classification}</p>}
                            {aboutSecond.language && <p>Language: {aboutSecond.language}</p>}
                            {aboutSecond.cost_in_credits && <p>Cost in credits: {aboutFirst.aboutSecond}</p>}
                            {aboutSecond.manufacturer && <p>Manufacturer: {aboutFirst.aboutSecond}</p>}
                        </animated.div>))}
            {aboutFirst && <Link to={`/${aboutFirst.url.slice(22)}/`} className={styleCss.about_btn}>
                read more
            </Link>}
        </div>
    );
};

export default Details;