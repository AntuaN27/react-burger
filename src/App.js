import React, {useEffect} from 'react';
import {DndProvider} from 'react-dnd';
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import {HTML5Backend} from "react-dnd-html5-backend";
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import appStyles from './App.module.css'
import LoginPage from "./components/pages/login-page";
import RegisterPage from "./components/pages/register-page";
import ForgotPasswordPage from "./components/pages/forgot-password-page";
import ResetPasswordPage from "./components/pages/reset-password-page";
import ProfilePage from "./components/pages/profile/profile-page";
import NotFoundPage from "./components/pages/not-found-page";
import IngredientPage from "./components/pages/ingredient-page";
import {useDispatch, useSelector} from "react-redux";
import {UNSET_MODAL_INGREDIENT} from "./services/actions/currentIngredient";
import Modal from "./components/modal/modal";
import IngredientDetails from "./components/modal/ingredient-details";
import {ProtectedRouteElement} from "./utils/protectedRouteElement";
import ProfileUserInfoPage from "./components/pages/profile/profile-user-info";
import OrdersPage from "./components/pages/profile/profile-orders";

const App = () => {
    const dispatch = useDispatch();
    // Получение id ингредиента
    const location = useLocation();
    const navigate = useNavigate();
    const locationPath = location.pathname;
    const ingredientId = locationPath.split("/ingredients/")[1];
    const background = location.state && location.state.background;
    // Получение всех ингредиентов
    const ingredients = useSelector(store =>
        store.burger_ingredients.ingredients
    );
    // Получение выбранного ингредиента
    const modalIngredient = ingredients.find(item => item._id === ingredientId)
    // Флаг перехода на страницу авторизации
    const { logout } = useSelector(store =>
        store.logout
    )

    // useEffect(() => {
    //     if (logout) {
    //         navigate("/login", {replace:true})
    //     }
    // }, [logout, navigate]);

    useEffect(() => {
      if (logout && location.pathname !== "/login") {
        navigate("/login", { replace: true });
      }
    }, [logout, location.pathname, navigate]);

    // Обработчик закрытия модального окна
    const handleCloseModal = () => {
        dispatch({ type: UNSET_MODAL_INGREDIENT });
        navigate("/", { replace: true });
    };
    return (
        <>
            <AppHeader />
            <main className={appStyles.main}>
                <Routes location={background || location}>
                    <Route path={"/"} element={
                        <div className={appStyles.home_page}>
                            <DndProvider backend={HTML5Backend} >
                                <BurgerIngredients />
                                <BurgerConstructor />
                            </DndProvider>
                        </div>
                    } />
                    <Route path={"/login"} element={
                        <ProtectedRouteElement element={<LoginPage />} onlyUnAuth={true} />
                    } />
                    <Route path={"/register"} element={
                        <ProtectedRouteElement element={<RegisterPage />} onlyUnAuth={true} />
                    } />
                    <Route path={"/forgot-password"} element={
                        <ProtectedRouteElement element={<ForgotPasswordPage />} onlyUnAuth={true} />
                    } />
                    <Route path={"/reset-password"} element={
                        <ProtectedRouteElement element={<ResetPasswordPage />} onlyUnAuth={true} />
                    } />
                    <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
                      <Route index element={<ProfileUserInfoPage />} />   {/* /profile */}
                      <Route path="orders" element={<OrdersPage />} /> {/* /profile/orders */}
                    </Route>
                    <Route path={"/ingredients/:id"} element={<IngredientPage />} />
                    <Route path={"*"} element={<NotFoundPage />} />
                </Routes>

                {/* Получение модального окна при перезагрузке страницы */}
                {background && modalIngredient && (
                    <Routes>
                        <Route
                            path="/ingredients/:id"
                            element={
                                <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                                    <IngredientDetails ingredient={modalIngredient} />
                                </Modal>
                            }
                        />
                    </Routes>
                )}
            </main>
        </>
    )
}

export default App;