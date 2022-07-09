import { Card, Icon, Image } from 'semantic-ui-react'
import styled from "styled-components";

const CenteredCard = styled(Card)`
    margin-left: auto !important;
    margin-right: auto !important;
`;

function User() {

    return (
        <CenteredCard>
            <Image src={localStorage.getItem('img-perfil')} wrapped ui={false} />
            <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                    Matthew is a musician living in Nashville.
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                22 Friends
            </Card.Content>
        </CenteredCard>
    )
}

export default User