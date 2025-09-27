import React, {useEffect} from 'react';
import {DndProvider} from 'react-dnd';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
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
import {useDispatch, useSelector} from "./services/hooks";
import {UNSET_MODAL_INGREDIENT} from "./services/constants/currentIngredient";
import Modal from "./components/modal/modal";
import IngredientDetails from "./components/modal/ingredient-details";
import {ProtectedRouteElement} from "./utils/protectedRouteElement";
import ProfileUserInfoPage from "./components/pages/profile/profile-user-info";
import OrdersPage from "./components/pages/profile/profile-orders";
import {getBurgerIngredients} from "./services/reducers/burgerIngredients";
import Feed from "./components/feed/feed";
import OrderPage from "./components/pages/order-page";
import {TIngredient} from "./services/types/data";
import OpenOrderDetails from "./components/modal/open-order-details";
import {findOrderById} from "./services/reducers/currentOrder";
import {
    SET_FEED_MODAL_ORDER,
    UNSET_FEED_MODAL_ORDER,
    SET_PROFILE_MODAL_ORDER,
    UNSET_PROFILE_MODAL_ORDER,
} from "./services/constants/currentOrder";

const App = () => {
    const dispatch = useDispatch();
    // Получение пути url
    const location = useLocation();
    const navigate = useNavigate();
    const locationPath = location.pathname;
    // Извлечение url
    const ingredientId = locationPath.split("/ingredients/")[1];
    const orderFeedId = locationPath.split("/feed/")[1];
    const orderProfileId = locationPath.split("/profile/orders/")[1];

    let background = location.state && location.state.background;
    // Получение всех ингредиентов
    const ingredients = useSelector(store =>
        store.burgerIngredients.ingredients
    );
    // Получение контента для модального окна
    const modalIngredient = ingredients.find((item: TIngredient) => item._id === ingredientId)
    const modalFeedOrder = useSelector(store =>
        store.currentOrder?.openOrderFeed
    )
    const modalProfileOrder = useSelector(store =>
        store.currentOrder?.openOrderProfile
    )

    useEffect(() => {
        if (orderFeedId && !modalFeedOrder) {
            dispatch(findOrderById(Number(orderFeedId), "feed")).then(res => {
                const order = res.orders[0];
                const modalIngredients = ingredients.filter((ingredient: TIngredient) =>
                    order.ingredients.includes(ingredient._id)
                );
                const orderTotalPrice = modalIngredients.reduce((total: number, ingredient: TIngredient) => {
                    if (ingredient.type === "bun") return total + ingredient.price * 2;
                    return total + ingredient.price;
                }, 0);

                dispatch({
                    type: SET_FEED_MODAL_ORDER,
                    payload: {
                        orderInfo: {
                            ...order,
                            orderIngredients: modalIngredients,
                            price: orderTotalPrice,
                        },
                    },
                });
            });
        } else if (orderProfileId && !modalProfileOrder) {
            dispatch(findOrderById(Number(orderProfileId), "profile")).then(res => {
                const order = res.orders[0];
                const modalIngredients = ingredients.filter((ingredient: TIngredient) =>
                    order.ingredients.includes(ingredient._id)
                );
                const orderTotalPrice = modalIngredients.reduce((total: number, ingredient: TIngredient) => {
                    if (ingredient.type === "bun") return total + ingredient.price * 2;
                    return total + ingredient.price;
                }, 0);

                dispatch({
                    type: SET_PROFILE_MODAL_ORDER,
                    payload: {
                        orderInfo: {
                            ...order,
                            orderIngredients: modalIngredients,
                            price: orderTotalPrice,
                        },
                    },
                });
            });
        }
    }, [orderFeedId, orderProfileId, modalFeedOrder, modalProfileOrder, ingredients, dispatch]);

    useEffect(() => {
        dispatch(getBurgerIngredients()); // Получение ингредиентов при открытии страницы
    }, [dispatch]);

    // Сбрасываем модальное окно при перезагрузке страницы
    useEffect(() => {
        const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
        if (nav?.type === "reload") {
            window.history.replaceState({}, "", location.pathname);
        }
    }, [location.pathname]);

    // Обработчики закрытия модальных окон
    const handleCloseIngredientModal = () => {
        dispatch({ type: UNSET_MODAL_INGREDIENT });
        navigate("/", { replace: true });
    };
    const handleCloseFeedOrderModal = () => {
        dispatch({ type: UNSET_FEED_MODAL_ORDER });
        navigate("/feed", { replace: true });
    };
    const handleCloseProfileOrderModal = () => {
        dispatch({ type: UNSET_PROFILE_MODAL_ORDER });
        navigate("/profile/orders", { replace: true });
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
                      <Route index element={<ProfileUserInfoPage />} />   {/* Дефолтная страница пользователя */}
                      <Route path="orders" element={<OrdersPage />} />
                    </Route>
                    <Route path={"/ingredients/:id"} element={<IngredientPage />} />
                    <Route path={"/feed"} element={<Feed />} />
                    {/* Страницы с заказом */}
                    <Route path={"/profile/orders/:id"} element={<ProtectedRouteElement element={<OrderPage />} />} />
                    <Route path={"/feed/:id"} element={<OrderPage />} />
                    <Route path={"*"} element={<NotFoundPage />} />
                </Routes>

                {/* Получение модального окна при перезагрузке страницы */}
                {background && (modalIngredient || modalFeedOrder || modalProfileOrder) && (
                    <Routes>
                        {background && modalIngredient && (
                            <Route
                                path="/ingredients/:id"
                                element={
                                    <Modal
                                        title={<p className="text text_type_main-large">Детали ингредиента</p>}
                                        onClose={handleCloseIngredientModal}
                                    >
                                        <IngredientDetails ingredient={modalIngredient} />
                                    </Modal>
                                }
                            />
                        )}
                        {background && modalFeedOrder && modalFeedOrder.orderIngredients?.length > 0 && (
                            <Route
                                path="/feed/:id"
                                element={
                                    <Modal
                                        title={<p className="text text_type_main-large">Детали заказа</p>}
                                        onClose={handleCloseFeedOrderModal}
                                    >
                                        <OpenOrderDetails event={"feed"} />
                                    </Modal>
                                }
                            />
                        )}
                        {background && modalProfileOrder && modalProfileOrder.orderIngredients?.length > 0 && (
                            <Route
                                path="/profile/orders/:id"
                                element={
                                    <Modal
                                        title={<p className="text text_type_main-large">Детали заказа</p>}
                                        onClose={handleCloseProfileOrderModal}
                                    >
                                        <OpenOrderDetails event={"profile"} />
                                    </Modal>
                                }
                            />
                        )}
                    </Routes>
                )}
            </main>
        </>
    )
}

export default React.memo(App);