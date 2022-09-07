import { useState, useEffect } from 'react'
import { Card, Label, Progress, Image, Statistic, Header, Loader, Form } from 'semantic-ui-react'
import styled from "styled-components";

const FlexCenter = styled(Statistic.Group)`
    justify-content: center !important;
`;

const StatisticMargin = styled(Statistic)`
    margin: 5% !important;
`;

function User() {

    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);

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
                        <Progress percent={Math.round(userInfo.estatisticas.porcentagem_questoes_feitas.geral)} indicating progress />
                        <p>Porcentagem de questões de Matemática</p>
                        <Progress percent={Math.round(userInfo.estatisticas.porcentagem_questoes_feitas.mat)} indicating progress />
                        <p>Porcentagem de questões de Fundamentos de Computação</p>
                        <Progress percent={Math.round(userInfo.estatisticas.porcentagem_questoes_feitas.tec)} indicating progress />
                        <p>Porcentagem de questões de Tecnologias da Computação</p>
                        <Progress percent={Math.round(userInfo.estatisticas.porcentagem_questoes_feitas.fun)} indicating progress />
                    </Card.Content>
                </Card>
                : <Card><Loader inline='centered' active={loading} size='huge' /></Card>}
        </div>
    )
}

export default User