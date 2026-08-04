// Custom hook managing state and logic for the user search and admin panel component.
import { useState, useEffect } from 'react';
import { searchUsersService } from '../services/searchUsersService.js';
import { deleteUserService } from '../services/deleteUserService.js';

export const useSearchUsersForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // ID of the user currently being deleted (to show loading state per row)
    const [deletingUserId, setDeletingUserId] = useState(null);
    const [deleteError, setDeleteError] = useState('');

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

    // Sends DELETE request for the given user ID and removes them from local state on success.
    const handleDeleteUser = async (userId) => {
        setDeleteError('');
        setDeletingUserId(userId);
        try {
            await deleteUserService(userId);
            // Optimistically remove deleted user from the list
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
        } catch (err) {
            console.error('[useSearchUsersForm] Error deleting user:', err);
            setDeleteError(err.message || 'Failed to delete user.');
        } finally {
            setDeletingUserId(null);
        }
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
        deletingUserId,
        deleteError,
        handleSearchChange,
        handleRefresh: fetchUsers,
        handleDeleteUser
    };
};
