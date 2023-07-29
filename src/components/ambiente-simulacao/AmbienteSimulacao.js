import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader, Pagination, Icon, Label, Confirm } from 'semantic-ui-react'
import styled from 'styled-components'
import Questao from './subcomponents/Questao';
import { useAutosave } from 'react-autosave';
import { simuladoAPI } from "../../network/apiClient";

const SimulacaoContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
`;

const CustomPagination = styled(Pagination)`
    justify-content: center;
    .ui.secondary.pointing.menu .item {
        border-bottom-color: red !important;
    }
`;

const CustomIcon = styled(Icon)`
    margin-right: 0 !important;
`;

const CustomLabel = styled(Label)`
    float: right;
    cursor: pointer;
`;

const cores = {
    "Matemática": 'red',
    "Fundamentos da Computação": 'blue',
    "Tecnologia da Computação": 'green'
}

function secondsToTime(secs) {

    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}

function AmbienteSimulacao() {

    let { id } = useParams()
    const [carregando, setCarregando] = useState(true)
    const [questoes, setQuestoes] = useState([])
    const [questaoAtual, setQuestaoAtual] = useState(null)
    const tempoRestante = useRef(0)
    const [timer, setTimer] = useState(secondsToTime(0))
    const countdown = useRef(null)
    const [hidden, setHidden] = useState(false);
    const [atualizando, setAtualizando] = useState(false)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    function countDown() {

        // Check if we're at zero.
        if (tempoRestante.current === 0) {
            clearInterval(countdown.current)
            return
        }

        // Remove one second, set state so a re-render happens.
        let seconds = tempoRestante.current - 1;
        tempoRestante.current = seconds
        setTimer(secondsToTime(seconds))

    }

    useEffect(() => {

        simuladoAPI.atualizaEstado(id, 'iniciar', {})
            .then((resp) => {
                if (resp.status === 202) {
                    let data = resp.data
                    let q = data.questoes.map((q, i) => {
                        q.index = i
                        q.resposta = data.respostas_atuais[q.id]
                        return q
                    })
    
                    setQuestoes({ ...q })
    
                    setQuestaoAtual(q['0'])
    
                    tempoRestante.current = data.tempo_restante
                    countdown.current = setInterval(countDown, 1000)
                    setTimer(secondsToTime(data.tempo_restante))
    
                    setCarregando(false)
                }
                else {
                    setCarregando(false)
                    console.log('Algo deu errado.')
                    console.log(resp)
                }
            })
            .catch((error) => {
                setCarregando(false)
                console.log(error)
            })

    }, [id])

    const updateSimulado = useCallback((q) => {

        setAtualizando(true)

        let qids = []
        let qresps = []

        Object.keys(q).forEach(function (key) {
            qids.push(q[key].id)

            let r = q[key].resposta
            if (r === undefined) r = -1

            qresps.push(r)
        })

        let body = {
            tempo_restante: tempoRestante.current,
            respostas: {
                ids: qids,
                resps: qresps
            }
        }

        simuladoAPI.atualizaRespostas(id, body)
            .then((resp) => {
                if (resp.status === 200) {
                    console.log('OK')
                    setAtualizando(false)
                }
                else {
                    setAtualizando(false)
                    console.log('Algo deu errado.')
                    console.log(resp)
                }
            })
            .catch((error) => {
                setAtualizando(false)
                console.log(error)
            })

        // eslint-disable-next-line
    }, []);

    useAutosave({ data: questoes, onSave: updateSimulado });

    function updateQuestao(index, questao) {
        setQuestoes({
            [index]: questao,
            ...questoes
        })
    }

    function finalizarSimulado() {

        let aux = Object.keys(questoes).map(function (key) {
            return {
                [questoes[key].id]: questoes[key].resposta
            }
        })

        aux = aux.reduce((obj, item) => {
            return {
                ...obj,
                ...item,
            };
        }, {})

        console.log(aux)

        
        let body = {
            tempo_restante: tempoRestante.current,
            respostas: aux
        }

        // simuladoAPI.atualizaEstado(id, 'finalizar', body)
        //     .then((resp) => {
        //         if (resp.status === 202) navigate('/simulado')
        //         else {
        //             console.log('Algo deu errado.')
        //             console.log(resp)
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        
        simuladoAPI.atualizaRespostas(id, body)
            .then((resp) => {
                if (resp.status === 200) {
                    simuladoAPI.atualizaEstado(id, 'finalizar', {})
                        .then((resp) => {
                            if (resp.status === 202) navigate('/simulado')
                            else {
                                console.log('Algo deu errado.')
                                console.log(resp)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
            .catch((error) => {
                setAtualizando(false)
                console.log(error)
            })

    }

    return (
        <>
            {
                carregando ?
                    <Loader inline='centered' active={carregando} size='huge' /> :
                    <>
                        <SimulacaoContainer>
                            <Confirm
                                open={open}
                                content={'Dejesa finalizar este simulado?'}
                                cancelButton={{ color: 'red', content: 'Não', floated: 'left' }}
                                confirmButton={{ content: 'Sim', color: 'green', primary: false }}
                                onCancel={() => setOpen(false)}
                                onConfirm={() => finalizarSimulado()}
                                closeIcon
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}
                                trigger={<CustomLabel color='green' size='large'>Entregar simulado</CustomLabel>}
                            />
                            {tempoRestante.current === 0 ?
                                <span>O tempo de realização do simulado terminou, por favor clique em <b>Entregar Simulado</b></span> :

                                <>
                                    <Label size='large' color={cores[questaoAtual.area]}>{questaoAtual.area}</Label>

                                    <CustomLabel onClick={() => setHidden(!hidden)} size='large'>
                                        {
                                            hidden ?
                                                <CustomIcon name='clock outline' /> :
                                                <span>
                                                    {timer.h}h{timer.m}min{timer.s}s
                                                </span>
                                        }
                                    </CustomLabel>

                                    {atualizando ? <CustomLabel color='yellow' size='large'>Salvando...</CustomLabel> : <></>}

                                    <CustomPagination
                                        defaultActivePage={1}
                                        boundaryRange={2}
                                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                        onPageChange={(e, { activePage }) => setQuestaoAtual(questoes[activePage - 1])}
                                        pointing
                                        secondary
                                        totalPages={Object.keys(questoes).length}
                                        fluid
                                        size='huge'
                                    />

                                    <Questao questao={questaoAtual} updater={updateQuestao} />
                                </>

                            }
                        </SimulacaoContainer>
                    </>
            }
        </>
    )

}

export default AmbienteSimulacao