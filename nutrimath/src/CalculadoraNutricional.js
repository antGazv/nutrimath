import React, { useState } from 'react';
import axios from 'axios';
import './CalculadoraNutricional.css'
import { Link } from 'react-router-dom';

const alimentos = [
  "Abacate",
  "Abacaxi",
  "Amaranto",
  "Amendoim",
  "Amêndoas",
  "Arroz",
  "Atum Enlatado",
  "Aveia",
  "Acelga",
  "Banana",
  "Batata Doce",
  "Brócolis",
  "Caju",
  "Carne",
  "Carne de Porco",
  "Cenoura",
  "Cenoura Cozida",
  "Cereja",
  "Cenoura Cozida",
  "Cereja",
  "Couve-flor",
  "Caju",
  "Carne",
  "Carne de Porco",
  "Cenoura",
  "Cenoura Cozida",
  "Cereja",
  "Couve-flor",
  "Espaguete Integral",
  "Espinafre",
  "Feijão Preto",
  "Feijão Verde",
  "Feijão Vermelho",
  "Frango",
  "Iogurte Natural",
  "Laranja",
  "Lentilhas",
  "Maçã",
  "Mel",
  "Melancia",
  "Millet",
  "Manga",
  "Morango",
  "Nozes",
  "Ovos",
  "Pão Integral",
  "Pepino",
  "Pera",
  "Pêssego",
  "Queijo Cheddar",
  "Queijo Cottage",
  "Queijo Parmesão",
  "Quinoa",
  "Salmão",
  "Salmão Enlatado",
  "Sardinha Enlatada",
  "Tofu"
];

function CalculadoraNutricional() {
  const [alimentoSelecionado, setAlimentoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valoresNutricionais, setValoresNutricionais] = useState(null);
  const [historicoCalculos, setHistoricoCalculos] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!alimentoSelecionado || !quantidade) {
      setError("Por favor, selecione um alimento e insira a quantidade.");
      return;
    }

    axios
      .post("http://localhost:3001/calcular", { alimento: alimentoSelecionado, quantidade })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          setValoresNutricionais(null);
        } else {
          setError(null);
          const resultado = res.data;
          setValoresNutricionais(resultado);
          const novoHistorico = [...historicoCalculos, { alimento: alimentoSelecionado, valores: resultado }];
          setHistoricoCalculos(novoHistorico);
          // Limpe o estado para permitir novos cálculos
          setAlimentoSelecionado("");
          setQuantidade("");
        }
      })
      .catch(() => {
        setError("Ocorreu um erro ao calcular os valores nutricionais.");
        setValoresNutricionais(null);
      });
  };

  // Função para somar os valores nutricionais de todos os itens no histórico
  const somarValoresNutricionais = () => {
    if (historicoCalculos.length === 0) return null;

    const soma = {
      calorias: 0,
      carboidratos: 0,
      proteinas: 0,
      gorduras: 0,
    };

    historicoCalculos.forEach((item) => {
      soma.calorias += item.valores.calorias;
      soma.carboidratos += item.valores.carboidratos;
      soma.proteinas += item.valores.proteinas;
      soma.gorduras += item.valores.gorduras;
    });

    return soma;
  };

  const valoresTotais = somarValoresNutricionais();

  return (
    <div>
      <header>
        <h1>Calculadora Nutricional</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div id='Principal'>
          <label>Selecione um alimento:</label>
          <select
            value={alimentoSelecionado}
            onChange={(e) => setAlimentoSelecionado(e.target.value)}
          >
            <option value="">Selecione um alimento</option>
            {alimentos.map((alimento) => (
              <option key={alimento} value={alimento}>
                {alimento}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </div>
        <button type="submit">Calcular</button>
        <Link to={"/"}>
          <a>Cancelar</a>
        </Link>
      </form>
      {error && <p>{error}</p>}
      {valoresNutricionais && (
        <div>
          <h2>Valores Nutricionais</h2>
          <p>Calorias: {valoresNutricionais.calorias}</p>
          <p>Carboidratos: {valoresNutricionais.carboidratos}</p>
          <p>Proteínas: {valoresNutricionais.proteinas}</p>
          <p>Gorduras: {valoresNutricionais.gorduras}</p>
        </div>
      )}
      {valoresTotais && (
        <div id='total'>
          <h2>Valores Totais</h2>
          <p>Calorias totais: {valoresTotais.calorias}</p>
          <p>Carboidratos totais: {valoresTotais.carboidratos}</p>
          <p>Proteínas totais: {valoresTotais.proteinas}</p>
          <p>Gorduras totais: {valoresTotais.gorduras}</p>
        </div>
      )}
      {historicoCalculos.length > 0 && (
        <div id='historico'>
          <h2>Histórico de Cálculos</h2>
          {historicoCalculos.map((item, index) => (
            <div key={index}>
              <p>Alimento: {item.alimento}</p>
              <p>Calorias: {item.valores.calorias}</p>
              <p>Carboidratos: {item.valores.carboidratos}</p>
              <p>Proteínas: {item.valores.proteinas}</p>
              <p>Gorduras: {item.valores.gorduras}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CalculadoraNutricional;