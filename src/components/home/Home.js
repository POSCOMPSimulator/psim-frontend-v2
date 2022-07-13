import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Home() {

    let navigate = useNavigate()

    useEffect(() => {
        navigate('/sobre')
    })

}

export default Home