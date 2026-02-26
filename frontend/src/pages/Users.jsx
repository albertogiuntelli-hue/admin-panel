import { useEffect, useState } from "react";
import { getUsers } from "../api/users";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(res => setUsers(res.data));
    }, []);

    return (
        <>
            <h1>Users</h1>
            <ul>
                {users.map(u => (
                    <li key={u.id}>{u.name} - {u.email}</li>
                ))}
            </ul>
        </>
    );
};

export default Users;
