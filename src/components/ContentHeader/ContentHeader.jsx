import { children } from "react"
import { useNavigate } from "react-router-dom"
import m from './Styles.module.css'

export const ContentHeader = ({name, children}) => {
    const backwardNavigate = useNavigate();
    return (
        <div>
            <a href="#" className={m.btnBack} onClick={()=> backwardNavigate(-1)}>Назад</a>
            <h1 className={m.productName}>{name}</h1>
            {children}
        </div>
    )
}