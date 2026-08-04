// Home page — main view displayed after a successful login.
import SearchUsersForm from '../components/SearchUsersForm.jsx';

function HomePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>¡Bienvenido a Chefcito! 🍳</h1>
      <p>Esta es la página principal del Frontend.</p>
      
      {/* Component to test backend user search (findAll) */}
      <SearchUsersForm />
    </div>
  );
}

export default HomePage;
