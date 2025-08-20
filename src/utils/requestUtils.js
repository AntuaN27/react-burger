import {apiUrl} from './variables';
import {postRefreshToken} from "../services/reducers/auth/refreshToken";
import {LOGOUT} from "../services/actions/auth/logout";

const checkResponse = async (res) => {
    const data = await res.json();
    if (res.ok) {
        return data;
    }
    return Promise.reject({
        status_code: res.status,
        message: data?.message || `Ошибка ${res.status}`
    });
};

const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`В ответе отсутствует success: ${res}`)
}

// Простой request
export const request = (endpoint, options) => {
    return fetch(`${apiUrl}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}

// Сложный request с поддержкой токенов
export const createRequest = (dispatch) => {
    return async (endpoint, options = {}) => {
        try {
            const res = await fetch(`${apiUrl}${endpoint}`, options);
            return await checkResponse(res).then(checkSuccess);
        } catch (error) {
            if (error.status_code === 403 &&
                (error.message === "jwt expired" || error.message === "jwt malformed")
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
                    localStorage.clear();
                    dispatch({
                        type: LOGOUT
                    })
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject({
                message: error.message || 'Request failed',
                status_code: error.status_code || null
            });
        }
    };
};