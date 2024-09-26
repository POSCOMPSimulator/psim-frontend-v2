import React, { useState, useEffect } from 'react';
import { Form, Button, TextArea, Input, Modal, Dropdown, Divider, Label, Header } from 'semantic-ui-react';
import { InlineTex } from 'react-tex';
import styled from 'styled-components';
import { questaoAPI } from '../../network/apiClient';
import { uploadImageWithRetry } from '../../network/uploadGitHub';

const FormContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
`;

const BMLabel = styled(Label)`
    margin-bottom: 10px !important;
`;

const respostas = [
    { key: 'a', text: 'A', value: 0 },
    { key: 'b', text: 'B', value: 1 },
    { key: 'c', text: 'C', value: 2 },
    { key: 'd', text: 'D', value: 3 },
    { key: 'e', text: 'E', value: 4 }
]

const blankFormData = {
    ano: '',
    numero: '',
    enunciado: [''],
    alternativas: ['', '', '', '', ''],
    imagens: {'enunciado': [], 'alternativa_a': [], 'alternativa_b': [],
        'alternativa_c': [], 'alternativa_d': [], 'alternativa_e': []},
    resposta: '',
    area: '',
    subarea: '',
    explicacao: {'String': '', 'Valid': true}
}

const SubmitQuestionForm = () => {

    const [areas, setAreas] = useState([])
    const [subareas, setSubareas] = useState([])
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [formData, setFormData] = useState(blankFormData);
    const [adminCode, setAdminCode] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [jsonModalOpen, setJsonModalOpen] = useState(false);
    const [jsonInput, setJsonInput] = useState('');

    const handleJsonSubmit = () => {
        try {
            const jsonData = JSON.parse(jsonInput);
            setFormData(jsonData);
            setJsonModalOpen(false);
        } catch (error) {
            console.log(error)
            alert('JSON inválido');
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles((prevFiles) => [...prevFiles, ...files]);

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setImageFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {

        questaoAPI.sumario()
            .then((res) => {

                setAreas(res.data.areas.map(v => {
                    return {
                        key: v.substring(0, 3).toLowerCase(),
                        text: v + ' (' + v.substring(0, 3) + ')',
                        value: v
                    }
                }))

                setSubareas(res.data.subareas.toSorted((a,b) => a.localeCompare(b)).map(v => {
                    return {
                        key: v,
                        text: v,
                        value: v
                    }
                }))
            })
            .catch((error) => {
                console.log(error)
                setAreas([])
                setSubareas([])
            })

    }, [])

    const handleChangeNum = (e, { name, value }) => {
        setFormData({ ...formData, [name]: parseInt(value) });
    };

    const handleArrayChange = (e, name, index) => {
        const newArr = [...formData[name]];
        newArr[index] = e.target.value;
        setFormData({ ...formData, [name]: newArr });
    };

    const handleSubmit = () => {
        setModalOpen(true);
    };

    const submitWithAdminCode = async () => {

        setLoading(true);

        const questionNumber = formData.numero;
        const questionYear = formData.ano;
        const uploadedImageUrls = await Promise.all(
            imageFiles.map((file, index) => uploadImageWithRetry(file, questionYear, questionNumber, (index + 1).toString().padStart(2, '0')))
        );

        formData.imagens.enunciado = uploadedImageUrls.map((url, index) => {
            return url.replace("https://raw.githubusercontent.com/POSCOMPSimulator/questoes_poscomp/main/", "");
        });

        questaoAPI.create(formData, adminCode)
            .then((_) => {
                setFormData(blankFormData)
            })
            .catch((error) => {
                console.log(error)
                alert('Erro ao enviar a questão.');
            })
        setLoading(false);
        setModalOpen(false);
    };

    return (
        <>
            <Header as='h2' textAlign='center'>Submissão de Questão</Header>
            <FormContainer>
                <Form>
                    <BMLabel size='large'><b>Informações Gerais</b></BMLabel>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            label='Ano'
                            name='ano'
                            value={isNaN(formData.ano) ? '' : formData.ano}
                            onChange={handleChangeNum}
                        />
                        <Form.Field
                            control={Input}
                            label='Número'
                            name='numero'
                            value={isNaN(formData.numero) ? '' : formData.numero}
                            onChange={handleChangeNum}
                        />
                        <Form.Field
                            control={Dropdown}
                            label='Componente'
                            name='componente'
                            options={areas}
                            selection
                            closeOnChange
                            clearable
                            value={formData.area}
                            onChange={(e, { value }) => (setFormData({ ...formData, area: value }))}
                        />
                        <Form.Field
                            control={Dropdown}
                            label='Subárea'
                            name='subarea'
                            options={subareas}
                            selection
                            closeOnChange
                            clearable
                            value={formData.subarea}
                            onChange={(e, { value }) => setFormData({ ...formData, subarea: value })}
                        />
                        <Form.Field
                            control={Dropdown}
                            label='Resposta'
                            name='resposta'
                            value={formData.resposta}
                            options={respostas}
                            selection
                            closeOnChange
                            clearable
                            onChange={(e, { value }) => (setFormData({ ...formData, resposta: value }))}
                        />
                    </Form.Group>
                    <Divider />
                    <BMLabel size='large'><b>Enunciado</b></BMLabel>
                    <Form.Field
                        control={TextArea}
                        name='enunciado'
                        value={formData.enunciado[0]}
                        onChange={(e) => handleArrayChange(e, 'enunciado', 0)}
                    />
                    <div>
                        <InlineTex texContent={formData.enunciado[0]}/>
                    </div>
                    <Form.Field
                        label='Imagens'
                        control={Input}
                        type='file'
                        multiple
                        onChange={handleImageChange}
                    />
                    <ul>
                    {imagePreviews.map((preview, index) => (
                        <div key={index} style={{ display: 'inline-block', position: 'relative', margin: '10px' }}>
                            <img src={preview} alt={`preview-${index}`} style={{ width: '100px' }} />
                            <Button 
                                icon="trash" 
                                onClick={() => handleRemoveImage(index)} 
                                style={{ position: 'absolute', top: 0, right: 0 }}
                                size='mini'
                            />
                        </div>
                    ))}
                    </ul>
                    <Divider />
                    <BMLabel size='large'><b>Alternativas</b></BMLabel>
                    {formData.alternativas.map((alt, index) => (
                        <>
                            <Form.Field
                                key={index}
                                control={Input}
                                label={`${"ABCDE"[index]}`}
                                value={alt}
                                onChange={(e) => handleArrayChange(e, 'alternativas', index)}
                            />
                            <InlineTex texContent={alt}/>
                        </>
                    ))}
                    <Divider />
                    <Button type='submit' onClick={handleSubmit} loading={loading}>
                        Submeter Questão
                    </Button>
                    <Button type='button' onClick={() => setJsonModalOpen(true)}>
                        Inserir JSON
                    </Button>
                </Form>

                <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <Modal.Header>Digite o código de admin</Modal.Header>
                    <Modal.Content>
                    <Input
                        type='password'
                        placeholder='Código de admin'
                        value={adminCode}
                        onChange={(e) => setAdminCode(e.target.value)}
                    />
                    </Modal.Content>
                    <Modal.Actions>
                    <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
                    <Button onClick={submitWithAdminCode}>Confirmar</Button>
                    </Modal.Actions>
                </Modal>
                <Modal open={jsonModalOpen} onClose={() => setJsonModalOpen(false)}>
                    <Modal.Header>Inserir JSON</Modal.Header>
                    <Modal.Content>
                        <TextArea
                            placeholder='Cole o JSON aqui'
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                            style={{ minHeight: 200, width: '100%' }}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setJsonModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleJsonSubmit}>Carregar</Button>
                    </Modal.Actions>
                </Modal>
            </FormContainer>
        </>
    );
};

export default SubmitQuestionForm;
