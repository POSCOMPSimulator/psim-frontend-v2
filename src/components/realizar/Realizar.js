import React, { useState } from 'react'
import {
    Button,
    Form,
    Input,
    Header,
    Message,
    Confirm
} from 'semantic-ui-react'
import styled from 'styled-components';
import { simuladoAPI } from "../../network/apiClient";
import { useNavigate } from 'react-router-dom';

const CriadorContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
`;

function RealizarSimulado() {

    const [id, setID] = useState('')
    const [error, setError] = useState(null)
    const [openIniciar, setOpenIniciar] = useState(false)
    const [openContinuar, setOpenContinuar] = useState(false)
    let navigate = useNavigate()

    function realizarSimulado(state) {

        navigate(
            `/simulado/realizar/${id}`,
            {
                state: {
                    estado: state
                }
            }
        )

    }

    function consultarSimulado() {

        simuladoAPI.consultar(id)
            .then((resp) => {
                console.log(resp)
                switch (resp.data.estado) {
                    case 0:
                        setOpenIniciar(true)
                        break;
                    case 1:
                        setOpenContinuar(true)
                        break;
                    case 2:
                        setError({
                            header: 'Não é possível realizar este simulado',
                            content: 'Simulado já foi finalizado.'
                        })
                        break;
                    default:
                        break;
                }
            })
            .catch((error) => {
                console.log(error)
                setError({
                    header: 'Não foi possível encontrar o simulado',
                    content: error.response.data.error
                })
            })

    }

    return (
        <CriadorContainer>
            <Confirm
                open={openIniciar}
                content={'Dejesa realizar este simulado?'}
                cancelButton={{ color: 'red', content: 'Não', floated: 'left' }}
                confirmButton={{ content: 'Sim', color: 'green', primary: false }}
                onCancel={() => setOpenIniciar(false)}
                onConfirm={() => realizarSimulado('iniciar')}
                closeIcon
                onClose={() => setOpenIniciar(false)}
                onOpen={() => setOpenIniciar(true)}
            />
            <Confirm
                open={openContinuar}
                content={'Este simulado já foi iniciado. O que deseja fazer?'}
                cancelButton={{ color: 'yellow', content: 'Reiniciar', floated: 'left' }}
                confirmButton={{ content: 'Continuar', color: 'green', primary: false }}
                onCancel={() => realizarSimulado('iniciar')}
                onConfirm={() => realizarSimulado('continuar')}
                closeIcon
                onClose={() => setOpenContinuar(false)}
                onOpen={() => setOpenContinuar(true)}
            />
            <Header as='h2' textAlign='center'>Realização de simulado</Header>
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

                <Button onClick={consultarSimulado} type='button'>Realizar</Button>
            </Form>
        </CriadorContainer>
    )

}

export default RealizarSimulado