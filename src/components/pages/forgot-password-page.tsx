import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {InputField} from "./common-page-elements";
import commonStyles from "./common-page-elements.module.css";
import {useNavigate} from "react-router-dom";
import {postForgotPassword} from "../../services/reducers/auth/forgotPassword";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {emailRegex} from "../../utils/variables";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const { forgotPasswordSuccess } = useSelector(
        // @ts-ignore "sprint5"
        state => state.forgot_password
    );

    const loginPage = () => {
        navigate("/login");
    };

    const recoverPasswordPage = () => {
        if (!emailRegex.test(email)) {
            alert("Введите корректный e-mail!");
            return;
        }
        // @ts-ignore "sprint5"
        dispatch(postForgotPassword(email))
    }

    useEffect(() => {
        if (forgotPasswordSuccess && email) {
            // Переход на страницу восстановления
            navigate("/reset-password", { replace: true });
        }
    }, [forgotPasswordSuccess, email, navigate, dispatch]);

    return (
        <div className={commonStyles.page}>
            <form
                className={commonStyles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    recoverPasswordPage();
                }}
            >
                <div className={commonStyles.title}>
                    Восстановление пароля
                </div>
                <InputField
                    type={"email"}
                    name={"email"}
                    isIcon={false}
                    placeholder={"Укажите e-mail"}
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <Button htmlType="submit" type="primary" size="large">
                  Восстановить
                </Button>
            </form>
            <div className={commonStyles.sub_information}>
                <div className={commonStyles.sub_info_block}>
                    Вспомнили пароль?
                    <button className={commonStyles.sub_info_btn} onClick={loginPage}>
                        Войти
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;