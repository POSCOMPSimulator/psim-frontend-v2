import GoogleLogin from "react-google-login"
import { Menu } from 'semantic-ui-react'
import google_login from "./google_login"

function Login(props) {

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => (
                <Menu.Item onClick={renderProps.onClick}>
                    Entrar
                </Menu.Item>
            )}
            onSuccess={(res) => {
                google_login(res).then(() => {
                    props.sucessful_login(localStorage.getItem('auth-token'))
                    console.log('[Login Successfull]')
                })
            }}
        />
    )

}

export default Login