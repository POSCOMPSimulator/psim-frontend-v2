import { useParams } from 'react-router-dom'

function AmbienteSimulacao() {

    let { id } = useParams()

    return (
        <h1>Simulado {id}</h1>
    )

}

export default AmbienteSimulacao