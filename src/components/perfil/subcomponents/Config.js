import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Divider, Form, Header, Loader, Button, Confirm } from 'semantic-ui-react'

const options = [
    { key: '0', value: 0, text: 'Usuário', label: { color: 'teal', circular: true, empty: true } },
    { key: '1', value: 1, text: 'Moderador', label: { color: 'yellow', circular: true, empty: true } },
    { key: '2', value: 2, text: 'Administrador', label: { color: 'violet', circular: true, empty: true } }
]

function Config() {

    let navigate = useNavigate()
    const [promoteUser, setPromoteUser] = useState()
    const [promoteLevelUser, setPromoteLevelUser] = useState()
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    function reqPromoteUser() {
        setLoading(true)
        const reqOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            }
        }

        fetch(process.env.REACT_APP_BACKEND + `usuario/?email=${promoteUser}&nivel=${promoteLevelUser}`, reqOptions)
            .then((resp) => {
                if (!resp.ok) {
                    alert("Erro ao acessar servidor")
                    throw resp
                }
            })
            .catch(function (error) {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

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

    function deleteUser() {
        const reqOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            }
        }

        fetch(process.env.REACT_APP_BACKEND + 'usuario/', reqOptions)
            .then((resp) => {
                if (resp.ok) {
                    localStorage.clear()
                    navigate('/')
                } else {
                    console.log('Algo deu errado.')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    function displayPromoteUser() {
        return (userInfo.nivel_acesso !== 0 ?
            <>
                <Divider section />
                <Form>
                    <Header as='h5'>Alterar nivel do usuário:</Header>
                    <Form.Group inline>
                        <Form.Input onChange={event => setPromoteUser(event.target.value.trim())} id='pr' placeholder='Nome do usuário' />
                        <Form.Dropdown onChange={(_, el) => setPromoteLevelUser(el.value)} options={options.filter((el, i) => { if (i <= userInfo.nivel_acesso) return el })} placeholder='Nível de acesso' selection />
                        <Form.Button loading={loading} onClick={reqPromoteUser} type='submit'>Enviar</Form.Button>
                    </Form.Group>
                </Form>
            </> : <></>
        )
    }

    function displayDeleteUser() {
        return (
            <>
                <Button onClick={() => setIsOpen(true)} color='red' type='submit'>Apagar minha conta</Button>
                <Confirm open={isOpen} onCancel={() => setIsOpen(false)} onConfirm={() => deleteUser()} cancelButton='Cancelar' confirmButton="Apagar" content='Apagar conta?' />
            </>
        )
    }

    return (
        <>
            <Divider />
            {userInfo ?
                <>
                    {displayDeleteUser()}
                    {displayPromoteUser()}
                </> :
                <Loader inline='centered' active={loading} size='huge' />}
        </>

    )

}

export default Config