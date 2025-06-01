import React from "react";
import classes from './Card.module.css';
import UploadAndDisplayImage from "./UploadImg";

function Card() {
    return (
        <div className={classes.div__card}>
            <UploadAndDisplayImage/>
        </div>
    );
}

export default Card