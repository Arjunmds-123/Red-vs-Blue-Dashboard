import { useStore } from "../store/state";

export const UserList = () => {
    const { state, dispatch } = useStore();
    const users = state.users.filter(u =>
        state.filter.toLowerCase() === 'all' ? true : u.team === state.filter.toLowerCase()
    );
    
    function openUser(user) {
        console.log('Clicked user:', user.id);
        dispatch({ type: 'SET_SELECTED_USER', userId: user.id });
    }

    return (
        <div className="users" aria-label="Users List">
            <div className="tblHeader">
                <div>Name</div>
                <div>Team</div>
                <div>Role</div>
                <div>Last Action</div>
                <div>Contribution</div>
            </div>
            <div className="tblBody">
                {users.map(user => (
                    <button
                        key={user.id}
                        className={`row ${user.team}`}
                        onClick={() => openUser(user)}
                        aria-label={`Open ${user.name}'s profile`}
                    >
                        <div className="cell name"><strong>{ user.name}</strong></div>
                        <div className="cell team">{ user.team === 'red' ?'Red':'Blue'}</div>
                        <div className="cell role">{user.role}</div>
                        <div className="cell last">{user.lastAction}</div>
                        <div className="cell contrib">{user.scoreContribution}</div>
                    </button>
                ))}
            </div>
        </div>
    );
 }