import { useState } from "react"
import { Forms } from "../Form/Forms";


export const FormModal = () => {
    const [modalType, setModalType] = useState('login')

    if (modalType === 'registration') {
        return <Forms
            title='Регистрация'
            input={{email:'Email', password:'Пароль'}}
            button={{submit: 'Зарегистрироваться', redirect: 'Войти'}}
            text='Регистрируясь на сайте, Вы соглашаетесть на пожизненную покупку деликатесов для собак на нашем сайте'
            formType='registration'
            changeType={setModalType}
            redirect={'login'}
        />
    }

    if (modalType === 'login') {
        return <Forms
            title='Вход'
            input={{email:'Email', password:'Пароль'}}
            button={{submit: 'Войти', redirect: 'Зарегистрироваться'}}
            text='Восстановление пароля'
            formType='login'
            changeType={setModalType}
            redirect={'registration'}
        />
    }

    if (modalType === 'recoveryPass') {
        return <Forms
            title='Восстановление пароля'
            input={{email:'Email'}}
            button={{submit: 'Отправить'}}
            textTop='Для получения пароля введите email, указанный на сайте'
            text='Срок действия ременного пароля 24 часа'
            formType='recoveryPass'
            changeType={setModalType}
        />
    }

    return <></>

}