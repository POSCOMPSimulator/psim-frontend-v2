import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react'
import styled from 'styled-components';

const CustomMenu = styled(Menu)`
    border-radius: 0 !important;
    margin-bottom: 0 !important;
`;

function Header() {

    let navigate = useNavigate()
    const token = localStorage.getItem('psim_access_token')
    const [logado, setLogin] = useState(token !== '' && token !== null)

    function logout() {
        setLogin()
        localStorage.clear()
        navigate('/')
    }

    useEffect(() => {
        setLogin(localStorage.getItem('psim_access_token'))
    }, [localStorage.getItem('psim_refresh_token')])


    return (
        <CustomMenu stackable inverted size='huge'>
            <Menu.Item href='/'>
                <Image src={require('../../assets/images/logo.png')} alt='PSIM' size='tiny' />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item href='/questoes'>Questões</Menu.Item>
                {
                    logado ?
                        <>
                            {localStorage.getItem('verificado') === "false" ? <Menu.Item href='/simulado'>Verificar<br />Conta</Menu.Item> : <></>}
                            <Menu.Item href='/simulado'>Simulados</Menu.Item>
                            <Menu.Item href='/perfil'>Perfil</Menu.Item>
                            <Menu.Item onClick={logout}>Sair</Menu.Item>
                        </>
                        :
                        <>
                            <Menu.Item href='/registrar'>Registre-se</Menu.Item>
                            <Menu.Item href='/entrar'>Entre</Menu.Item>
                        </>
                }
            </Menu.Menu>
        </CustomMenu>
    )

}

export default Header