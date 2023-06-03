import axiosClient from "../apiClient";

export function registra(data) {
    return axiosClient.post('/usuario', JSON.stringify(data))
}

export function login(data) {
    return axiosClient.post('/usuario/login', JSON.stringify(data))
}