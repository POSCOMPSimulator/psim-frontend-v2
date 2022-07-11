import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Image, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components';
import Login from '../login/Login'

const CustomMenu = styled(Menu)`
    border-radius: 0 !important;
    margin-bottom: 0 !important;
`;

function Header() {

    let navigate = useNavigate()
    const token = localStorage.getItem('auth-token')
    const [logado, setLogin] = useState(token !== '' && token !== null)
    const [fotoPerfil, setFotoPerfil] = useState('http://tachyons.io/img/logo.jpg')

    function logout() {
        setLogin()
        localStorage.clear()
        navigate('/')
    }

    useEffect(() => {
        if (logado) {
            setFotoPerfil(localStorage.getItem('img-perfil'))
        }
    }, [fotoPerfil, logado])


    return (
        <CustomMenu stackable inverted size='huge'>
            <Menu.Item href='/'>
                <Image src={require('../../assets/images/logo.png')} alt='PSIM' size='tiny' />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item href='/questoes'>Questões</Menu.Item>
                <Menu.Item href='/equipe'>Equipe</Menu.Item>
                {
                    logado ?
                        <Menu.Item>
                            <Dropdown
                                trigger={<Image src={fotoPerfil} avatar size='tiny' />}
                                icon={null}
                                floating
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Item text='Simulados' href='/perfil?tab=simulados' />
                                    <Dropdown.Item text='Estatísticas' href='/perfil?tab=estatisticas' />
                                    <Dropdown.Item text='Configurações' href='/perfil?tab=config' />
                                    {parseInt(localStorage.getItem('access-level')) > 0 ?
                                        <>
                                            <Dropdown.Divider />
                                            <Dropdown.Item href='/perfil?tab=moderacao'>
                                                Moderação
                                            </Dropdown.Item>
                                        </> :
                                        <></>}
                                    <Dropdown.Divider />
                                    <Dropdown.Item text='Sair' onClick={logout} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item> :
                        <Login sucessful_login={setLogin} />
                }
            </Menu.Menu>
        </CustomMenu>
    )

}

export default Header