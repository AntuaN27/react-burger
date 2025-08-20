import {
    EmailInput as UIEmailInput,
    PasswordInput as UIPasswordInput,
    Input as UIInput
}
    from "@ya.praktikum/react-developer-burger-ui-components";

export const InputField = ({type = "text", ...props}) => {
    // Кейс для password
    if (type === "password") {
        return (
            <UIPasswordInput
                {...props}
            />
        )
    }
    // Кейс для email
    if (type === "email") {
        return (
            <UIEmailInput
                {...props}
            />
        )
    }
    // Кейс для всего остального имя, фио и т.д.
    return (
        <UIInput
            {...props}
        />
    )
}