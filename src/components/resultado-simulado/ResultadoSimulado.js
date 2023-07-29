import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pagination, Icon, Label, Loader } from 'semantic-ui-react'
import styled from 'styled-components'
import Questao from './subcomponents/Questao'
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

        simuladoAPI.get(id)
            .then((resp) => {
                if (resp.status === 200) {
                    
                    let data = resp.data
                    console.log(data.respostas_atuais)

                    let q = data.questoes.map((q, i) => {
                        q.index = i
                        q.alternativa_marcada = data.respostas_atuais.resps[i]
                        return q
                    })

                    console.log(q)

                    setQuestoes({ ...q })
                    setQuestaoAtual(q['0'])
                    setAcertos(data.correcao.acertos)
                    setErros(data.correcao.erros)
                    setBrancos(data.correcao.brancos)
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

    return (
        <>
            {
                carregando ?
                    <Loader inline='centered' active={carregando} size='huge' /> :
                    <>
                        <SimulacaoContainer>

                            <CustomLabel size='large'>Brancos: {brancos.tot}</CustomLabel>
                            <CustomLabel color='red' size='large'>Erros: {erros.tot}</CustomLabel>
                            <CustomLabel color='green' size='large'>Acertos: {acertos.tot}</CustomLabel>
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