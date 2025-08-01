import { apiUrl } from './variables';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`В ответе отсутствует success: ${res}`)
}

export const request = (endpoint, options) => {
    return fetch(`${apiUrl}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}