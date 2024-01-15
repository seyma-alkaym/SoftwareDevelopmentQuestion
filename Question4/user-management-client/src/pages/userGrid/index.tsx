import React, { useState, useEffect } from 'react';
import User from '../model/user';
import UserDetail from '../userDetail';

const UserGrid: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users.');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  if (!Array.isArray(users)) {
    return <p>Loading...</p>;
  }

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
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>
                <div className="flex items-start mb-5">
                  <div className="flex items-center h-5">
                    <input 
                      id="terms" 
                      type="checkbox" 
                      value="" 
                      disabled = {isSelected}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
                      onChange={
                        () => {
                          setSelectedUserId(user.id);
                          setIsSelected(true);
                        }
                      } 
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUserId && <UserDetail id={selectedUserId} />}
    </div>
  );
};

export default UserGrid;
