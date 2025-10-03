import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {InputField} from "./common-page-elements";
import commonStyles from "./common-page-elements.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "../../services/hooks";
import {postLogin} from "../../services/reducers/auth/login";
import {IRegisterData} from "../../types";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { authTokens } = useSelector(store =>
        store.authTokens
    );
    const redirectPath = location.state?.from?.pathname || "/";

    const registerPage = () => {
        navigate("/register");
    };
    const forgotPasswordPage = () => {
        navigate("/forgot-password");
    };

    const login = () => {
        if (!email || !password) {
            alert("Пожалуйста заполните все поля!");
            return;
        }
        const data: IRegisterData = {
            email: email,
            password: password
        };
        dispatch(postLogin(data));
    }

    // Сохранение токенов локальном хранилище после авторизации
    useEffect(() => {
        if (authTokens?.accessToken && authTokens?.refreshToken) {
            localStorage.setItem("accessToken", authTokens.accessToken);
            localStorage.setItem("refreshToken", authTokens.refreshToken);
            // После успешной авторизации попадаем в главное меню или куда хотел перейти юзер
            navigate(redirectPath, { replace: true });
        }
    }, [authTokens, navigate, redirectPath]);

    return (
        <div className={commonStyles.page}>
            <form
                className={commonStyles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    login();
                }}
            >
                <div className={commonStyles.title}>
                    Вход
                </div>
                <InputField
                    data-test="login-email"
                    type={"email"}
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    name={"email"}
                    isIcon={false}
                    placeholder={"E-mail"}
                    autoComplete="username"
                />
                <InputField
                    data-test={"login-password"}
                    type={"password"}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    name={"password"}
                    extraClass="mb-2"
                    placeholder={"Пароль"}
                    autoComplete="current-password"
                />
                <Button
                    data-test="login-submit"
                    htmlType="submit"
                    type="primary"
                    size="large"
                >
                  Войти
                </Button>
            </form>
            <div className={commonStyles.sub_information}>
                <div className={commonStyles.sub_info_block}>
                    Вы — новый пользователь?
                    <button className={commonStyles.sub_info_btn} onClick={registerPage}>
                        Зарегистрироваться
                    </button>
                </div>
                <div className={commonStyles.sub_info_block}>
                    Забыли пароль ?
                    <button className={commonStyles.sub_info_btn} onClick={forgotPasswordPage}>
                        Восстановить пароль
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;