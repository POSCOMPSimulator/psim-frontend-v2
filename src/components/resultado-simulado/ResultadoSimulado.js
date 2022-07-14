import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pagination, Icon, Label, Loader } from 'semantic-ui-react'
import styled from 'styled-components'
import Questao from './subcomponents/Questao'

const SimulacaoContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
`;

const CustomPagination = styled(Pagination)`
    justify-content: center;
    .ui.secondary.pointing.menu .item {
        border-bottom-color: red !important;
    }
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

function ResultadoSimulado() {

    let { id } = useParams()
    const [carregando, setCarregando] = useState(true)
    const [questoes, setQuestoes] = useState([])
    const [questaoAtual, setQuestaoAtual] = useState(null)
    const [acertos, setAcertos] = useState({})
    const [erros, setErros] = useState({})
    const [brancos, setBrancos] = useState({})

    useEffect(() => {

        const reqOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            }
        }

        fetch(process.env.REACT_APP_BACKEND + '/simulado/' + id + '/', reqOptions)
            .then((resp) => {
                if (resp.ok) return resp.json()
                else {
                    setCarregando(false)
                    console.log('Algo deu errado.')
                    console.log(resp)
                }
            })
            .then((data) => {
                console.log(data)
                let q = data.questoes.map((q, i) => {
                    q.index = i
                    q.alternativa_marcada = data.respostas_atuais[q.id]
                    return q
                })

                console.log(q)

                setQuestoes({ ...q })
                setQuestaoAtual(q['0'])
                setAcertos(data.correcao.acertos)
                setErros(data.correcao.erros)
                setBrancos(data.correcao.brancos)
                setCarregando(false)

            })
            .catch((error) => {
                setCarregando(false)
                console.log(error)
            })

    }, [id])

    return (
        <>
            {
                carregando ?
                    <Loader inline='centered' active={carregando} size='huge' /> :
                    <>
                        <SimulacaoContainer>
                            <CustomLabel color='green' size='large'>Acertos: {acertos.tot}</CustomLabel>
                            <CustomLabel color='red' size='large'>Erros: {erros.tot}</CustomLabel>
                            <CustomLabel size='large'>Brancos: {brancos.tot}</CustomLabel>
                            <Label size='large' color={cores[questaoAtual.area]}>{questaoAtual.area}</Label>

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

                            <Questao questao={questaoAtual} />

                        </SimulacaoContainer>
                    </>
            }
        </>

    )

}

export default ResultadoSimulado