import { useRef, useState } from 'react'
import './AuthenticationWindow.css'
import { authApi } from '../../repositories/authApi';
import useOutsideAlerter from '../../hooks/useOutsideAlert';

type LoginWindowProps = {
    setLoggedIn: (value: boolean) => void
    isWindowVisible: boolean;
    hideWindow: () => void;
    switchToRegisterWindow: () => void;
}

function LoginWindow(props: LoginWindowProps) {
    const windowRef = useRef<HTMLDivElement>(null);

    useOutsideAlerter(windowRef, props.hideWindow);

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
            if (token) props.setLoggedIn(true);
        });
        props.hideWindow();
    }

    return (
        <>
            <div className='modal-backdrop'></div>
            <div className='modal-window' ref={windowRef}>
                    <div className='modal-content'>
                    <input className='modal-input' placeholder='Username' value={username} onChange={handleUsernameChange}></input>
                    <input className='modal-input' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                    <button className='modal-button' onClick={handleSignInSubmit}>Sign In</button>
                    <h1><a className='switch-modal' onClick={props.switchToRegisterWindow}>Sign Up</a></h1>
                </div>
            </div>
        </>
    )
}

export default LoginWindow