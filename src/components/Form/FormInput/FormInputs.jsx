import { forwardRef } from "react"
import m from "./Styles.module.css"

export const FormInput = forwardRef((props, OutRef)=> {
    return (
        props.type === 'textarea' ? <textarea ref={OutRef} className={m.textarea} {...props}/>:
                                    <input ref={OutRef} className={m.input} {...props}/>
    )
})