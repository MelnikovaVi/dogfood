import classNames from "classnames";
import { useState } from "react";
import m from './Style.module.css'


export const Accordeon = ({children, title}) => {
    const [selected, setSelected] = useState(false);
    
    function toggleAccordeonState () {
        setSelected(!selected);
    }

    return (
        <div className={classNames(m.accordeon, {[m.active]: selected})}>
            <button className={m.accordeonBtn} onClick={toggleAccordeonState}>
                <p className={m.title}>{title}</p>
            </button>
            <div className={m.content}>
                <p className={m.text}>{children}</p>
            </div>
        </div>
    )
}