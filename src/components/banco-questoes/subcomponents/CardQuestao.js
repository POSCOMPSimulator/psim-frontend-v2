import { Card, Label, Icon, Popup } from 'semantic-ui-react'
import styled from 'styled-components';


const IsOverCard = styled(Card)`
    cursor: pointer !important;
`;

function CardQuestao({ questao, ...rest }) {

    const univel = parseInt(localStorage.getItem('nivel_acesso')) || 0

    const cores = {
        "Matemática": 'red',
        "Fundamentos da Computação": 'blue',
        "Tecnologia da Computação": 'green'
    }

    const shortcuts = {
        "Matemática": 'Mat',
        "Fundamentos da Computação": 'Fun',
        "Tecnologia da Computação": 'Tec'
    }

    function getIconSinalizacao() {
        if (univel > 0 && questao.sinalizada) {
            return <Icon name='warning circle' color='yellow' />
        }
        return <></>
    }

    function getSubAreaLabel(){
        let subareaLabel = <Label>{questao.subarea || 'Subárea não informada'}</Label>
        if (questao.subarea && questao.subarea.length > 32) {
            subareaLabel = <Popup content={questao.subarea} trigger={
                <Label>{questao.subarea.substring(0, 32) + '...' || 'Subárea não informada'}</Label>
            } />
        }
        return subareaLabel
    }

    return (
        <IsOverCard {...rest} >
            <Card.Content>
                <Card.Header>
                    {getIconSinalizacao()}
                    {questao.ano} - Questão {questao.numero}
                </Card.Header>
                <Label color={cores[questao.area]} floating circular>
                    {shortcuts[questao.area]}
                </Label>
            </Card.Content>
            <Card.Content extra>
                <Label.Group>
                    {getSubAreaLabel()}
                </Label.Group>
            </Card.Content>
        </IsOverCard>
    )
}

export default CardQuestao