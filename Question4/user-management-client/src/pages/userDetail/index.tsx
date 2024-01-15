import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import UserData from '../model/userData';
import User from '../model/user';

interface UserDetailProps {
    id: number; // Add the id prop
}

const UserDetail: React.FC<UserDetailProps> = ({ id }) => {
    const router = useRouter();
    const [operation, setOperation] = useState("");
    const [actionButtonText, setActionButtonText] = useState<string>('Update');

    const [user, setUser] = useState<User | null>(null);

    const [userData, setUserData] = useState<UserData>({
        firstname: "",
        lastname: "",
        email: ""
    });


    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/users/${id}`);
                    const data: User = await response.json();
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };

            fetchUser();
        }

        if (operation) {
            setActionButtonText(operation === 'New' ? 'Create' : (operation === 'Edit' ? 'Update' : 'Delete'));
        }
    }, [ operation]);


    const handleAction = async (userData: UserData) => {
        try {
            const url = operation === 'New' ? 'api/users/' : `api/user-update/${id}`;
            const method1 = operation === 'New' ? 'POST' : 'PUT';

            let method;
            if(operation === 'New'){
                method = 'POST';
            } else if(operation === 'Edit'){
                method = 'PUT';
            } else if(operation === 'Delete') {
                method = 'DELETE';
            }
    
            let response;
    
            if (method === 'POST' || method === 'PUT') {
                response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
            } else{
                response = await fetch(`api/user-delete/${id}`, {
                    method: 'DELETE',
                });
            }
    
            if (response.ok) {
                if (operation === 'New') {
                    // Clear input fields and update the state for 'New' operation
                    setUserData({
                        firstname:"",
                        lastname:"",
                        email:""
                    })
                }
    
                console.log(`User ${operation === 'New' ? 'created' : 'updated'} successfully.`);
            } else {
                console.error(`Failed to ${operation === 'New' ? 'create' : 'update'} user.`);
            }
        } catch (error) {
            console.error(`Error ${operation === 'New' ? 'creating' : 'updating'} user:`, error);
        }
    };
    

    return (
        <div>
            {operation !== 'New' ?
                <>
                    {user ? (
                        <>
                            <h1>User Details</h1>

                            <div className='flex'>
                                <form className='flex'>
                                    <label htmlFor="operation" >Select operation</label>
                                    <select id="operation"
                                        onChange={(e) => setOperation(e.target.value)}
                                    >
                                        <option>Edit</option>
                                        <option>New</option>
                                        <option>Delete</option>
                                    </select>

                                    <label htmlFor="id">
                                        Id
                                        <input
                                            type="text"
                                            value={user.id}
                                            readOnly />
                                    </label>

                                    <label htmlFor="firstname">
                                        First Name:
                                        <input
                                            type="text"
                                            value={user.firstname}
                                            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                                            required />
                                    </label>

                                    <label htmlFor="lastname">
                                        Last Name:
                                        <input
                                            type="text"
                                            value={user.lastname}
                                            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                                            required />
                                    </label>
                                    <label htmlFor="email">
                                        Email:
                                        <input
                                            type="text"
                                            value={user.email}
                                            id="email"
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                            required />
                                    </label>

                                    <button onClick={() => handleAction(user)}>{actionButtonText}</button>
                                    <button onClick={() => router.back()}>Back</button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </> :
                <>
                    <h1>User Details</h1>

                    <div className='flex'>
                        <form className='flex'>
                            <label htmlFor="operation" >Select operation</label>
                            <select id="operation"
                                onChange={(e) => setOperation(e.target.value)}
                            >
                                <option>New</option>
                                <option>Edit</option>
                                <option>Delete</option>
                            </select>

                            <label htmlFor="firstname">
                                First Name:
                                <input
                                    type="text"
                                    value={userData.firstname}
                                    onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                                    required />
                            </label>

                            <label htmlFor="lastname">
                                Last Name:
                                <input
                                    type="text"
                                    value={userData.lastname}
                                    onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                                    required />
                            </label>
                            <label htmlFor="email">
                                Email:
                                <input
                                    type="text"
                                    value={userData.email}
                                    id="email"
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    required />
                            </label>

                            <button onClick={() => handleAction(userData)}>{actionButtonText}</button>
                            <button onClick={() => router.back()}>Back</button>
                        </form>
                    </div>
                </>
            }
        </div>
    );
};

export default UserDetail;