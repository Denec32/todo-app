
import { useRef } from 'react';
import { cookieApi } from '../../repositories/cookieApi';
import { taskApi } from '../../repositories/taskApi';
import IconButton from '../IconButton/IconButton';
import './UserMenu.css'
import useOutsideAlerter from '../../hooks/useOutsideAlert';

type UserMenuProps = {
    signOut: () => void
    clearTasks: () => void
    isWindowVisible: boolean;
    hideWindow: () => void;
}

function UserMenu(props: UserMenuProps) {
    const windowRef = useRef<HTMLDivElement>(null);

    useOutsideAlerter(windowRef, () => props.hideWindow());

    function deleteAllTasks() {
        taskApi.deleteTasks();
        props.clearTasks();
        props.hideWindow();
    }

    function signOut() {
        cookieApi.deleteJwt();
        props.signOut();
        props.hideWindow();
    }

    return (
        <div className='user-menu' ref={windowRef}>
            <IconButton icon='https://img.icons8.com/?size=100&id=0usvdWDP5ewm&format=png&color=FFFFFF' text='Clear tasks' onClick={deleteAllTasks} />
            <IconButton icon='https://img.icons8.com/?size=100&id=26215&format=png&color=FFFFFF' text='Sign out' onClick={signOut} />
        </div>
    );
}

export default UserMenu