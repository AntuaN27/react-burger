import {ThunkAction, ThunkDispatch} from "redux-thunk";
import { store } from '../store';
import {TCurrentOrderActions} from "../actions/currentOrder";
import {TCurrentIngredientActions} from "../actions/currentIngredient";
import {TBurgerConstructorActions} from "../actions/burgerСonstructor";
import {TBurgerIngredientsActions} from "../actions/burgerIngredients";
import {TPatchUserActions} from "../actions/profile/patchUser";
import {TGetUserActions} from "../actions/profile/getUser";
import {TTokensActions} from "../actions/auth/tokens";
import {TResetPasswordActions} from "../actions/auth/resetPassword";
import {TRegisterActions} from "../actions/auth/register";
import {TRefreshTokenActions} from "../actions/auth/refreshToken";
import {TLogoutActions} from "../actions/auth/logout";
import {TLoginActions} from "../actions/auth/login";
import {TForgotPasswordActions} from "../actions/auth/forgotPassword";
 
export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TCurrentOrderActions
    | TCurrentIngredientActions
    | TBurgerConstructorActions
    | TBurgerIngredientsActions
    | TPatchUserActions
    | TGetUserActions
    | TTokensActions
    | TResetPasswordActions
    | TRegisterActions
    | TRefreshTokenActions
    | TLogoutActions
    | TLoginActions
    | TForgotPasswordActions;

// Типизация thunk'ов
export type AppThunk<TReturn = void> = ThunkAction<
  TReturn,
  RootState,
  unknown,
  TApplicationActions
>;

// Типизация метода dispatch
export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;