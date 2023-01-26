import './Styles.css'
import classNames from 'classnames'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Modal ({children}) {
    const stepBack = useNavigate();
    const [active, setActive]=useState(false)

    useEffect(()=> {
        setActive(true)
    },[])

    function onClose() {
        setActive(false);
        stepBack(-1)
    }
 
    return (
        <div onClick={onClose} className={classNames("modal", {["active"]:active})}>
            <div onClick={e => e.stopPropagation()} className={classNames("modal_content", {["active"]:active})}>
            {children}
            </div>
        </div>
    )
}