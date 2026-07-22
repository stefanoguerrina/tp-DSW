import SearchUsersForm from '../components/searchUsersForm/index.jsx';

function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>¡Bienvenido a Chefcito! 🍳</h1>
      <p>Esta es la página principal del Frontend.</p>
      
      {/* Component to test backend user search (findAll) */}
      <SearchUsersForm />
    </div>
  );
}

export default Home;