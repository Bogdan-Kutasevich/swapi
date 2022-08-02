import styles from './Crumbs.module.css'
import React from "react";
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {Link} from "react-router-dom";


const Crumbs = () => {

    const breadcrumbs = useBreadcrumbs();


    return (
        <div className={styles.Crumbs}>
            {breadcrumbs.map(({ breadcrumb }) => {

                return (
                    <span key={breadcrumb.key}>
                        <Link to={breadcrumb.key} className={styles.Link}> {`/ ${breadcrumb.props.children}`} </Link>
                    </span>
                )
            })}
        </div>
    );
}

export default Crumbs;