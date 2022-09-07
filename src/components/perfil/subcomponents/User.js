import { useState, useEffect } from 'react'
import { Card, Label, Progress, Image, Statistic, Header, Loader } from 'semantic-ui-react'
import styled from "styled-components";

const FlexCenter = styled(Statistic.Group)`
    justify-content: center !important;
`;

const StatisticMargin = styled(Statistic)`
    margin: 5% !important;
`;

function User() {

    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true)

    const cargosInfo = [{ color: "teal", role: "Usuário", icon: "fas fa-user" }, { color: "yellow", role: "Moderador", icon: "fas fa-user-edit" }, { color: "violet", role: "Administrador", icon: "fas fa-user-cog" }]

    function getUserInfo() {

        const reqOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            }
        }

        fetch(process.env.REACT_APP_BACKEND + 'usuario/', reqOptions)
            .then((resp) => {
                if (resp.ok) return resp.json()
                else {
                    console.log('Algo deu errado.')
                }
            })
            .then((res) => {
                setLoading(false)
                setUserInfo(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    // function promoteUser() {
    //     const token = localStorage.authToken

    //     const reqOptions = {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'user-token': token,
    //             'email': userEmail
    //         }
    //     }

    //     fetch(process.env.REACT_APP_BACKEND + `usuario/`, reqOptions)
    //         .then((resp) => {
    //             if (!resp.ok) {
    //                 alert("Erro ao acessar servidor")
    //                 throw resp
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         })
    // }

    // function displayPromoteUser() {
    //     if (perfilData.nivel_acesso !== 0) {
    //         return (
    //             <Card.Content extra>
    //                 <Form>
    //                     <Header as='h5'>Promover usuário:</Header>
    //                     <Form.Group inline>
    //                         <Form.Input onChange={event => setUserEmail(event.target.value.trim())} id='pr' placeholder='email@mail.com' />
    //                         <Form.Button onClick={promoteUser} color='red' type='submit'>Enviar</Form.Button>
    //                     </Form.Group>
    //                 </Form>
    //             </Card.Content>
    //         )
    //     }
    // }

    return (
        <div>
            {userInfo ?
                <Card fluid>
                    <Image src={userInfo.foto_perfil} />
                    <Card.Content>
                        <Header as='h1'>{userInfo.nome}</Header>
                        <Card.Meta>
                            <Label color={cargosInfo[userInfo.nivel_acesso].color} as='a' image>
                                <i className={cargosInfo[userInfo.nivel_acesso].icon}></i>
                                <span>{cargosInfo[userInfo.nivel_acesso].role}</span>
                            </Label>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Description>
                            <FlexCenter>
                                <StatisticMargin>
                                    <Statistic.Value>{userInfo.estatisticas.num_simulados_finalizados}</Statistic.Value>
                                    <Statistic.Label>Simulados</Statistic.Label>
                                </StatisticMargin>
                                <StatisticMargin>
                                    <Statistic.Value>{userInfo.estatisticas.num_comentarios_publicados}</Statistic.Value>
                                    <Statistic.Label>Comentários</Statistic.Label>
                                </StatisticMargin>
                            </FlexCenter>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <p>Porcentagem de questões de Geral</p>
                        <Progress percent={userInfo.estatisticas.porcentagem_questoes_feitas[0]} indicating progress />
                        <p>Porcentagem de questões de Matemática</p>
                        <Progress percent={userInfo.estatisticas.porcentagem_questoes_feitas[1]} indicating progress />
                        <p>Porcentagem de questões de Fundamentos de Computação</p>
                        <Progress percent={userInfo.estatisticas.porcentagem_questoes_feitas[2]} indicating progress />
                        <p>Porcentagem de questões de Tecnologias da Computação</p>
                        <Progress percent={userInfo.estatisticas.porcentagem_questoes_feitas[3]} indicating progress />
                    </Card.Content>
                </Card>
                : <Card><Loader inline='centered' active={loading} size='huge' /></Card>}
            {/* {displayPromoteUser()} */}
        </div>
    )
}

export default User