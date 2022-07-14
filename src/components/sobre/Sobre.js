import styled from "styled-components";

const SobreContainer = styled.div`
    padding: 15px 7rem 20px 7rem;
    text-align: justify;
`;

function Sobre() {

    return (
        <SobreContainer>
            <h2>Sobre o POSCOMP Simulator</h2>
            <p>
                O Exame Nacional para Ingresso na Pós-Graduação em Computação
                (POSCOMP) é um exame elaborado pela Sociedade Brasileira de Computação (SBC)
                e aplicado em todas as regiões do país, desde 2006. O exame avalia o conhecimento
                em áreas da Computação e é utilizado como critério de seleção em muitos programas
                de pós-graduação em Computação no país, permitindo que estudantes possam
                concorrer em programas de pós-graduação distantes de sua residência sem a
                necessidade de se locomover para outra cidade ou estado para fazer uma avaliação.
            </p>

            <p>
                Atualmente, a forma de acesso às questões antigas

                do exame é através dos PDFs das provas.

                Sendo assim, os estudantes que estão se preparando
                para o exame não conseguem, de uma maneira rápida,
                realizar um simulado personalizado para a prova ou
                consultar as questões anteriores de forma organizada, por
                exemplo, visualizando as questões anteriores de uma
                determinada área de conhecimento em Computação.
            </p>
            <p>
                Tal problema faz com que o estudante, que deseje realizar
                um simulado para o exame, fique restrito a utilizar as
                provas anteriores de maneira bruta, ou gastar tempo
                separando por si mesmo as questões que pretende
                realizar. O mesmo acontece com consultas a questões,
                por exemplo, se ele deseja visualizar todas as questões de
                uma dada área, ele terá que passar por todas as provas
                uma a uma.
            </p>

            <p><b>
                Dessa forma, o POSCOMP Simulator (carinhosamente, PSIM) surge como uma aplicação Web que permite que um estudante consulte questões, realize simulados e avalie sua evolução ao longo dos simulados.
            </b></p>

            <h2>Equipe desenvolvedora</h2>

            <p>
                O PSIM foi desenvolvido como um projeto para a disciplina Engenharia de Software do Bacharelado em Ciência da Computação da Universidade Federal de Campina Grande (UFCG).
                Participaram do desenvolvimento da primeira versão:

                <ul>

                    <li>
                        <b>Gerente Geral:</b> <a href='https://github.com/issilva5' target='_blank' rel="noreferrer">Ítallo de Sousa Silva</a>.
                    </li>
                    <li>
                        <b>Backend:</b> <a href='https://github.com/thiagoyeds' target='_blank' rel="noreferrer">Thiago Yuri</a> (Gerente), <a href='https://github.com/carolvalenca' target='_blank' rel="noreferrer">Caroliny Valença</a>, <a href='https://github.com/gabryellesoares' target='_blank' rel="noreferrer">Gabryelle Soares</a>, <a href='https://github.com/Gabriel-de-Carvalho' target='_blank' rel="noreferrer">Gabriel de Carvalho Fonseca</a>.
                    </li>
                    <li>
                        <b>Frontend:</b> <a href='https://github.com/gabialverga' target='_blank' rel="noreferrer">Gabriela Alverga</a> (Gerente), <a href='https://github.com/thiagondl' target='_blank' rel="noreferrer">Thiago Lima</a>, <a href='https://github.com/wineone' target='_blank' rel="noreferrer">Mateus Lisboa</a>, <a href='https://github.com/rafaela-amorim' target='_blank' rel="noreferrer">Rafaela Amorim</a>.

                    </li>
                    <li>
                        <b>Verificação e Validação:</b> <a href='https://github.com/GustavoGCC' target='_blank' rel="noreferrer">Gustavo Campos</a> (Gerente), <a href='https://github.com/pereiraIgor' target='_blank' rel="noreferrer">Igor Pereira</a>, <a href='https://github.com/IgorSilveira7' target='_blank' rel="noreferrer">Igor Silveira de Andrade</a>, <a href='https://github.com/mateustranquilino' target='_blank' rel="noreferrer">Mateus Alves Tranquilino</a>.

                    </li>
                </ul>

                <p>
                    Os contribuidores da versão atual podem ser vistos nos respectivos repositórios do <a href='https://github.com/ES-Group-2/psim-backend-go' target='_blank' rel="noreferrer">Backend</a> e <a href='https://github.com/ES-Group-2/psim-frontend-v2' target='_blank' rel="noreferrer">Frontend</a>.
                </p>

            </p>

            <h2>Reportando um problema</h2>

            <p>
                Esta é uma versão <i>alpha</i> do PSIM e portanto é muito importante recebermos feedback sobre erros encontrados pelos usuários.
                Caso tenha encontrado um erro e deseje reportá-lo, clique <a href="https://forms.gle/g81U9Fnqjmj422G6A" target='_blank' rel="noreferrer">aqui</a>.
            </p>

        </SobreContainer>
    )

}

export default Sobre