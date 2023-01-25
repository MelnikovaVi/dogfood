export const PASSWORD_REG_EX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/
export const EMAIL_REG_EX = /^[_a-z0-9-\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i
export const VAlIDATION = {
    requiredMess: "Обязательно для заполнения!",
    emailMess: "Email не соответствует формату электронной почты",
    passwordMess: "Пароль должен содержать минимум 4 символа, с использованием букв латинского алфавита и цифр",
}
