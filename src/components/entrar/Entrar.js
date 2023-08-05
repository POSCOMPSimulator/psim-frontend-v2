import styled from "styled-components";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Header } from 'semantic-ui-react';
import { usuarioAPI } from "../../network/apiClient";
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const Container = styled.div`
    padding: 15px 7rem 20px 7rem;
    text-align: justify;
`;

const SignInForm = (props) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true)

        // Perform further processing or API call for signing up
        usuarioAPI.login({
            "email": email,
            "senha": password,
        })
        .then((response) => {
            localStorage.setItem('psim_access_token', response.data['access_token'])
            localStorage.setItem('psim_refresh_token', response.data['refresh_token'])
            localStorage.setItem('verificado', response.data['user']['verificado'])
            localStorage.setItem('nivel_acesso', response.data['user']['nivel_acesso'])
            localStorage.setItem('email', response.data['user']['email'])

            if (!response.data['user']['verificado']) navigate('/verificar')
            else navigate('/')
        })
        .catch((response) => {
            toast({
                title: 'Aconteceu um erro!',
                type: 'error',
                description: response.response.data.error
            })
        })
        .finally(() => {
            setLoading(false)
        })

        // Reset the form after submission
        setEmail('');
        setPassword('');
    };

    return (
        <Container>
            <SemanticToastContainer position="top-right" />
            <Header as='h2' textAlign='center'>Entre no PSIM</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Email:</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </Form.Field>
                <Form.Field>
                    <label>Senha:</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </Form.Field>
                <Button type="submit" loading={loading}>Entrar</Button>
            </Form>
        </Container>
    );
};

export default SignInForm;