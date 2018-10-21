import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Sidedrawer.css'

const Sidedrawer = (props) => {


    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open){
        attachedClasses[1] = classes.Open;
    }

    return (
        <>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </>
    );
};

export default Sidedrawer;