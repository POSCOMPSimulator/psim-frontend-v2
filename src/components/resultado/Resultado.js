import React, { useState } from 'react'
import {
    Button,
    Form,
    Input,
    Header,
    Message
} from 'semantic-ui-react'
import styled from 'styled-components';
import { simuladoAPI } from "../../network/apiClient";
import { useNavigate } from 'react-router-dom';

const CriadorContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
`;

function FormResultadoSimulado() {

    const [id, setID] = useState('')
    const [error, setError] = useState(null)
    let navigate = useNavigate()

    function consultarSimulado() {

        simuladoAPI.get(id)
            .then((_) => {
                navigate(`/simulado/resultado/${id}`)
            })
            .catch((error) => {
                setError({
                    header: 'Não foi possível encontrar o simulado',
                    content: error.response.data.error
                })
            })

    }

    return (
        <CriadorContainer>
            <Header as='h2' textAlign='center'>Ver resultado de simulado</Header>
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
                    label='ID do simulado'
                    placeholder='xxxxxx-xxxxx-xxxxx-xxxxx'
                    name='id'
                    value={id}
                    onChange={(_, d) => {setID(d.value)}}
                    required
                />

                <Button onClick={consultarSimulado} type='button'>Ver resultado</Button>
            </Form>
        </CriadorContainer>
    )

}

export default FormResultadoSimulado