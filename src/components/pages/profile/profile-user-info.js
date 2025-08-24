import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserRequest} from "../../../services/reducers/profile/getUser";
import {patchUserRequest} from "../../../services/reducers/profile/patchUser";
import {InputField} from "../common-page-elements";
import styles from "./profile-page.module.css";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

const ProfileUserInfoPage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(store => store.getUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialUserInfo, setInitialUserInfo] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Данные с сервера при переходе на страницу
  useEffect(() => {
      dispatch(getUserRequest());
  }, [dispatch]);

  // Обновляем данные при изменении исходных данных
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setEmail(userInfo.email || "");
      setPassword("");
      setInitialUserInfo({ name: userInfo.name || "", email: userInfo.email || "" });
      setHasChanges(false);
    }
  }, [userInfo]);

  // Отслеживаем изменения в полях, чтобы показать кнопки
  useEffect(() => {
    if (!initialUserInfo) return;
    const changed =
      name !== initialUserInfo.name ||
      email !== initialUserInfo.email ||
      (password && password.length > 0);
    setHasChanges(!!changed);
  }, [name, email, password, initialUserInfo]);

  // Отмена изменений
  const handleCancel = () => {
    if (initialUserInfo) {
      setName(initialUserInfo.name);
      setEmail(initialUserInfo.email);
      setPassword("");
      setHasChanges(false);
    }
  };

  // Сохранение изменений
  const handleSave = () => {
    const data = { name, email };
    if (password) data.password = password;
    dispatch(patchUserRequest(data));
    // После успешного патча обновляем локальные значения
    dispatch(getUserRequest());
    setPassword("");
    setHasChanges(false);
  };

  return (
    <>
        <InputField
            name={"name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Имя"}
            icon={"EditIcon"}
        />
        <InputField
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            isIcon={true}
            placeholder={"E-mail"}
        />
        <InputField
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name={"password"}
            extraClass="mb-2"
            placeholder={"Пароль"}
            icon={"EditIcon"}
        />

        {hasChanges && (
        <div className={styles.action_buttons}>
            <Button htmlType="button" type="primary" size="medium" onClick={handleCancel}>
                Отмена
            </Button>
            <Button htmlType="button" type="primary" size="medium" onClick={handleSave}>
                Сохранить
            </Button>
            </div>
        )}
    </>
  )
}

export default ProfileUserInfoPage;