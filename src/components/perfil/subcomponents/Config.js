import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Divider, Form, Header, Button, Confirm } from 'semantic-ui-react'
import { usuarioAPI } from '../../../network/apiClient';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

const options = [
    { key: '0', value: 0, text: 'Usuário', label: { color: 'teal', circular: true, empty: true } },
    { key: '1', value: 1, text: 'Moderador', label: { color: 'yellow', circular: true, empty: true } },
    { key: '2', value: 2, text: 'Administrador', label: { color: 'violet', circular: true, empty: true } }
]

function Config() {

    let navigate = useNavigate()
    const [promoteUser, setPromoteUser] = useState()
    const [deleteUserEmail, setDeleteUser] = useState()
    const [promoteLevelUser, setPromoteLevelUser] = useState()
    const [loadingP, setLoadingP] = useState(false);
    const [loadingD, setLoadingD] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    function reqPromoteUser() {
        setLoadingP(true)
        usuarioAPI.promover({ email: promoteUser, nivel: promoteLevelUser })
            .then((resp) => {
                if (resp.status === 200) {
                    toast({
                        title: 'Usuário promovido com sucesso!',
                        icon: 'check',
                        color: 'green'
                    })
                } else {
                    alert("Erro ao acessar servidor")
                    throw resp
                }
            })
            .catch(function (error) {
                console.log(error)
            })
            .finally(() => {
                setLoadingP(false)
            })
    }

    function deleteUser() {
        setLoadingD(true)
        usuarioAPI.remover(deleteUserEmail)
            .then((resp) => {
                if (resp.status === 200) {
                    toast({
                        title: 'Usuário removido com sucesso!',
                        icon: 'check',
                        color: 'green'
                    })
                } else {
                    alert("Erro ao acessar servidor")
                    throw resp
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoadingD(false)
            })
    }

    function deleteMyUser() {
        usuarioAPI.remover("me")
            .then((resp) => {
                if (resp.status === 200) {
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

    function displayPromoteUser() {
        return (parseInt(localStorage.getItem('nivel_acesso')) !== 0 ?
            <>
                <Divider section />
                <Form>
                    <Header as='h5'>Alterar nivel do usuário:</Header>
                    <Form.Group inline>
                        <Form.Input onChange={event => setPromoteUser(event.target.value.trim())} id='pr' placeholder='Nome do usuário' />
                        <Form.Dropdown onChange={(_, el) => setPromoteLevelUser(el.value)} options={
                            // eslint-disable-next-line
                            options.filter((el, i) => { if (i <= parseInt(localStorage.getItem('nivel_acesso'))) return el })} placeholder='Nível de acesso' selection />
                        <Form.Button loading={loadingP} onClick={reqPromoteUser} type='submit'>Enviar</Form.Button>
                    </Form.Group>
                </Form>
            </> : <></>
        )
    }

    function displayDeleteUser() {
        return (parseInt(localStorage.getItem('nivel_acesso')) !== 0 ?
            <>
                <Divider section />
                <Form>
                    <Header as='h5'>Remover usuário:</Header>
                    <Form.Group inline>
                        <Form.Input onChange={event => setDeleteUser(event.target.value.trim())} id='pr' placeholder='Nome do usuário' />
                        <Form.Button disabled={!deleteUserEmail} loading={loadingD} onClick={deleteUser} type='submit' color='red'>Apagar</Form.Button>
                    </Form.Group>
                </Form>
            </> : <></>
        )
    }

    function displayDeleteMyAccount() {
        return (
            <>
                <Divider />
                <Button onClick={() => setIsOpen(true)} color='red' type='submit'>Apagar minha conta</Button>
                <Confirm open={isOpen} onCancel={() => setIsOpen(false)} onConfirm={() => deleteMyUser()} cancelButton='Cancelar' confirmButton="Apagar" content='Apagar conta?' />
            </>
        )
    }

    return (
        <>
            <SemanticToastContainer position="top-right" />
            {displayPromoteUser()}
            {displayDeleteUser()}
            {displayDeleteMyAccount()}
        </>

    )

}

export default Config