import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FormInput } from "../Form/FormInput/FormInputs"
import { FormButton } from '../Form/FormButton/FormButton';
import { Forms } from "../Form/Forms"
import { EMAIL_REG_EX, PASSWORD_REG_EX, VAlIDATION } from "../Utils/Const"
import './Styles.css'

export const Registr = () => {
    const {register, handleSubmit, formState:{errors}} = useForm({mode: "onBlur"});
    const navigate = useNavigate()
    const locate = useLocation()
    const firstPath = locate.state?.firstPath

    const clickLoginButton = (e) => {
        e.preventDefault()
        navigate('/login', { replace: true, state: {background:locate, firstPath}})

       

    }
    const sendRegistrApi = (data) => {
        console.log(data);
    }
    const callbackSubmit = () => {
        handleSubmit(sendRegistrApi)
    }

    const emailRegister = register('email', {
        required: 
            {value: true,
            message: VAlIDATION.requiredMess},
        pattern: {
            value:EMAIL_REG_EX,
            message: VAlIDATION.emailMess
        }
    })

    const passwordRegister = register('password', {
        required: 
            {value: true,
            message: VAlIDATION.requiredMess},
        pattern: {
            value:PASSWORD_REG_EX,
            message: VAlIDATION.passwordMess
        }
    })
    
    return (
        <Forms
            title='Регистрация'
            handeleFormSubmit={handleSubmit(sendRegistrApi)} >
            <FormInput
                {...emailRegister}
                type="text"
                placeholder="Введите Email" 
                id='email'
            />
            <div className="errorMess">
                {errors?.email && <p>{errors?.email?.message}</p>}
            </div>

            <FormInput
                {...passwordRegister}
                type="password"
                placeholder='Введите пароль'
                id='password'/>
            <div className="errorMess">
                {errors?.password && <p>{errors?.password?.message}</p>}
            </div>

            <p className="text">Регистрируясь на сайте, Вы соглашаетесть на пожизненную покупку деликатесов для собак на нашем сайте</p>

            <FormButton color="yellow" type="submit">Зарегистрироваться</FormButton>
            <FormButton color="white" type="button" onClick={clickLoginButton}>Войти</FormButton>
        </Forms>
    )
}