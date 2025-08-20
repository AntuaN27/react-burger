import {Navigate, useLocation} from "react-router-dom";

export const ProtectedRouteElement = ({element, onlyUnAuth = false}) => {
    // Берём токены из локального хранилища, так как redux-хранилище живёт до перезагрузки страницы или перехода
    const accessToken = localStorage.getItem("accessToken") || "";
    const refreshToken = localStorage.getItem("refreshToken") || "";
    const location = useLocation();
    const isAuth = Boolean(accessToken && refreshToken);
    // Юзер авторизован, но заходит на страницы с авторизацией
    if (onlyUnAuth && isAuth) {
        return <Navigate to="/" replace/>;
    }
    // Юзер не авторизован, но переходит на защищённый маршрут
    if (!onlyUnAuth && !isAuth) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    return element;
};
