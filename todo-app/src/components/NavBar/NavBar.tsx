import { useState } from 'react';
import LoginWindow from '../Authentication/LoginWindow';
import './NavBar.css'
import { authApi } from '../../repositories/authApi';
import RegisterWindow from '../Authentication/RegisterWindow';
import UserMenu from '../UserMenu/UserMenu';

type NavBarProps = {
    isLoggedIn: boolean
    setLoggedIn: (value: boolean) => void
    clearTasks: () => void
}

function NavBar(props: NavBarProps) {
    const [showLoginWindow, setShowLoginWindow] = useState<boolean>(false);

    const [showRegisterWindow, setShowRegisterWindow] = useState<boolean>(false);

    const [showUserMenu, setShowUserMenu] = useState<boolean>(false);

    function switchAuthorizationWindow() {
        if (showLoginWindow) {
            setShowLoginWindow(false);
            setShowRegisterWindow(true);
        } else {
            setShowLoginWindow(true);
            setShowRegisterWindow(false);
        }
    }

    let rightContent;

    if (props.isLoggedIn) {
        rightContent = <>
            <a className="navbar-item" onClick={() => setShowUserMenu(true)}>{authApi.getUsername()}</a>
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
                <LoginWindow setLoggedIn={props.setLoggedIn} isWindowVisible={showLoginWindow} hideWindow={() => setShowLoginWindow(false)} switchToRegisterWindow={switchAuthorizationWindow}/>
            }
            {showRegisterWindow && 
                <RegisterWindow setLoggedIn={props.setLoggedIn} isWindowVisible={showRegisterWindow} hideWindow={() => setShowRegisterWindow(false)} switchToLoginWindow={switchAuthorizationWindow}/>
            }
            {showUserMenu &&
                <UserMenu signOut={() => props.setLoggedIn(false)} clearTasks={() => props.clearTasks()} isWindowVisible={showUserMenu} hideWindow={() => setShowUserMenu(false)} />
            }
            <div className="navbar">
                <a className="navbar-item">silly todolist</a>
                <div className='navbar-right'>{rightContent}</div>
            </div>
        </>
    )
}

export default NavBar;