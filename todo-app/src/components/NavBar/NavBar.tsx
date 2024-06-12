import { useState } from 'react';
import LoginWindow from '../LoginWindow/LoginWindow';
import './NavBar.css'
import { cookieApi } from '../../repositories/cookieApi';

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

    let content;

    if (props.isLoggedIn) {
        content = <>
            <li className="navbar-item"><a>Your username</a></li>
            <li className="navbar-item"><a onClick={handleSignOutClick}>Sign out</a></li>
        </>
    } else {
        content = <>
            <li className="navbar-item"><a>Register</a></li>
            <li className="navbar-item"><a onClick={handleSignInClick}>Sign in</a></li>
        </>
    }

    return (
        <>
            {showLoginWindow && <LoginWindow setLoggedIn={props.setLoggedIn}/>}
            <ul className="navbar">
                {content}
            </ul>
        </>
    )
}

export default NavBar;