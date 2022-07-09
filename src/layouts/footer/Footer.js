import { List } from 'semantic-ui-react'
import styled from 'styled-components'

const FooterContainer = styled.div`
    background-color: #353535;
    margin-left: 0 !important !important;
    text-align: center
`;

function Footer() {

    return (
        <FooterContainer>
            <List horizontal inverted divided link size='small'>
                <List.Item >
                    Site Map
                </List.Item>
                <List.Item >
                    Contact Us
                </List.Item>
                <List.Item >
                    Terms and Conditions
                </List.Item>
                <List.Item >
                    Privacy Policy
                </List.Item>
            </List>
        </FooterContainer>
    )

}

export default Footer