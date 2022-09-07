import styled from "styled-components";
import { Divider } from 'semantic-ui-react'

const ConfigContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
    text-align: center;
`;

function Config() {

    // function promoteUser() {
    //     const reqOptions = {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + localStorage.getItem('auth-token'),
    //             'email': promoteEmailUser
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
    //     if (userInfo.nivel_acesso !== 0) {
    //         return (
    //             <Card.Content extra>
    //                 <Form>
    //                     <Header as='h5'>Promover usuário:</Header>
    //                     <Form.Group inline>
    //                         <Form.Input onChange={event => setPromoteEmailUser(event.target.value.trim())} id='pr' placeholder='email@mail.com' />
    //                         <Form.Button onClick={promoteUser} color='red' type='submit'>Enviar</Form.Button>
    //                     </Form.Group>
    //                 </Form>
    //             </Card.Content>
    //         )
    //     }
    // }

    return (
        <>
            <Divider />
            <ConfigContainer>
                Página em construção.
            </ConfigContainer>
        </>

    )

}

export default Config