import { useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";
import { FormButton } from "../Form/FormButton/FormButton";
import { FormInput } from "../Form/FormInput/FormInputs";
import { Forms } from "../Form/Forms";
import { EMAIL_REG_EX, VAlIDATION } from "../Utils/Const"


export const RecoveryPass = () => {
    const {register, handleSubmit, formState:{errors}} = useForm({mode: "onBlur"});
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
    
    return (
        <Forms
            title='Восстановление пароля'
            handeleFormSubmit={handleSubmit(sendRegistrApi)}
        >
            <p className="text">Для получения пароля введите email, указанный при регистрации</p>
            
            <FormInput
                {...emailRegister}
                type="text"
                placeholder="Введите Email" 
                id='email'
            />

            <div className="errorMess">
                {errors?.email && <p>{errors?.email?.message}</p>}
            </div>

            <p className="text">Срок действия временного пароля 24 часа</p>
            <FormButton color="yellow" type="submit">Отправить</FormButton>
        </Forms>
    )
}