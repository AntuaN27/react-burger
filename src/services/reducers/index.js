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

export const rootReducer = combineReducers({
    burger_ingredients: burgerIngredients,
    burger_constructor: burgerConstructor,
    current_ingredient: currentIngredient,
    current_order: currentOrder,
    // Блок авторизации
    forgot_password: forgotPassword,
    reset_password: resetPassword,
    register: register,
    login: login,
    logout: logout,
    refreshToken: refreshToken,
    authTokens: authTokens,
    // Блок профиля
    getUser: getUser,
    patchUser: patchUser,
});