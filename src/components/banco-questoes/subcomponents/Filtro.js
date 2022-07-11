import { Label, Dropdown, Segment, Button, Form, Checkbox } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const DropdownYears = styled(Dropdown)`
    margin-bottom: 10px;
    border-bottom-width: 0;
`;

const DropdownAreas = styled(Dropdown)`
    margin-bottom: 10px;
    border-bottom-width: 0;
    float: left;
`;

const FilterCheckbox = styled.div`
    padding-top: 11px;
    float: left;
`

function Filtro(props) {

    const [selectedYears, setSelectedYears] = useState([]);
    const [selectedAreas, setSelectedArea] = useState([]);
    const [anos, setAnos] = useState([])
    const [areas, setAreas] = useState([])
    const [apenasSinalizadas, setApenasSinalizadas] = useState(false)
    const univel = parseInt(localStorage.getItem('access-level')) || 0

    useEffect(() => {

        const reqOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(process.env.REACT_APP_BACKEND + 'questao/sumario/', reqOptions)
            .then((resp) => {
                if (resp.ok) return resp.json()
                else {
                    console.log(resp)
                }
            })
            .then((res) => {
                setAnos(res.anos.sort().map(v => {
                    return {
                        key: v.toString(),
                        text: v.toString(),
                        value: v.toString()
                    }
                }))

                setAreas(res.areas.map(v => {
                    return {
                        key: v.substring(0, 3).toLowerCase(),
                        text: v + ' (' + v.substring(0, 3) + ')',
                        value: v
                    }
                }))
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    return (

        <>
            <Segment size='tiny' clearing>
                <Label attached='top left' size='large'><b>Filtros</b></Label>
                <DropdownYears
                    value={selectedYears}
                    fluid
                    placeholder='Anos'
                    multiple
                    selection
                    closeOnChange
                    clearable
                    options={anos}
                    onChange={(_, data) => { setSelectedYears(data.value); }} />
                <DropdownAreas
                    value={selectedAreas}
                    fluid
                    placeholder='Áreas'
                    multiple
                    selection
                    closeOnChange
                    clearable
                    options={areas}
                    onChange={(_, data) => { setSelectedArea(data.value); }} />
                {
                    univel > 0 ?
                        <FilterCheckbox>
                            <Form.Field
                                control={Checkbox}
                                label='Apenas sinalizadas'
                                value='sm'
                                checked={apenasSinalizadas}
                                onChange={(_, data) => { setApenasSinalizadas(data.checked) }}
                            />
                        </FilterCheckbox> :
                        <></>
                }
                <Button onClick={() => {props.selecionaQuestoes(selectedYears, selectedAreas, apenasSinalizadas)}} floated='right'>Aplicar</Button>
            </Segment>
        </>
    )

}

export default Filtro