import { useState } from 'react'
import './LoginWindow.css'

function LoginWindow() {
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
    }

    return (
        <div className='login-window'>
            <input placeholder='username' value={username} onChange={handleUsernameChange}></input>
            <input placeholder='password' value={password} onChange={handlePasswordChange}></input>
            <button onClick={handleSignInSubmit}>Sign in</button>
        </div>
    )
}

export default LoginWindow