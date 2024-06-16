import { useEffect, useRef, useState } from 'react';
import './RegisterWindow.css'

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
    const [confirmPassword, setConfirmPassword] = useState<string>('');

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
        setConfirmPassword(event.target.value);
    }

    function handleSignUpSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        props.hideWindow();
    }

    return (
        <>
            <div className='register-backdrop'></div>
            <div className='register-window' ref={windowRef}>
                <div className='register-window-content'>
                    <input className='register-input' placeholder='Username' value={username} onChange={handleUsernameChange}></input>
                    <input className='register-input' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                    <input className='register-input' placeholder='Confirm password' value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                    <button className='register-button' onClick={handleSignUpSubmit}>Sign Up</button>
                    <h1>Have an account?</h1><a>Sign in</a>
                </div>
            </div>
        </>
    )
}

export default RegisterWindow;