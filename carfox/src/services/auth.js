export const parseJwt = () => {
    let base64 = localStorage.getItem('jwt').split('.')[1]
    let tokenDecode = JSON.parse(window.atob(base64))

    console.log(tokenDecode)
    return tokenDecode
}

export const usuarioAutenticado = () => localStorage.getItem('jwt') !== null