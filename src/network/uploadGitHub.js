import axios from 'axios';

// Função para codificar a imagem em Base64
const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
    });
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadImageToGitHub = async (file, questionYear, questionNumber, imageIndex) => {
    const fileExtension = file.name.split('.').pop();
    const base64Image = await getBase64(file);
    const path = `${questionYear}/images/img-${questionNumber}-${imageIndex}.${fileExtension}`

    const config = {
        headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
    };

    const data = {
        message: `Adicionando imagem ${path}`,
        content: base64Image,
    };

    try {
        const response = await axios.put(
            `https://api.github.com/repos/POSCOMPSimulator/questoes_poscomp/contents/${path}`,
            data,
            config
        );
        return response.data.content.download_url; // Retorna a URL da imagem
    } catch (error) {
        console.error('Erro ao enviar a imagem:', error);
        return null;
    }
};

export const uploadImageWithRetry = async (file, questionYear, questionNumber, imageIndex, attempts = 5) => {
    for (let i = 0; i < attempts; i++) {
        console.log(`Upload for ${file.name} - Attempt ${i + 1}`);
        let url = await uploadImageToGitHub(file, questionYear, questionNumber, imageIndex);
        if (url !== null) {
            return url;
        } else {
            await delay(10000);
        }
    }
    return null;
};