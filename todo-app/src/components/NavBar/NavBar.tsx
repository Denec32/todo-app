import { useState } from 'react';
import LoginWindow from '../LoginWindow/LoginWindow';
import './NavBar.css'
import { cookieApi } from '../../repositories/cookieApi';
import { authApi } from '../../repositories/authApi';

type NavBarProps = {
    isLoggedIn: boolean
    setLoggedIn: (value: boolean) => void
}

function NavBar(props: NavBarProps) {
    const [showLoginWindow, setShowLoginWindow] = useState<boolean>(false);

    function handleSignInClick() {
        setShowLoginWindow(!showLoginWindow);
    }

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
            <a className="navbar-item">Register</a>
            <a className="navbar-item" onClick={handleSignInClick}>Sign in</a>
        </>
    }

    return (
        <>
            {showLoginWindow && <LoginWindow setLoggedIn={props.setLoggedIn}/>}
            <div className="navbar">
                <a className="navbar-item">silly todolist</a>
                <div className='navbar-right'>{rightContent}</div>
            </div>
        </>
    )
}

export default NavBar;