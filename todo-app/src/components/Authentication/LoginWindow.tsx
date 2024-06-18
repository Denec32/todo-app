import { useEffect, useRef, useState } from 'react'
import './AuthenticationWindow.css'
import { authApi } from '../../repositories/authApi';

type LoginWindowProps = {
    setLoggedIn: (value: boolean) => void
    isWindowVisible: boolean;
    hideWindow: () => void;
    switchToRegisterWindow: () => void;
}

function LoginWindow(props: LoginWindowProps) {
    useEffect(() => {
        if (props.isWindowVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [props.isWindowVisible]);

    const windowRef = useRef<HTMLDivElement>(null);

    function handleClickOutside(ev: MouseEvent) {
        if (windowRef.current && ev.target instanceof Element && !windowRef.current.contains(ev.target)) {
            props.hideWindow();
        }
    }

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
                    <h1><a onClick={props.switchToRegisterWindow}>Sign Up</a></h1>
                </div>
            </div>
        </>
    )
}

export default LoginWindow