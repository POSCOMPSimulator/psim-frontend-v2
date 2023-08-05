import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosClient.interceptors.request.use(
    function (config) {
        // Get the access token from localStorage
        const accessToken = localStorage.getItem('psim_access_token');

        // If the access token exists, add it to the Authorization header
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        let res = error.response;
        const access_token = localStorage.getItem("psim_access_token");
        const originalRequest = error.config;
        if (res.status === 401 && access_token) {
            originalRequest._retry = true;

            // Refresh the access token
            await refreshToken(); // Function to refresh the access token

            // Update the access token in the original request header
            originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem("psim_access_token")}`;

            // Retry the original request with the new access token
            return axiosClient(originalRequest);
        }
        console.error("Looks like there was a problem. Status Code: " + res.status);
        return Promise.reject(error);
    }
);

async function refreshToken() {
    return new Promise((resolve, reject) => {
        try {

            axiosClient.post('/usuario/refresh/', {
                "refresh_token": localStorage.getItem("psim_refresh_token")
            })
                .then(
                    async (res) => {
                        localStorage.setItem("psim_access_token", res.data.access_token);
                        return resolve(res);
                    }
                )
                .catch((err) => {
                    return reject(err);
                })
        } catch (err) {
            return reject(err);
        }
    });
};

export const usuarioAPI = {
    get: () => { return axiosClient.get('/usuario') },
    registrar: (data) => { return axiosClient.post('/usuario', JSON.stringify(data)) },
    promover: (data) => { return axiosClient.put('/usuario', JSON.stringify(data)) },
    remover: (email) => { return axiosClient.delete(`/usuario/${email}`) },
    login: (data) => { return axiosClient.post('/usuario/login', JSON.stringify(data)) },
    verificar: (data) => { return axiosClient.post('/usuario/verifica', JSON.stringify(data)) },
}

export const questaoAPI = {
    get: (params) => { return axiosClient.get('/questao', { params }) },
    criar: (data) => { return axiosClient.post('/questao', JSON.stringify(data)) },
    atualiza: (data) => { return axiosClient.patch('/questao', JSON.stringify(data)) },
    sinalizarErro: (data) => { return axiosClient.put('/questao', JSON.stringify(data)) },
    sumario: () => { return axiosClient.get('/questao/sumario') },
    remover: (id) => { return axiosClient.delete(`/questao/${id}`) },
    listarErros: (id) => () => { return axiosClient.get(`/questao/${id}/erros`) },
    removerErros: (id, data) => () => { return axiosClient.delete(`/questao/${id}/erros`, JSON.stringify(data)) },
}

export const simuladoAPI = {
    listar: () => { return axiosClient.get('/simulado') },
    criar: (data) => { return axiosClient.post('/simulado', JSON.stringify(data)) },
    get: (id) => { return axiosClient.get(`/simulado/${id}`) },
    atualizaEstado: (id, state, data) => { return axiosClient.put(`/simulado/${id}/${state}`, JSON.stringify(data)) },
    atualizaRespostas: (id, data) => { return axiosClient.patch(`/simulado/${id}`, JSON.stringify(data)) },
    remover: (id) => { return axiosClient.delete(`/simulado/${id}`) },
}

export const comentarioAPI = {
    listarSinalizados: () => { return axiosClient.get('/comentario') },
    listarComentariosQuestao: (id) => { return axiosClient.get(`/comentario/questao/${id}`) },
    publicar: (id, data) => { return axiosClient.post(`/comentario/questao/${id}`, JSON.stringify(data)) },
    sinalizar: (id, data) => { return axiosClient.put(`/comentario/${id}`, JSON.stringify(data)) },
    remover: (id) => { return axiosClient.delete(`/comentario/${id}`) },
    removerSinalizacao: (id) => { return axiosClient.delete(`/comentario/${id}/reports`) },
}