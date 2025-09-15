import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {InputField} from "./common-page-elements";
import commonStyles from "./common-page-elements.module.css";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "../../services/hooks";
import {postResetPassword} from "../../services/reducers/auth/resetPassword";
import {RESET_RESET_PASSWORD} from "../../services/constants/auth/resetPassword";
import {IAuthData} from "../../types";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const { resetPasswordSuccess } = useSelector(store =>
        store.reset_password
    );
    const { forgotPasswordSuccess } = useSelector(store =>
        store.forgot_password
    )

    // Редирект пользователя если он не прошёл forgot-password
    useEffect(() => {
        if (!forgotPasswordSuccess) {
            navigate("/forgot-password", { replace: true });
        }
    }, [forgotPasswordSuccess, navigate]);

    // Редирект после успешного сброса пароля
    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch({
                type: RESET_RESET_PASSWORD
            })
            navigate("/login", { replace: true })
        }
    }, [resetPasswordSuccess, dispatch, navigate]);

    const loginPage = () => {
        navigate("/login");
    };

    const saveData = () => {
        if (!password || !code) {
            alert("Пожалуйста, заполните все данные")
            return;
        }
        const data: IAuthData = {
            password: password,
            token: code
        };
        Promise.resolve(dispatch(postResetPassword(data)))
            .then(() => {
              navigate("/login", { replace: true });
            })
    }

    return (
        <div className={commonStyles.page}>
            <form
                className={commonStyles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    saveData();
                }}
            >
                <div className={commonStyles.title}>
                    Восстановление пароля
                </div>
                <InputField
                    type={"password"}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    name={"password"}
                    extraClass="mb-2"
                    placeholder={"Введите новый пароль"}
                    autoComplete="new-password"
                />
                <InputField
                    value={code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                    name={"email_code"}
                    placeholder={"Введите код из письма"}
                    autoComplete="one-time-code"
                />
                <Button htmlType="submit" type="primary" size="large">
                  Сохранить
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

export default ResetPasswordPage;