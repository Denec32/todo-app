
import { cookieApi } from '../../repositories/cookieApi';
import { taskApi } from '../../repositories/taskApi';
import IconButton from '../IconButton/IconButton';
import './UserMenu.css'

type UserMenuProps = {
    signOut: () => void
}

function UserMenu(props: UserMenuProps) {

    function deleteAllTasks() {
        taskApi.deleteTasks();
    }

    function signOut() {
        cookieApi.deleteJwt();
        props.signOut();
    }

    return (
        <div className='user-menu'>
            <IconButton icon='https://img.icons8.com/?size=100&id=0usvdWDP5ewm&format=png&color=FFFFFF' text='Clear tasks' onClick={deleteAllTasks} />
            <IconButton icon='https://img.icons8.com/?size=100&id=26215&format=png&color=FFFFFF' text='Sign out' onClick={signOut} />
        </div>
    );
}

export default UserMenu