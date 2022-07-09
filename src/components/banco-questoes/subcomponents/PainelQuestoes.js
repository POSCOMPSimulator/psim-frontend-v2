import React, { useState } from 'react'
import { Grid, Loader, Modal, Icon } from 'semantic-ui-react'
import styled from 'styled-components';
import Questao from "./Questao";
import CardQuestao from './CardQuestao';

const IsOver = styled.span`
    cursor: pointer !important;
`;

const PageCount = styled.span`
    padding-right: 13.5px;
    padding-left: 10px;
`;

const GridQuestoes = styled(Grid)`
    padding-top: 0  !important;
    padding-bottom: 20px  !important;
    padding-left: auto  !important;
    padding-right: auto  !important;
    margin-top: 0  !important;
`;

const CardQuestoes = styled(Grid.Column)`
    padding-top: 10px;
    padding-bottom: 7.5px;
`;

const CustomRow = styled(Grid.Row)`
    padding-top: 0;
    padding-bottom: 0;
`;

const Pag = styled.div`
    text-align: center !important;
`;

function PainelQuestoes(props) {

    const [open, setOpen] = useState(false)
    const [openQuestao, setOpenQuestao] = useState(null)

    function getRows() {

        let rows = [], startQuestion = props.actualPage * 12, endQuestion = (props.actualPage + 1) * 12

        for (let i = startQuestion; i < endQuestion; i++) {

            if (i >= props.questoes.length) break

            rows.push(
                <CardQuestoes mobile={16} tablet={8} computer={4} key={i}>
                    <Modal
                        closeIcon
                        onClose={() => setOpen(false)}
                        onOpen={(_, data) => {
                            setOpen(true)
                            setOpenQuestao(props.questoes[data.trigger.props.questao.index])
                        }}
                        open={open}
                        trigger={<CardQuestao questao={props.questoes[i]} fluid />}
                        size='large'
                    >
                        <Questao questao={openQuestao} />
                    </Modal>
                </CardQuestoes>
            )

        }

        return rows

    }

    function pagination() {

        if (props.esperando) {
            return (
                <Loader inline='centered' active={props.esperando} size='huge' />
            )
        }

        if (props.pagesNumber === 0) {
            return (
                <Pag>
                    <span>Nenhum resultado encontrado</span>
                </Pag>
            )
        }

        return (
            <Pag>
                <IsOver>
                    <Icon name='arrow left' disabled={props.actualPage === 0 || props.pagesNumber === 0} onClick={() => {
                        let ppage = props.actualPage - 1
                        props.setActualPage(ppage)
                    }} />
                </IsOver>
                <PageCount>Página {props.actualPage + 1} de {props.pagesNumber}</PageCount>
                <IsOver>
                    <Icon name='arrow right' disabled={props.actualPage === props.pagesNumber - 1 || props.pagesNumber === 0} onClick={() => {
                        let npage = props.actualPage + 1
                        props.setActualPage(npage)
                    }} />
                </IsOver>
            </Pag>
        )
    }

    return (
        <>
            <GridQuestoes id="grid-questoes" columns='equal' >
                <CustomRow>{getRows()}</CustomRow>
            </GridQuestoes>
            {pagination()}
        </>
    )

}

export default PainelQuestoes