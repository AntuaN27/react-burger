import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {InputField} from "./common-page-elements";
import commonStyles from "./common-page-elements.module.css";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postRegister} from "../../services/reducers/auth/register";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const authTokens =  useSelector(store =>
        store.register.authTokens
    );

    const loginPage = () => {
        navigate("/login", { replace: true });
    };

    const register = () => {
        if (!name || !email || !password) {
            alert("Пожалуйста заполните все поля!");
            return;
        }
        const data = {
            email: email,
            password: password,
            name: name
        }
        dispatch(postRegister(data))
            .then(() => {
              navigate("/", { replace: true });
            })
    }

    // Сохранение токенов локальном хранилище после регистрации
    useEffect(() => {
        if (authTokens?.accessToken && authTokens?.refreshToken) {
            const accessToken = authTokens.accessToken.split("Bearer ")[1]
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", authTokens.refreshToken);
            navigate("/login", { replace: true })
        }
    }, [authTokens, navigate]);

    return (
        <div className={commonStyles.page}>
            <form
                className={commonStyles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className={commonStyles.title}>
                    Регистрация
                </div>
                <InputField
                    name={"name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={"Имя"}
                    autoComplete="name"
                />
                <InputField
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name={"email"}
                    isIcon={false}
                    placeholder={"E-mail"}
                    autoComplete="email"
                />
                <InputField
                    type={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name={"password"}
                    extraClass="mb-2"
                    placeholder={"Пароль"}
                    autoComplete="new-password"
                />
                <Button htmlType="button" type="primary" size="large" onClick={register}>
                  Зарегистрироваться
                </Button>
            </form>
            <div className={commonStyles.sub_information}>
                <div className={commonStyles.sub_info_block}>
                    Уже зарегистрированы?
                    <button className={commonStyles.sub_info_btn} onClick={loginPage}>
                        Войти
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;