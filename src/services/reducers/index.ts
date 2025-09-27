import { combineReducers } from "redux";
import { burgerConstructor } from "./burgerConstructor";
import { burgerIngredients } from "./burgerIngredients";
import { currentIngredient } from "./currentIngredient";
import { currentOrder } from "./currentOrder";
import {forgotPassword} from "./auth/forgotPassword";
import {resetPassword} from "./auth/resetPassword";
import {register} from "./auth/register";
import {login} from "./auth/login";
import {logout} from "./auth/logout";
import {refreshToken} from "./auth/refreshToken";
import {getUser} from "./profile/getUser";
import {patchUser} from "./profile/patchUser";
import {authTokens} from "./auth/tokens";
import {websocketFeedReducer} from "../websocket/websocket-feed/slice";
import {websocketProfileReducer} from "../websocket/websocket-profile/slice";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredients,
    burgerConstructor: burgerConstructor,
    currentIngredient: currentIngredient,
    currentOrder: currentOrder,
    // Блок авторизации
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    register: register,
    login: login,
    logout: logout,
    refreshToken: refreshToken,
    authTokens: authTokens,
    // Блок профиля
    getUser: getUser,
    patchUser: patchUser,
    websocketFeed: websocketFeedReducer,
    websocketProfile: websocketProfileReducer,
});