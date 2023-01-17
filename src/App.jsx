import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// Desabilite o botão de Login equanto você está executando o login.
// Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [mensage, setMensage] = useState(null);

  const HandleOnChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      const newData = {...prev, [name]: value}

      return newData
    })
  }

  const HandleLogin = () => {
    setIsLoading(true);
    setMensage(null);

    login(data)
      .then(() => {
        alert("Login realizado com sucesso")
    }).catch((error) => {
      setMensage(error.message);
    }).finally(() => {
      setIsLoading(false)
    });
  }

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {mensage && <div className='errorMessage'>{mensage}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input
            name='email'
            id={'email'} 
            type={'email'} 
            autoComplete='off'
            value={data.email}
            onChange={HandleOnChange}
          />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input
            name='password'
            id={'password'} 
            type={'password'}
            value={data.password}
            onChange={HandleOnChange}
          />
        </div>

        <div className='button'>
           <button 
            disabled={isLoading || data.password.length < 6 || data.email === "" }
            onClick={HandleLogin}
           >
            Login</button>
        </div>
      </div>
    </div>
  );
}
