import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <h1>NutriMath</h1>
        <p>Calcule suas necessidades diárias de calorias!</p>
      </header>
      <div className="container">
        <h2>Sobre o Projeto</h2>
        <p>Seja bem-vindo à Calculadora de Gasto Calórico. Esta aplicação permite calcular as suas necessidades diárias de calorias com base em diferentes fatores, como idade, peso, altura, nível de atividade, entre outros.</p>
        <p>Para começar, clique no botão abaixo:</p>
        <Link to={"/calc"}>
          <a style={{ textDecoration: 'none', backgroundColor: '#739b0a', color: '#fff', padding: '10px 20px', fontSize: '18px', borderRadius: '5px' }}>
            Iniciar Calculadora
          </a>
        </Link>      
      </div>
    </div>
  );
}

export default App;