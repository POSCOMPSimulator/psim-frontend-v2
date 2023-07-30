import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Form,
    Input,
    Radio,
    Header,
    Message
} from 'semantic-ui-react'
import styled from 'styled-components';
import { simuladoAPI } from "../../network/apiClient";

const CriadorContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
`;

const optionsYears = [
    { key: '2016', text: '2016', value: '2016' },
    { key: '2017', text: '2017', value: '2017' },
    { key: '2018', text: '2018', value: '2018' },
    { key: '2019', text: '2019', value: '2019' },
    { key: '2022', text: '2022', value: '2022' },
]

const defaultSim = {
    name: '',
    qtdMat: '20',
    qtdFun: '30',
    qtdTec: '20',
    years: ['2016', '2017', '2018', '2019', '2022'],
    time: '240'
}

function CriadorSimulado() {

    const [doDefault, setDefault] = useState(true)
    const [inputValues, setInputValues] = useState(defaultSim)
    const [error, setError] = useState(null)
    const [criando, setCriando] = useState(false)
    const navigate = useNavigate()

    let handleChange = (_, d) => {
        setInputValues({
            ...inputValues,
            [d.name]: d.value
        })
    }

    function validateInput() {

        setError(null)

        if (inputValues.name.length <= 0) {
            setError({
                header: 'Erro de preenchimento',
                content: 'O nome do simulado não pode ser vazio.'
            })
            return true
        }

        if (inputValues.years.length <= 0) {
            setError({
                header: 'Erro de preenchimento',
                content: 'Ao menos um ano de prova deve ser escolhido.'
            })
            return true
        }

        if (parseInt(inputValues.qtdMat) < 1 && parseInt(inputValues.qtdFun) < 1 && parseInt(inputValues.qtdTec) < 1) {
            setError({
                header: 'Erro de preenchimento',
                content: 'A quantidade de questões não pode ser zero.'
            })
            return true
        }

        let qtdTot = parseInt(inputValues.qtdMat) + parseInt(inputValues.qtdFun) + parseInt(inputValues.qtdTec)
        let tempoMin = 3 * qtdTot
        let tempoMax = 5 * qtdTot
        if (parseInt(inputValues.time) < tempoMin || parseInt(inputValues.time) > tempoMax) {
            setError({
                header: 'Erro de preenchimento',
                content: `O tempo de realização para essa quantidade de questões deve estar entre ${tempoMin} e ${tempoMax}`
            })
            return true
        }

        return false

    }

    function criarSimulado() {

        let error = validateInput()
        if (error) return

        setCriando(true)

        let body = {}
        body.nome = inputValues.name
        body.tempo_limite = parseInt(inputValues.time)*60
        body.anos = inputValues.years.map((v) => parseInt(v))

        body.areas = []
        if (parseInt(inputValues.qtdMat) > 0) body.areas.push('Matemática')
        if (parseInt(inputValues.qtdFun) > 0) body.areas.push('Fundamentos da Computação')
        if (parseInt(inputValues.qtdTec) > 0) body.areas.push('Tecnologia da Computação')

        body.numero_questoes = {
            tot: parseInt(inputValues.qtdMat) + parseInt(inputValues.qtdFun) + parseInt(inputValues.qtdTec),
            mat: parseInt(inputValues.qtdMat),
            fun: parseInt(inputValues.qtdFun),
            tec: parseInt(inputValues.qtdTec)
        }

        simuladoAPI.criar(body)
            .then((resp) => {
                setCriando(false)
                if (resp.status === 201) {
                    navigate('/simulado')
                }

                throw Error(resp.statusText);

            }).catch((error) => {
                setCriando(false)
                setError({
                    header: 'Erro na criação',
                    content: error.message
                })
            })

    }

    return (
        <CriadorContainer>
            <Header as='h2' textAlign='center'>Criação de simulado</Header>
            {
                error ?
                    <Message error
                        header={error.header}
                        content={error.content}
                    /> :
                    <></>
            }
            <Form>
                <Form.Field
                    control={Input}
                    label='Nome do simulado'
                    placeholder='POSCOMP'
                    name='name'
                    value={inputValues.name}
                    onChange={handleChange}
                    required
                />
                <Form.Select
                    fluid
                    label='Anos'
                    name='years'
                    value={inputValues.years}
                    options={optionsYears}
                    placeholder='Anos'
                    onChange={handleChange}
                    multiple
                    required
                    clearable
                />
                <Form.Field
                    control={Radio}
                    checked={doDefault}
                    onClick={() => {
                        setDefault(!doDefault)
                        if (!doDefault) {
                            setInputValues({
                                ...defaultSim,
                                'name': inputValues.name,
                                'years': inputValues.years
                            })
                        }

                    }}
                    name='default'
                    label='Utilizar a configuração padrão do exame'
                />
                <Form.Field label='Quantidade de questões' disabled={doDefault} />
                <Form.Group widths='equal'>
                    <Form.Input required label='Matemática' type='number' name='qtdMat' value={inputValues.qtdMat} onChange={handleChange} disabled={doDefault} min={1} />
                    <Form.Input required label='Fundamentos da Computação' type='number' name='qtdFun' value={inputValues.qtdFun} onChange={handleChange} disabled={doDefault} min={1} />
                    <Form.Input required label='Tecnologia da Computação' type='number' name='qtdTec' value={inputValues.qtdTec} onChange={handleChange} disabled={doDefault} min={1} />
                </Form.Group>
                <Form.Input required label='Duração do simulado (em minutos)' type='number' name='time' value={inputValues.time} onChange={handleChange} disabled={doDefault} />
                <Button onClick={criarSimulado} type='button' loading={criando}>Criar</Button>
            </Form>
        </CriadorContainer>
    )

}

export default CriadorSimulado