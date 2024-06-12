import { useState } from 'react'
import './LoginWindow.css'
import { authApi } from '../../repositories/authApi';

type LoginWindowProps = {
    setLoggedIn: (value: boolean) => void
}

function LoginWindow(props: LoginWindowProps) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setUsername(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setPassword(event.target.value);
    }

    function handleSignInSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        authApi.login({ username, password })
        .then((token) => {
            if (token) props.setLoggedIn(true)
        });
    }

    return (
        <div className='login-window'>
            <input className='login-input' placeholder='username' value={username} onChange={handleUsernameChange}></input>
            <input className='login-input' placeholder='password' value={password} onChange={handlePasswordChange}></input>
            <button onClick={handleSignInSubmit}>Sign in</button>
        </div>
    )
}

export default LoginWindow