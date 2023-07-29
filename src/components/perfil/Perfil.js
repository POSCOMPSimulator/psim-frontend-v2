import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Estatisticas from './subcomponents/Estatisticas'
import Config from './subcomponents/Config'
import Moderacao from './subcomponents/Moderacao'
import { Tab } from 'semantic-ui-react'
import styled from "styled-components";

const PerfilContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
`;

const panes = [
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
        <PerfilContainer>
            <Tab
                menu={{ secondary: true, fluid: true }}
                panes={panes.filter((v) => v.require <= parseInt(localStorage.getItem('nivel_acesso')))}
                onTabChange={(_, v) => toggle(v)}
                activeIndex={activeTab}
            />
        </PerfilContainer>
    )

}

export default Perfil