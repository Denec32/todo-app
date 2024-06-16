import { useEffect, useRef, useState } from 'react';
import './AuthenticationWindow.css'
import { authApi } from '../../repositories/authApi';

type RegisterWindowProps = {
    setLoggedIn: (value: boolean) => void; 
    isWindowVisible: boolean;
    hideWindow: () => void;
}

function RegisterWindow(props: RegisterWindowProps) {
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
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setUsername(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setPasswordConfirmation(event.target.value);
    }

    function handleSignUpSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        authApi.register({username, password, passwordConfirmation})
        .then((token) => {
            if (token) props.setLoggedIn(true);
        })
        props.hideWindow();
    }

    return (
        <>
            <div className='modal-backdrop'></div>
            <div className='modal-window' ref={windowRef}>
                <div className='modal-content'>
                    <input className='modal-input' placeholder='Username' value={username} onChange={handleUsernameChange}></input>
                    <input className='modal-input' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                    <input className='modal-input' placeholder='Confirm password' value={passwordConfirmation} onChange={handleConfirmPasswordChange}></input>
                    <button className='modal-button' onClick={handleSignUpSubmit}>Sign Up</button>
                    <h1>Have an account? <a>Sign in</a></h1>
                </div>
            </div>
        </>
    )
}

export default RegisterWindow;