import React, { useEffect, useState } from 'react';
import { InlineTex } from 'react-tex';
import { Modal, Image, List, Radio } from 'semantic-ui-react'
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import styled from 'styled-components';

const Enunciado = styled(Modal.Content)`
	text-align: justify !important;
	font-size: 1.1rem !important;
	max-height: calc(35vh) !important;
	overflow-y: auto !important;
`;

const Alternativa = styled(List.Item)`
	color: black !important;
	cursor: default !important;
	margin: 2px 2px;
	height: fit-content;
`;

const QuestaoContainer = styled.div`
	padding: 15px 7rem 20px 7rem;
`;

const CustomRadio = styled(Radio)`
	margin-right: 10px;
`;

function Questao({ questao, updater }) {
	const [resposta, setResposta] = useState(null);

	useEffect(() => {setResposta(questao.resposta)}, [questao.resposta])

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

		return (
			<List selection size='large'>
				{questao.alternativas.map(
					(resp, ind) => {
						return (
							<Alternativa key={ind}>
								<List.Content>
									<CustomRadio value={ind} checked={resposta === ind} onChange={(_, { value }) => {
										setResposta(value)
										questao.resposta = value
										updater(questao.index, questao)
									}} />
									<InlineTex texContent={resp} />
								</List.Content>
							</Alternativa>
						)
					}
				)}
			</List>
		)
	}

	return (
		<QuestaoContainer>
			<Enunciado scrolling>
				{getEnunciado()}
				{getImagensEnunciado()}
			</Enunciado>
			{getAlternativas()}
		</QuestaoContainer>
	)
}

export default Questao;