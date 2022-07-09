const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000
  
    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse()
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000
      localStorage.setItem('authToken', newAuthRes.id_token)
      setTimeout(refreshToken, refreshTiming)
    }
  
    setTimeout(refreshToken, refreshTiming)
  }

const google_login = async (res) => {
  let respostaLogin = false
  const token = res.tokenObj.id_token
  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
  await fetch(process.env.REACT_APP_BACKEND + 'usuario/', reqOptions)
    .then(response => {
      console.log(response)
      if (response.ok) {
        localStorage.setItem('auth-token', res.tokenObj.id_token)
        refreshTokenSetup(res)
        respostaLogin = true
      } else alert(res.statusText)
      return response.json()
    })
    .then(data => {
      console.log(data)
      localStorage.setItem('img-perfil', data.foto_perfil)
      localStorage.setItem('access-level', data.nivel_acesso)
    })
    .catch(err => alert(err))
  return respostaLogin
}

export default google_login