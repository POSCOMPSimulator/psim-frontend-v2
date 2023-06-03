import styled from "styled-components";
import React, { useState } from 'react';
import { Form, Input, Button, Header } from 'semantic-ui-react';

const Container = styled.div`
    padding: 15px 7rem 20px 7rem;
    text-align: justify;
`;

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

        // Perform further processing or API call for signing up
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);

        // Reset the form after submission
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <Container>
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
                <Button type="submit">Registrar</Button>
            </Form>
        </Container>
    );
};

export default SignUpForm;