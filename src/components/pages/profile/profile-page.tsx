import styles from "./profile-page.module.css";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "../../../services/hooks";
import {postLogout} from "../../../services/reducers/auth/logout";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Обработчик выхода
    const handleLogout = () => {
        Promise.resolve(dispatch(postLogout({ token: localStorage.getItem("refreshToken") })))
            .then(() => {
              navigate("/login", { replace: true });
            })
            .catch(() => {
              navigate("/login", { replace: true });
            });
    };

    return (
        <div className={styles.profile}>
            <div className={styles.left_column}>
                <div className={styles.profile_sidebar}>
                    <ul className={styles.sidebar_list}>
                        <li className={styles.sidebar_element}>
                            <NavLink
                                to={"/profile"}
                                end
                                className={({ isActive }) =>
                                    isActive ? styles.active_link : ""
                                }
                            >
                                Профиль
                            </NavLink>
                        </li>
                        <li className={styles.sidebar_element}>
                            <NavLink
                                to={"/profile/orders"}
                                className={({ isActive }) =>
                                    isActive ? styles.active_link : ""
                                }
                            >
                                История заказов
                            </NavLink>
                        </li>
                        <li className={styles.sidebar_element}>
                            <button
                                onClick={handleLogout}
                                className={styles.sidebar_button}
                            >
                                Выход
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={styles.info_block}>
                    В этом разделе вы можете <br />
                    изменить свои персональные данные
                </div>
            </div>
            <div className={styles.right_column}>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfilePage;