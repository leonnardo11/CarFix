import React, { Component } from 'react'
import api from '../../services/api'
import { parseJwt } from '../../services/auth';
import "../login/login.css";
import image from '../../assets/img/login.png'
import swal from 'sweetalert';



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                senha: ""
            },

            isLoading: false
        }
    }

    funcaoLogin = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true })

        api.post('/Login', {
            email: this.state.user.email,
            senha: this.state.user.senha
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    this.setState({ isLoading: false })
                    localStorage.setItem("jwt", resposta.data.token)

                    if(parseJwt().role === "1"){
                        this.props.history.push('/carros')
                    }
                    else{
                        swal("Ocorreu um erro!", "Usuário ou senha incorretos. Tente novamente", "error")
                        this.props.history.push('/')
                    }
                }
            })
            .catch((erro) => swal("Ocorreu um erro :(", `${erro}`, "error"));
    }

    updateState = (campo) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [campo.target.name]: campo.target.value
            }
        }))
    }

    componentDidMount() {
      document.title = "CarFix Login";
    }

  render() {
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
        <link rel="stylesheet" href="css/style.css" />
        <main className="main-login">
          <div className="container-login">
            <form onSubmit={this.funcaoLogin}>
             

            <div>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link rel="icon" type="image/icon" href="assets/carroLogo.ico" />
        <link href="css/login.css" rel="stylesheet" />
        <div className="title"><h2>Bem vindo de volta!</h2>
        </div>
        <div className="subtitle">Insira suas credencias de login para entrar<p>no sistema.</p></div>
        <div className="email">
          <input className="email2" type="email" name="email" size={77} placeholder=" Email:" required /> 
        </div>
        <div className="password">
          <input className="password2 " type="password" name="password" size={77} placeholder=" Senha:" required /> 
        </div>
        <div className="button">
          <input className="button2" type="submit" name="button" defaultValue="Entrar" /> 
        </div>
        <div className="forgotPassword">
          <p>Esqueceu a Senha?</p>
        </div>
        <div className="register"> 
          <p>Você não tem uma conta? <a style={{textDecoration: 'none'}} href="#">Registre-se!</a></p>
        </div>
        <img class="img" src={image} />
      </div>
            </form>
          </div>
        </main>
      </div>
    );
  }
}

