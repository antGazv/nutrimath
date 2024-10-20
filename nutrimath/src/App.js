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
        <h2>O que é o Nutrimath?</h2>
        <p>
          O NutriMath é uma valiosa ferramenta no auxilio das refeições, uma vez que se trata de uma calculadora de nutrientes simples e de fácil utilização, porém extremamente efetiva. 
        </p>
        <p>
          A calculadora tem o objetivo de simplificar os cálculos nutritivos dos alimentos e agilizar a rotina de dietas, oferecendo uma ampla base de dados com alta precisão em relação às calorias e macro nutrientes dos alimentos.
        </p>
        <p>
          Com a utilização do NutriMath, torna-se possível realizar uma análise mais precisa da dieta, auxiliando na escolha de alimentos contribuindo para uma alimentação mais saudável e balanceada.
        </p>

        <h2>O PROJETO</h2>
        <p>
          Nosso aplicativo está sendo criado como um projeto de extensão do Centro Universitário Filadélfia (UNIFIL), que tem como objetivo gerar soluções e auxílios para a comunidade.
        </p>

        <p>Para mais informações acesse o blogger de nosso projeto</p>

        <a href='https://nutrimathextensao.blogspot.com'>Clique aqui</a>

        <p>Para acessar a calculadora de nutrientes, clique no botão abaixo:</p>
        <Link to={"/CalculadoraNutricional"}>
          <a style={{ textDecoration: 'none', backgroundColor: '#739b0a', color: '#fff', padding: '10px 20px', fontSize: '18px', borderRadius: '5px' }}>
            Iniciar Calculadora
          </a>
        </Link>      
      </div>
    </div>
  );
}

export default App;