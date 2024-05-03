import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const questaoAPI = {
    get: (params) => { return axiosClient.get('/questao', { params }) },
    sumario: () => { return axiosClient.get('/questao/sumario') },
}

export const simuladoAPI = {
    criar: (data) => { return axiosClient.post('/simulado', JSON.stringify(data)) },
    get: (id) => { return axiosClient.get(`/simulado/${id}`) },
    consultar: (id) => { return axiosClient.get(`/simulado/${id}/state`)},
    atualizaEstado: (id, state, data) => { return axiosClient.put(`/simulado/${id}/${state}`, JSON.stringify(data)) },
    atualizaRespostas: (id, data) => { return axiosClient.patch(`/simulado/${id}`, JSON.stringify(data)) },
}