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

const VerifyForm = (props) => {
    let navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVCChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setLoading(true)

        // Perform further processing or API call for signing up
        usuarioAPI.verificar({
            "codigo_verificacao": verificationCode,
        })
        .then((response) => {
            localStorage.setItem('verificado', 'true')
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
        setVerificationCode('');
    };

    return (
        <Container>
            <SemanticToastContainer position="top-right" />
            <Header as='h2' textAlign='center'>Entre no PSIM</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Código de verificação:</label>
                    <Input
                        type="text"
                        value={verificationCode}
                        onChange={handleVCChange}
                        required
                    />
                </Form.Field>
                <Button type="submit" loading={loading}>Verificar</Button>
            </Form>
        </Container>
    );
};

export default VerifyForm;