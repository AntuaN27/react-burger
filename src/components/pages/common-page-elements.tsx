import React from "react";
import {
    EmailInput as UIEmailInput,
    PasswordInput as UIPasswordInput,
    Input as UIInput,
}
    from "@ya.praktikum/react-developer-burger-ui-components";
import {TEmailInput, TPasswordInput, TTextInput} from "../../types";

type InputFieldProps = TPasswordInput | TEmailInput | TTextInput;

export const InputField: React.FC<InputFieldProps> = (props) => {
    // Кейс для password
    if (props.type === "password") {
        return (
            <UIPasswordInput {...props} />
        )
    }
    // Кейс для email
    if (props.type === "email") {
        return (
            <UIEmailInput {...props} />
        )
    }
    // Кейс для всего остального имя, фио и т.д.
    return <UIInput {...(props as any)} />; // Непростой кейс без any проблемы возникали
}