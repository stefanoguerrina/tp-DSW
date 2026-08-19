// Hook que gestiona el estado y la lógica del panel de administración de usuarios.
import { useState, useEffect } from 'react';
import { searchUsersService } from '../services/searchUsersService.js';
import { deleteUserService } from '../services/deleteUserService.js';

export const useSearchUsersForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // ID del usuario que está siendo eliminado en este momento (para mostrar estado de carga por fila).
    const [deletingUserId, setDeletingUserId] = useState(null);
    const [deleteError, setDeleteError] = useState('');

    // Solicita la lista de usuarios al backend.
    const fetchUsers = async () => {
        setIsLoading(true);
        setError('');
        try {
            const data = await searchUsersService();
            setUsers(data);
        } catch (err) {
            console.error('[useSearchUsersForm] Error al obtener usuarios:', err);
            setError(err.message || 'Error al cargar la lista de usuarios.');
        } finally {
            setIsLoading(false);
        }
    };

    // Carga la lista de usuarios cuando el componente se monta.
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearchChange = (event) => setSearchTerm(event.target.value);

    // Envía la petición de baja lógica y elimina el usuario del estado local al completarse.
    const handleDeleteUser = async (userId) => {
        setDeleteError('');
        setDeletingUserId(userId);
        try {
            await deleteUserService(userId);
            // Actualización optimista: saca el usuario de la lista local sin esperar otro fetch.
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
        } catch (err) {
            console.error('[useSearchUsersForm] Error al eliminar usuario:', err);
            setDeleteError(err.message || 'Error al dar de baja al usuario.');
        } finally {
            setDeletingUserId(null);
        }
    };

    // Filtra la lista según el término de búsqueda (username, nombre, apellido o email).
    const filteredUsers = users.filter((user) => {
        const query = searchTerm.toLowerCase().trim();
        if (!query) return true;
        return (
            user.username?.toLowerCase().includes(query) ||
            user.name?.toLowerCase().includes(query) ||
            user.lastName?.toLowerCase().includes(query) ||
            user.email?.toLowerCase().includes(query)
        );
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
