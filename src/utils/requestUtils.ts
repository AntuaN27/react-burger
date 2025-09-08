import {apiUrl} from './variables';
import {postRefreshToken} from "../services/reducers/auth/refreshToken";
import {UNSET_AUTH_TOKENS} from "../services/actions/auth/tokens";
import {IError} from "../types";

const checkResponse = async <T=any>(res: Response): Promise<T> => {
    const data = await res.json();
    if (res.ok) {
        return data;
    }
    return Promise.reject({
        status_code: res.status,
        message: data?.message || `Ошибка ${res.status}`
    });
};

const checkSuccess = async <T=any>(res: T & { success?: boolean }): Promise<T> => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`В ответе отсутствует success: ${res}`)
}

// Псевдоним запроса
type TRequest = <T>(endpoint: string, options?: RequestInit) => Promise<T>

// Простой request
export const request: TRequest = (endpoint, options) => {
    return fetch(`${apiUrl}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}

// Сложный request с поддержкой токенов
// @ts-ignore "sprint5"
export const createRequest = (dispatch) => {
    return async (endpoint: string, options: RequestInit = {}) => {
        try {
            const res = await fetch(`${apiUrl}${endpoint}`, options);
            return await checkResponse(res).then(checkSuccess);
        } catch (error: unknown) {
            const e = error as IError;
            if (e.status_code === 403 &&
                (e.message === "jwt expired" || e.message === "jwt malformed")
            ) {
                try {
                    // Обновляем токен
                    await dispatch(postRefreshToken({token: localStorage.getItem("refreshToken")}));
                    // Повторяем запрос с новым accessToken
                    const retryOptions = {
                        ...options,
                        headers: {
                            ...options.headers,
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    };
                    const retryRes = await fetch(`${apiUrl}${endpoint}`, retryOptions);
                    return await checkResponse(retryRes).then(checkSuccess);
                } catch (refreshError) {
                    // Кейс когда истёк refreshToken
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch({
                        type: UNSET_AUTH_TOKENS
                    })
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject({
                message: e.message || 'Request failed',
                status_code: e.status_code || null
            });
        }
    };
};