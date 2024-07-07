import React, { useState } from 'react';
import { InlineTex } from 'react-tex';
import { Label, Modal, Image, List, Button, Container } from 'semantic-ui-react'
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import styled from 'styled-components';

const Enunciado = styled(Modal.Content)`
	text-align: justify !important;
	font-size: 1.1rem !important;
	max-height: calc(35vh) !important;
	transform: translateZ(0);
`;

const Alternativa = styled(List.Item)`
	color: black !important;
	cursor: default !important;
	margin: 2px 2px;
	height: fit-content;
`;

const Resposta = styled(Alternativa)`
	font-weight: bold !important;
	background-color: rgb(111, 221, 111) !important;
`;

const ExplicacaoScroll = styled.div`
	padding: 5px;
	margin: 10px;
	border-radius: 10px;
	overflow: hidden !important;
	background-color: #fdfdfd !important;
`

const Explicacao = styled(Container)`
	text-align: justify !important;
	font-size: 1.1rem !important;
	max-height: calc(35vh) !important;
	transform: translateZ(0);
	font-weight: normal !important;
	overflow-y: auto !important;
`;

function Questao({ questao }) {
	const [stateResp, setResposta] = useState("");

	function getEnunciado() {

		return (
			questao.enunciado.map((enun, ind_e) =>
				<p key={ind_e}><InlineTex texContent={enun} /></p>
			)
		)

	}

	function getImagensEnunciado() {
		return (
			questao.imagens.enunciado.map((imgs, ind) =>
				<Image wrapped size='large' src={"https://raw.githubusercontent.com/ES-Group-2/questoes_poscomp/main/" + imgs + ".png"} key={ind}></Image>
			)
		)
	}

	function getAlternativas() {

		const letras = ['A. ', 'B. ', 'C. ', 'D. ', 'E. ']

		return (
			<List selection size='large'>
				{questao.alternativas.map(
					(resp, ind) => {
						return ind === questao.resposta && stateResp ?
						<Resposta key={ind}>
							<List.Content>
								<span><b>{letras[ind]}</b></span>
								<InlineTex texContent={resp} />
							</List.Content>
							{
								questao.explicacao.String !== '' ? 
								<ExplicacaoScroll><Explicacao>
									{/* <InlineTex texContent={`Hello $$\\\\[3pt]$$ World`} /> */}
									<InlineTex texContent={questao.explicacao.String} />
								</Explicacao></ExplicacaoScroll> :
								<></>
							}
						</Resposta> :
						<Alternativa key={ind}>
							<List.Content>
								<span><b>{letras[ind]}</b></span>
								<InlineTex texContent={resp} />
							</List.Content>
						</Alternativa>
					}
				)}
			</List>
		)
	}

	return (
		<>
			<Modal.Header>
				<Label.Group size='large'>
					<Label>Ano: {questao.ano}</Label>
					<Label>Questão: {questao.numero}</Label>
					<Label>Área: {questao.area}</Label>
					<Label>Subárea: {questao.subarea || 'não informada'}</Label>
				</Label.Group>
			</Modal.Header>
			<Enunciado scrolling>
				{getEnunciado()}
				{getImagensEnunciado()}
			</Enunciado>
			<Modal.Content>
				{getAlternativas()}
			</Modal.Content>
			<Modal.Actions>
				
				<Button
					content={stateResp ? "Ocultar resposta" : "Mostrar resposta"}
					labelPosition='left'
					icon={stateResp ? 'close' : 'checkmark'}
					onClick={() => (stateResp === "" ? setResposta("resposta") : setResposta(""))}
					color={stateResp ? 'red' : 'green'}
				/>

			</Modal.Actions>
		</>
	)
}

export default Questao;