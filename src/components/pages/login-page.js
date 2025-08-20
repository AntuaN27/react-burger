import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {InputField} from "./common-page-elements";
import commonStyles from "./common-page-elements.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postLogin} from "../../services/reducers/auth/login";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authTokens = useSelector(store =>
        store.authTokens.authTokens
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
        const data = {
            email: email,
            password: password
        };
        dispatch(postLogin(data));
    }

    // Сохранение токенов локальном хранилище после авторизации
    useEffect(() => {
        if (authTokens?.accessToken && authTokens?.refreshToken) {
            const accessToken = authTokens.accessToken.split("Bearer ")[1]
            localStorage.setItem("accessToken", accessToken);
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
                }}
            >
                <div className={commonStyles.title}>
                    Вход
                </div>
                <InputField
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name={"email"}
                    isIcon={false}
                    placeholder={"E-mail"}
                    autoComplete="username"
                />
                <InputField
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name={"password"}
                    extraClass="mb-2"
                    placeholder={"Пароль"}
                    autoComplete="current-password"
                />
                <Button htmlType="button" type="primary" size="large" onClick={login}>
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