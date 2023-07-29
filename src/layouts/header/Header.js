import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Image, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components';

const CustomMenu = styled(Menu)`
    border-radius: 0 !important;
    margin-bottom: 0 !important;
`;

function Header() {

    let navigate = useNavigate()
    const token = localStorage.getItem('psim_access_token')
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
                <Menu.Item href='/sobre'>Sobre</Menu.Item>
                <Menu.Item href='/questoes'>Questões</Menu.Item>
                {
                    logado ?
                    <>
                        <Menu.Item href='/simulado'>Simulados</Menu.Item>
                        <Menu.Item onClick={logout}>Sair</Menu.Item>
                    </>
                         :
                        // <Menu.Item>
                        //     <Dropdown
                        //         trigger={<Image src={fotoPerfil} avatar size='tiny' />}
                        //         icon={null}
                        //         floating
                        //     >
                        //         <Dropdown.Menu>
                        //             <Dropdown.Item text='Simulados' href='/perfil?tab=simulados' />
                        //             <Dropdown.Item text='Estatísticas' href='/perfil?tab=estatisticas' />
                        //             <Dropdown.Item text='Configurações' href='/perfil?tab=config' />
                        //             {parseInt(localStorage.getItem('access-level')) > 0 ?
                        //                 <>
                        //                     <Dropdown.Divider />
                        //                     <Dropdown.Item href='/perfil?tab=moderacao'>
                        //                         Moderação
                        //                     </Dropdown.Item>
                        //                 </> :
                        //                 <></>}
                        //             <Dropdown.Divider />
                        //             <Dropdown.Item text='Sair' onClick={logout} />
                        //         </Dropdown.Menu>
                        //     </Dropdown>
                        // </Menu.Item> :
                        <>
                            <Menu.Item href='/registrar'>Registrar</Menu.Item>
                            <Menu.Item href='/entrar'>Entrar</Menu.Item>
                        </>
                }
            </Menu.Menu>
        </CustomMenu>
    )

}

export default Header