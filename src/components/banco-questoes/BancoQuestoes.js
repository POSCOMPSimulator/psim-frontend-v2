import React, { useEffect, useState } from 'react'
import { Divider, Header } from 'semantic-ui-react'
import styled from 'styled-components';
import Filtro from './subcomponents/Filtro';
import PainelQuestoes from './subcomponents/PainelQuestoes'

const BancoContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
`;

function BancoQuestoes() {

    const [esperando, setEsperando] = useState(false)
    const [pagesNumber, setpagesNumber] = useState(0)
    const [actualPage, setActualPage] = useState(0)
    const [questoes, setQuestoes] = useState([])

    useEffect(() => {
        selecionaQuestoes([], [], false)
    }, [])

    function selecionaQuestoes(selectedYears, selectedAreas, apenasSinalizadas) {

        setpagesNumber(0)
        setEsperando(true)
        setQuestoes([])
        setActualPage(0)

        let urlSearch = new URLSearchParams()
        selectedYears.forEach((e) => urlSearch.append('anos', e))
        selectedAreas.forEach((e) => urlSearch.append('areas', e))
        if (apenasSinalizadas) urlSearch.append('sinalizadas', 'yes')

        const reqOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(process.env.REACT_APP_BACKEND + 'questao/?' + urlSearch.toString(), reqOptions)
            .then((resp) => {
                if (resp.ok) return resp.json()
                else {
                    console.log('Algo deu errado.')
                }
            })
            .then((res) => {
                setpagesNumber(Math.ceil(res.questoes.length / 12))
                setEsperando(false)
                setQuestoes(res.questoes.map((q, i) => {
                    q.index = i
                    return q
                }))
            })
            .catch((error) => {
                console.log(error)
            })

    }

    return (
        <>
            <BancoContainer>
                <Header as='h2' textAlign='center'>Banco de questões</Header>
                <Filtro  selecionaQuestoes={selecionaQuestoes}/>
                <Divider />
                <PainelQuestoes esperando={esperando} questoes={questoes} pagesNumber={pagesNumber} actualPage={actualPage} setActualPage={setActualPage} />
            </BancoContainer>
        </>
    )

}

export default BancoQuestoes