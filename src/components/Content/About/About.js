import React, {useContext} from 'react';
import { useTransition, animated } from 'react-spring'
import {Link} from "react-router-dom";
import {ObjectContext} from '../../../Context/objectContext'


const About = () => {
    const data = useContext(ObjectContext)
    const aboutFirst = data.about[0]
    const aboutSecond = data.about[1]
    const classChange = data.classChange

    const transitions = useTransition (classChange, {
        from: {right:'-100px',top:'0px', opacity:0},
        enter: {right:'350px', top:'0px', opacity:1, config:{duration:1000}},
        leave:{opacity:0, config:{duration:0}},


    })
    const transitions1 = useTransition (classChange, {
        from: {right:'350px',top:'0px', opacity:1},
        enter: {right:'1200px',top:'0px',opacity:0, config:{duration:1000}},
        leave:{opacity:0},
    })
    const transitionsText = useTransition (classChange, {
        from: {opacity:0},
        enter: {opacity:1, config:{duration:1000}},
        leave:{opacity:0},
    })
    const transitionsText1 = useTransition (classChange, {
        from: {opacity:1},
        enter: {opacity:0},
        leave:{opacity:0},
    })

    return (

        <div className='wrapperAbout'>
            {!aboutFirst && <div className='aboutEmpty'>
                    YOUR CHOICE...
            </div>}
            {aboutFirst && transitions((styles) => (
                        <animated.div className='wrapperAboutFirst' style={styles}>
                            <img className='about_img' src={aboutFirst.image} alt="img"/>
                        </animated.div>))}
            {aboutFirst && transitionsText((styles) => (
                            <animated.div className='about_info' style={styles}>
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
                    <animated.div className='wrapperAboutSecond' style={styles}>
                        <img className='about_img' src={aboutSecond.image} alt="img"/>
                    </animated.div>))}
            {aboutSecond && transitionsText1((styles) => (
                        <animated.div className='about_info' style={styles} >
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
            {aboutFirst && <Link to='info' className='about_btn'>read more</Link>}
            </div>
    );
};

export default About;