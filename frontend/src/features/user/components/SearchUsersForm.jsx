// Admin panel component for searching, displaying, and deleting registered users.
import { useSearchUsersForm } from '../hooks/useSearchUsersForm.js';
import '../styles/admin-panel.css';

const SearchUsersForm = () => {
    const {
        searchTerm,
        filteredUsers,
        totalUsersCount,
        isLoading,
        error,
        deletingUserId,
        deleteError,
        handleSearchChange,
        handleRefresh,
        handleDeleteUser
    } = useSearchUsersForm();

    // Asks for confirmation before deleting — avoids accidental removals.
    const handleDeleteClick = (user) => {
        const confirmed = window.confirm(
            `¿Estás seguro de que querés eliminar al usuario "@${user.username}" (${user.name} ${user.lastName})?\n\nEsta acción no se puede deshacer.`
        );
        if (confirmed) {
            handleDeleteUser(user.id);
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-panel__header">
                <h2 className="admin-panel__title">Panel de Administración — Usuarios</h2>
                <span className="admin-panel__count">
                    {totalUsersCount} usuario{totalUsersCount !== 1 ? 's' : ''} registrado{totalUsersCount !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="admin-panel__controls">
                <input
                    className="admin-panel__search"
                    type="text"
                    placeholder="Buscar por usuario, nombre o email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    id="adminUserSearch"
                />
                <button
                    className="admin-panel__btn admin-panel__btn--refresh"
                    onClick={handleRefresh}
                    disabled={isLoading}
                >
                    {isLoading ? 'Cargando...' : '↻ Refrescar'}
                </button>
            </div>

            {/* Global fetch error */}
            {error && (
                <div className="admin-panel__alert admin-panel__alert--error">
                    ⚠ {error}
                </div>
            )}

            {/* Delete error feedback */}
            {deleteError && (
                <div className="admin-panel__alert admin-panel__alert--error">
                    ⚠ {deleteError}
                </div>
            )}

            {isLoading && (
                <p className="admin-panel__loading">Cargando usuarios desde el servidor...</p>
            )}

            {!isLoading && !error && filteredUsers.length === 0 && (
                <p className="admin-panel__empty">No se encontraron usuarios.</p>
            )}

            {!isLoading && filteredUsers.length > 0 && (
                <ul className="admin-panel__list">
                    {filteredUsers.map((user) => (
                        <li key={user.id} className="admin-panel__item">
                            <div className="admin-panel__item-info">
                                <span className="admin-panel__item-username">@{user.username}</span>
                                <span className="admin-panel__item-fullname">
                                    {user.name} {user.lastName}
                                </span>
                                <span className="admin-panel__item-email">📧 {user.email}</span>
                                {user.phone && (
                                    <span className="admin-panel__item-phone">📞 {user.phone}</span>
                                )}
                                <span className="admin-panel__item-id">ID: {user.id}</span>
                            </div>

                            <button
                                className="admin-panel__btn admin-panel__btn--delete"
                                onClick={() => handleDeleteClick(user)}
                                disabled={deletingUserId === user.id}
                            >
                                {deletingUserId === user.id ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchUsersForm;
