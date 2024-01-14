import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import User from '../model/user';

const UserGrid: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      const response = await fetch(`api/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('User deleted successfully.');
      } else {
        console.error('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  


  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* Add other table headers */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                  {user.firstname}
              </td>
              <td>
                  {user.lastname}
              </td>
              <td>
                  {user.email}
              </td>
              <td>
                <Link href={`/user/${user.id}/edit`}>
                  Edit
                </Link>{' '}
                |
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/user/new">
        New
      </Link>
    </div>
  );
};

export default UserGrid;