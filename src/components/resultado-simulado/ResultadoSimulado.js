import { useParams } from 'react-router-dom'

function ResultadoSimulado() {

    let { id } = useParams()

    return (
        <h1>Simulado {id}</h1>
    )

}

export default ResultadoSimulado