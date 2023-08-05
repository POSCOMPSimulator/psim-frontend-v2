import styled from "styled-components";
import React, { useState } from 'react';
import { Form, Input, Button, Header } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import { usuarioAPI } from "../../network/apiClient";
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const Container = styled.div`
    padding: 15px 7rem 20px 7rem;
    text-align: justify;
`;

const SignUpForm = () => {
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform validation and submit the form
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        setLoading(true)
        // Perform further processing or API call for signing up
        usuarioAPI.registrar({
            "email": email,
            "nome": name,
            "senha": password,
            "confirma_senha": confirmPassword
        })
        .then(() => {
            toast({
                title: 'Registro feito com sucesso!',
                type: "success"
            })
            navigate('/')
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
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <Container>
            <SemanticToastContainer position="top-right" />
            <Header as='h2' textAlign='center'>Registre-se no PSIM</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Nome:</label>
                    <Input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </Form.Field>
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
                <Form.Field>
                    <label>Confirme sua senha:</label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                </Form.Field>
                <Button type="submit" loading={loading}>Registrar</Button>
            </Form>
        </Container>
    );
};

export default SignUpForm;