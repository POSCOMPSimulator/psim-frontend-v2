import { Menu, Image, DropdownMenu,
    DropdownItem, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components';

const CustomMenu = styled(Menu)`
    border-radius: 0 !important;
    margin-bottom: 0 !important;
`;

function Header() {


    return (
        <CustomMenu stackable inverted size='huge'>
            <Menu.Item href='/'>
                <Image src={require('../../assets/images/logo.png')} alt='PSIM' size='tiny' />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item href='/questoes'>Questões</Menu.Item>
                <Menu.Item>
                    <Dropdown text='Simulado'>
                        <DropdownMenu>
                            <DropdownItem href='/simulado/novo'>Novo</DropdownItem>
                            <DropdownItem href='/simulado/realizar/'>Realizar</DropdownItem>
                            <DropdownItem href='/simulado/resultado/'>Ver resultado</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Menu.Item>
            </Menu.Menu>
        </CustomMenu>
    )

}

export default Header