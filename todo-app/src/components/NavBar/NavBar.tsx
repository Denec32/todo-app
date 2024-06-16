import { useState } from 'react';
import LoginWindow from '../Authentication/LoginWindow';
import './NavBar.css'
import { cookieApi } from '../../repositories/cookieApi';
import { authApi } from '../../repositories/authApi';
import RegisterWindow from '../Authentication/RegisterWindow';

type NavBarProps = {
    isLoggedIn: boolean
    setLoggedIn: (value: boolean) => void
}

function NavBar(props: NavBarProps) {
    const [showLoginWindow, setShowLoginWindow] = useState<boolean>(false);

    const [showRegisterWindow, setShowRegisterWindow] = useState<boolean>(false);

    function handleSignOutClick() {
        cookieApi.deleteJwt();
        props.setLoggedIn(false);
    }

    let rightContent;

    if (props.isLoggedIn) {
        rightContent = <>
            <a className="navbar-item">{authApi.getUsername()}</a>
            <a className="navbar-item" onClick={handleSignOutClick}>Sign out</a>
        </>
    } else {
        rightContent = <>
            <a className="navbar-item" onClick={() => setShowRegisterWindow(true)}>Register</a>
            <a className="navbar-item" onClick={() => setShowLoginWindow(true)}>Sign in</a>
        </>
    }

    return (
        <>
            {showLoginWindow && 
                <LoginWindow setLoggedIn={props.setLoggedIn} isWindowVisible={showLoginWindow} hideWindow={() => setShowLoginWindow(false)}/>
            }
            {showRegisterWindow && 
                <RegisterWindow setLoggedIn={props.setLoggedIn} isWindowVisible={showRegisterWindow} hideWindow={() => setShowRegisterWindow(false)} />
            }
            <div className="navbar">
                <a className="navbar-item">silly todolist</a>
                <div className='navbar-right'>{rightContent}</div>
            </div>
        </>
    )
}

export default NavBar;