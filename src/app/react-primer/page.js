"use client";
import {useState} from "react";
import Checkbox from "./Checkbox.js"
const ReactPrimer = ()=>{
    const [controlSel,setControlSel] =useState(false);

    return <div>
        <button onClick={() => {setControlSel(true)}}>Turn On</button>
        <h1>React Primer</h1>
        <Checkbox controlChecked={controlSel}/>
        <button onClick={() => {setControlSel(false)}}>Turn Off</button>
    </div>
}

export default ReactPrimer;