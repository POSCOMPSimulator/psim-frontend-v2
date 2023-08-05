import React, { useState, useEffect } from 'react'
import { Grid, Loader, Icon, Button, Dropdown, Confirm } from 'semantic-ui-react'
import styled from 'styled-components';
import CardSimulado from './subcomponents/CardSimulado';
import { simuladoAPI } from "../../network/apiClient";
import { useNavigate } from 'react-router-dom';

const IsOver = styled.span`
    cursor: pointer !important;
`;

const PageCount = styled.span`
    padding-right: 13.5px;
    padding-left: 10px;
`;

const GridSimulados = styled(Grid)`
    padding-top: 0  !important;
    padding-bottom: 20px  !important;
    padding-left: auto  !important;
    padding-right: auto  !important;
    margin-top: 0  !important;
`;

const CardSimulados = styled(Grid.Column)`
    padding-top: 10px !important;
    padding-bottom: 7.5px !important;
    margin-bottom: 0.5% !important;
`;

const CustomRow = styled(Grid.Row)`
    padding-top: 0;
    padding-bottom: 0;
`;

const Pag = styled.div`
    text-align: center !important;
`;

const CustomDrop = styled(Dropdown)`
    min-width: 400px !important;
    float: left !important;
`;

const CustomButton = styled(Button)`
    float: right !important;
`;

const CustomContainer = styled.div`
    clear: both !important;
`;

const SimuladoContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
`;

const options = [
    { key: 'N', value: 0, text: 'Não iniciado', label: { color: 'orange', circular: true, empty: true }, color: 'orange' },
    { key: 'E', value: 1, text: 'Em andamento', label: { color: 'yellow', circular: true, empty: true }, color: 'yellow' },
    { key: 'F', value: 2, text: 'Finalizado', label: { color: 'green', circular: true, empty: true }, color: 'green' }
]

function Simulados() {

    const [esperando, setEsperando] = useState(false)
    const [pagesNumber, setpagesNumber] = useState(0)
    const [actualPage, setActualPage] = useState(0)
    const [simulados, setSimulados] = useState([])
    const [open, setOpen] = useState(false)
    const [openSimulado, setOpenSimulado] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        selecionaSimulados([0, 1, 2])
    }, [])

    function selecionaSimulados(filtros) {

        if (filtros.length === 0) filtros = [0, 1, 2]

        setpagesNumber(0)
        setEsperando(true)
        setSimulados([])
        setActualPage(0)

        simuladoAPI.listar()
            .then((resp) => {
                if (resp.status === 200) {
                    let filteredSimulados = resp.data.simulados.filter((v) => { return filtros.includes(v.estado) })
                    setEsperando(false)
                    setpagesNumber(Math.ceil(filteredSimulados.length / 12))
                    setSimulados(filteredSimulados.map((s, i) => {
                        s.index = i
                        return s
                    }))
                }
                else {
                    console.log('Algo deu errado.')
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }

    function getRows() {

        let rows = [], startQuestion = actualPage * 12, endQuestion = (actualPage + 1) * 12

        for (let i = startQuestion; i < endQuestion; i++) {

            if (i >= simulados.length) break

            rows.push(
                <CardSimulados mobile={16} tablet={8} computer={4} key={i}>
                    {simulados[i].estado !== 2 ?
                        <Confirm
                            open={open}
                            content={simulados[i].estado === 0 ? 'Dejesa iniciar este simulado?' : 'Dejesa continuar este simulado?'}
                            cancelButton={{ color: 'red', content: 'Não', floated: 'left' }}
                            confirmButton={{ content: 'Sim', color: 'green', primary: false }}
                            onCancel={() => setOpen(false)}
                            onConfirm={() => navigate('/simulado/realizar/' + openSimulado.id)}
                            closeIcon
                            onClose={() => setOpen(false)}
                            onOpen={(_, data) => {
                                setOpen(true)
                                setOpenSimulado(simulados[data.trigger.props.simulado.index])
                            }}
                            trigger={<CardSimulado simulado={simulados[i]} fluid />}
                        /> : <CardSimulado simulado={simulados[i]} fluid onClick={() => navigate('/simulado/resultado/' + simulados[i].id)} />
                    }
                </CardSimulados>
            )

        }

        return rows

    }

    function pagination() {
        if (esperando) return <Loader inline='centered' active={esperando} size='huge' />

        if (pagesNumber === 0) {
            return (
                <Pag>
                    <span>Nenhum resultado encontrado.</span>
                </Pag>
            )
        }

        if (pagesNumber === 1) return <></>

        return (
            <Pag>
                <IsOver>
                    <Icon name='arrow left' disabled={actualPage === 0 || pagesNumber === 0} onClick={() => {
                        let ppage = actualPage - 1
                        setActualPage(ppage)
                    }} />
                </IsOver>
                <PageCount>Página {actualPage + 1} de {pagesNumber}</PageCount>
                <IsOver>
                    <Icon name='arrow right' disabled={actualPage === pagesNumber - 1 || pagesNumber === 0} onClick={() => {
                        let npage = actualPage + 1
                        setActualPage(npage)
                    }} />
                </IsOver>
            </Pag>
        )
    }

    function renderLabel(label) {
        return {
            content: label.text,
            className: label.color
        }
    }

    return (
        <SimuladoContainer>
            <CustomButton
                onClick={() => {navigate('/simulado/novo')}}
                positive
            >
                Criar simulado
            </CustomButton>
            <CustomDrop
                placeholder='Filtrar simulados'
                selection
                options={options}
                onChange={(_, d) => selecionaSimulados(d.value)}
                multiple
                renderLabel={renderLabel}
                clearable
            />
            <CustomContainer>
                <GridSimulados columns='equal' >
                    <CustomRow>{getRows()}</CustomRow>
                </GridSimulados>
                {pagination()}
            </CustomContainer>
        </SimuladoContainer>
    )

}

export default Simulados