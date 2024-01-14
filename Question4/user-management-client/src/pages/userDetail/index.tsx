import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'; 
import UserData from '../model/userData';
import User from '../model/user';

const UserDetail: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/users/${id}`);
                    const data = await response.json();
                    setUser(data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };

            fetchUser();
        }
    }, [id]);


    const handleAction = async (userData: UserData) => {
        try {
            const response = await fetch('http://localhost:8080/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('User created successfully.');
            } else {
                console.error('Failed to create user.');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
    return (
        <div>
            {user ? (
                <>
                    <h1>User Details</h1>
                    {/* Display user details in a form */}
                    <button onClick={() => handleAction(user)}>Create</button>
                    <button onClick={() => router.back()}>Back</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserDetail;