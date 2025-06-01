import React, { useState } from "react";
import classes from "./Traks.module.css";

const Traks = () => {
    return (
        <div className={classes.div__main}>
            <div className={classes.div__group}>
                <div className={classes.div__column}>
                    <a href="/favorites" className={classes.a__group}>Избранное</a>
                    <p className={classes.p__group}>23 композиции</p>
                </div>
                <img src="Like icon 3d vector illustration 2.png" alt="" className={classes.img__group1}/>
            </div>
            <div className={classes.div__group}>
                <div className={classes.div__column}>
                    <a href="" className={classes.a__group}>Мои записи</a>
                    <p className={classes.p__group}>Композиций нет</p>
                </div>
                <img src="Group 1.png" alt="" className={classes.img__group2}/>
            </div>
        </div>
    )
}

export default Traks