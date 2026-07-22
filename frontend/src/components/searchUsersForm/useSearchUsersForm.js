// Custom hook managing state and logic for user search component.
import { useState, useEffect } from 'react';
import { searchUsersService } from './searchUsersService.js';

export const useSearchUsersForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetches users from the backend service.
    const fetchUsers = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await searchUsersService();
            setUsers(data);
        } catch (err) {
            console.error('[useSearchUsersForm] Error fetching users:', err);
            setError(err.message || 'Error loading users list.');
        } finally {
            setIsLoading(false);
        }
    };

    // Load users list when component mounts.
    useEffect(() => {
        fetchUsers();
    }, []);

    // Updates search term input state.
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter users list based on search input (matches username, name, lastName, or email).
    const filteredUsers = users.filter((user) => {
        const query = searchTerm.toLowerCase().trim();
        if (!query) return true;

        const usernameMatch = user.username?.toLowerCase().includes(query);
        const nameMatch = user.name?.toLowerCase().includes(query);
        const lastNameMatch = user.lastName?.toLowerCase().includes(query);
        const emailMatch = user.email?.toLowerCase().includes(query);

        return usernameMatch || nameMatch || lastNameMatch || emailMatch;
    });

    return {
        searchTerm,
        filteredUsers,
        totalUsersCount: users.length,
        isLoading,
        error,
        handleSearchChange,
        handleRefresh: fetchUsers
    };
};
