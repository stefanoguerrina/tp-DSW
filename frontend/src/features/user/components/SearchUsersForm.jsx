// Component for searching and displaying users registered in the application.
import { useSearchUsersForm } from '../hooks/useSearchUsersForm.js';

const SearchUsersForm = () => {
  const {
    searchTerm,
    filteredUsers,
    totalUsersCount,
    isLoading,
    error,
    handleSearchChange,
    handleRefresh
  } = useSearchUsersForm();

  return (
    <div className="searchUsersForm" style={{ maxWidth: '600px', margin: '20px auto', textAlign: 'left' }}>
      <h2>Buscador de Usuarios</h2>
      <p style={{ marginBottom: '15px', fontSize: '14px' }}>
        Usuarios registrados en total: <strong>{totalUsersCount}</strong>
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por usuario, nombre o email..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid var(--border, #ccc)',
            fontSize: '15px'
          }}
        />
        <button
          onClick={handleRefresh}
          style={{
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Refrescar
        </button>
      </div>

      {isLoading && <p>Cargando usuarios desde el backend...</p>}

      {error && (
        <div style={{ padding: '12px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '6px', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      {!isLoading && !error && filteredUsers.length === 0 && (
        <p style={{ color: '#888' }}>No se encontraron usuarios.</p>
      )}

      {!isLoading && filteredUsers.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              style={{
                padding: '12px 16px',
                border: '1px solid var(--border, #e0e0e0)',
                borderRadius: '8px',
                marginBottom: '10px'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                @{user.username} <span style={{ fontWeight: 'normal', opacity: 0.8 }}>({user.name} {user.lastName})</span>
              </div>
              <div style={{ fontSize: '14px', opacity: 0.7, marginTop: '4px' }}>
                📧 {user.email} {user.phone ? `| 📞 ${user.phone}` : ''}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUsersForm;
