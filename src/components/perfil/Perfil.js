import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tab, Grid } from 'semantic-ui-react'
import styled from "styled-components";

import Simulados from './subcomponents/Simulados'
import Estatisticas from './subcomponents/Estatisticas'
import Config from './subcomponents/Config'
import Moderacao from './subcomponents/Moderacao'
import User from './subcomponents/User'

const Container = styled.div`
    padding: 1.5% 5%;
`;

const panes = [
    {
        name: 'simulados',
        menuItem: 'Simulados',
        require: 0,
        render: () => <Simulados />,
    },
    {
        name: 'estatisticas',
        menuItem: 'Estatísticas',
        require: 0,
        render: () => <Estatisticas />,
    },
    {
        name: 'config',
        menuItem: 'Configurações',
        require: 0,
        render: () => <Config />,
    },
    {
        name: 'moderacao',
        menuItem: 'Moderação',
        require: 1,
        render: () => <Moderacao />,
    },
]

function Perfil() {

    const getTabIndexByName = function (name) {
        let tab_index = 0
        panes.forEach((element, index) => {
            if (element.name === name && parseInt(localStorage.getItem('access-level')) >= element.require)
                tab_index = index
        });
        return tab_index
    }

    const [searchParams, setSearchParams] = useSearchParams()
    const [activeTab, setActiveTab] = useState(getTabIndexByName(searchParams.get('tab')));

    const toggle = (tab) => {
        setSearchParams({ 'tab': tab.panes[tab.activeIndex].name })
        setActiveTab(tab.activeIndex)
    }

    return (
        <Container>
            <Grid>
                <Grid.Column width={3}>
                    <User></User>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Tab
                    menu={{ secondary: true, fluid: true }}
                    panes={panes.filter((v) => v.require <= parseInt(localStorage.getItem('access-level')))}
                    onTabChange={(_, v) => toggle(v)}
                    activeIndex={activeTab}
                    />
                </Grid.Column>
            </Grid>
        </Container>
    )

}

export default Perfil