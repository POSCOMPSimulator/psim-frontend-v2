import { Card, Icon, Label} from 'semantic-ui-react'
import styled from 'styled-components';

const IsOverCard = styled(Card)`
    cursor: pointer !important;
`;

const CustomIcon = styled(Icon)`
    margin-right: 0 !important;
`;

const CustomLabel = styled(Label)`
    z-index: 0 !important;
`;

function CardSimulado({ simulado, ...rest }) {

    const cores = {
        0: 'orange',
        1: 'yellow',
        2: 'green'
    }

    const shortcuts = {
        0: 'star outline',
        1: 'clock outline',
        2: 'checkmark'
    }

    return (
        <IsOverCard {...rest} as = 'a' className = 'ui card fluid'>
            <Card.Content>
                <Card.Header textAlign='center'>
                    {simulado.nome}
                </Card.Header>
                <CustomLabel color={cores[simulado.estado]} circular floating>
                    <CustomIcon name={shortcuts[simulado.estado]}/>
                </CustomLabel>
            </Card.Content>
        </IsOverCard>
    )
}

export default CardSimulado