import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormButton } from "../Form/FormButton/FormButton";
import { FormInput } from "../Form/FormInput/FormInputs";
import { Forms } from "../Form/Forms";
import { Rating } from "../Rating/Rating";
import {  VAlIDATION } from "../Utils/Const"
import api from "../Utils/Api";


export const FormReview = ({title, productId, setProduct}) => {
    const {register, handleSubmit, formState:{errors}} = useForm({mode: "onBlur"});
    const [rating, setRating] = useState(1)
    const sendRewiev = (data) => {
        api.sendReview (productId, {...data, rating})
            .then (newReview => {
                setProduct && setProduct(newReview)
            })
    }

    const textRewiev = register('text', {
        required: 
            {value: true,
            message: VAlIDATION.requiredMess},
    })
    

    return (
        <Forms
            title={title}
            handeleFormSubmit={handleSubmit(sendRewiev)} >
            <Rating rating={rating} isEdite setRating={setRating}/>

            <FormInput
                {...textRewiev}
                type="textarea"
                id='text'
                placeholder='Ваш отзыв'
            />
            <div className="errorMess">
                {errors?.email && <p>{errors?.email?.message}</p>}
            </div>

            <FormButton color="yellow" type="submit">Отправить</FormButton>
            
        </Forms>
    )
}