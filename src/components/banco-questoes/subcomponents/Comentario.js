import React, { useEffect, useState } from 'react';
import { InlineTex } from 'react-tex';
import { Button, Header, Comment, Form, Loader, Segment } from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts';
import styled from 'styled-components';
import { comentarioAPI } from '../../../network/apiClient';

const CommentGroup = styled(Comment.Group)`
    min-width: 350px !important;
`;

const CommentList = styled.div`
    overflow: auto !important;
    max-height: 200px !important;
`;

const CommentText = styled.textarea`
    margin-bottom: 14px  !important;
    max-height: 60px  !important;
    resize: none !important;
`;

function Comentario(props) {

    const [comentarios, setComentarios] = useState([])
    const [esperando, setEsperando] = useState(true)
    const [previewOn, setPreviewOn] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [publicando, setPublicando] = useState(false)

    function getComentarios() {

        comentarioAPI.listarComentariosQuestao(props.qid)
            .then((resp) => {
                setComentarios(resp.data.comentarios)
                setEsperando(false)
            }).catch((error) => {
                console.log(error)
            })
            
    }

    useEffect(getComentarios, [props.qid])

    function formatDate(date) {

        const msPorDia = 86400000

        let hoje = new Date()
        let ndias = (hoje - date) / msPorDia

        let datetext

        if (ndias < 1) {
            datetext = 'Hoje às ' + date.getHours() + ':' + date.getMinutes()
        } else if (ndias < 31) {
            datetext = 'Há ' + parseInt(ndias) + ' dias'
        } else if (ndias < 365) {
            datetext = 'Há menos de um ano'
        } else {
            datetext = 'Há muito tempo'
        }

        return datetext

    }

    function renderComentarios() {

        const uemail = localStorage.getItem('user-email')
        const univel = parseInt(localStorage.getItem('access-level'))

        if (esperando) return (<></>)

        if (comentarios.length === 0) return (<span>Nenhum comentário encontrado.</span>)

        return comentarios.map((c, i) => {
            return (
                <Comment key={i}>
                    <Comment.Avatar src={c.foto_perfil} />
                    <Comment.Content>
                        <Comment.Author as='span'>{c.autor}</Comment.Author>
                        <Comment.Metadata>
                            <div>{formatDate(new Date(c.data_publicacao))}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <InlineTex texContent={c.texto} />
                        </Comment.Text>
                        <Comment.Actions>
                            {univel > 0 || uemail === c.autor_id ? <Comment.Action onClick={() => deleteComment(c.id)}>Excluir</Comment.Action> : <></>}
                            <Comment.Action onClick={() => reportComment(c.id)}>Reportar</Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            )
        })
    }

    function renderTextArea() {

        if (previewOn) {
            return (
                <Segment>
                    <InlineTex texContent={commentText} />
                </Segment>
            )
        } else {
            return (
                <Form reply>
                    <CommentText
                        onChange={(e) => setCommentText(e.target.value)} value={commentText}
                        placeholder='Insira aqui seu comentário, para usar LATEX coloque o código entre $$ e use \\'
                    />
                </Form>
            )
        }

    }

    function publishComment() {

        setPublicando(true)

        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ texto: commentText, data_publicacao: (new Date()).toISOString() })
        }

        fetch(process.env.REACT_APP_BACKEND + 'comentario/questao/' + props.qid + '/', reqOptions)
            .then((resp) => {
                if (resp.ok) {
                    setPublicando(false)
                    setCommentText('')
                    getComentarios()
                } else {
                    console.log('Algo deu errado.')
                    console.log(resp)
                }
            }).catch((error) => {
                console.log(error)
            })

    }

    function deleteComment(id) {

        const reqOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            }
        }

        fetch(process.env.REACT_APP_BACKEND + 'comentario/' + id + '/', reqOptions)
            .then((resp) => {
                if (resp.ok) {
                    toast({
                        title: 'Comentário excluído com sucesso!',
                        icon: 'check',
                        color: 'green'
                    })
                    getComentarios()
                } else {
                    console.log('Algo deu errado.')
                    console.log(resp)
                }
            }).catch((error) => {
                console.log(error)
            })

    }

    function reportComment(id) {

        const reqOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(process.env.REACT_APP_BACKEND + 'comentario/' + id + '/', reqOptions)
            .then((resp) => {
                if (resp.ok) {
                    toast({
                        title: 'Comentário reportado com sucesso!',
                        icon: 'check',
                        color: 'green',
                        description: <p>Nossos moderadores analisarão o comentário assim que possível.</p>
                    })
                } else {
                    console.log('Algo deu errado.')
                    console.log(resp)
                }
            }).catch((error) => {
                console.log(error)
            })

    }

    return (
        <>
            <CommentGroup minimal>
                <Header as='h3' dividing>
                    Comentários
                </Header>
                <CommentList>
                    <Loader inline='centered' active={esperando} size='big'>Carregando</Loader>
                    {renderComentarios()}
                </CommentList>

                {localStorage.getItem('auth-token') ?
                    <>
                        {renderTextArea()}

                        < div >
                            <Button content={previewOn ? 'Editar' : 'Pré-visualizar'} primary className='fl' onClick={() => {
                                let previewR = !previewOn
                                setPreviewOn(previewR)
                            }} disabled={commentText === ""} />
                            <Button
                                content='Publicar'
                                primary
                                className='fr'
                                disabled={commentText === "" || publicando}
                                onClick={publishComment}
                            />
                        </div>
                    </>
                    :
                    <></>
                }
            </CommentGroup>
        </>
    )

}

export default Comentario;