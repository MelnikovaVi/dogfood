import m from "./Styles.module.css"
import classNames from "classnames"

export const FormButton = ({children, color, ...props}) => {
    return (
        <button {...props} className={classNames(m.btn, m[color])} >
            {children}
        </button>
    )
}