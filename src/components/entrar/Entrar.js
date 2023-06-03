import styled from "styled-components";
import React, { useState } from 'react';
import { Form, Input, Button, Header } from 'semantic-ui-react';

const Container = styled.div`
    padding: 15px 7rem 20px 7rem;
    text-align: justify;
`;

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform further processing or API call for signing up
        console.log('Email:', email);
        console.log('Password:', password);

        // Reset the form after submission
        setEmail('');
        setPassword('');
    };

    return (
        <Container>
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
                <Button type="submit">Entrar</Button>
            </Form>
        </Container>
    );
};

export default SignInForm;