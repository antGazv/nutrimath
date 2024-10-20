import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CalculadoraNutricional.css'
import { Link } from 'react-router-dom';



function CalculadoraNutricional() {
  const [alimentos, setAlimentos] = useState([]);
  const [alimentoSelecionado, setAlimentoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valoresNutricionais, setValoresNutricionais] = useState(null);
  const [historicoCalculos, setHistoricoCalculos] = useState([]);
  const [error, setError] = useState(null);

  // Função para buscar a lista de alimentos ao carregar o componente
  useEffect(() => {
    axios
      .get("http://localhost:4000/alimentos")  // Atualize a porta para 4000
      .then((res) => {
        console.log(res.data);  // Verifique se os dados estão sendo retornados corretamente
        setAlimentos(res.data);  // Preencher a lista de alimentos com os dados do backend
      })
      .catch((err) => {
        console.error(err);  // Log de erro, se houver
        setError("Erro ao carregar lista de alimentos.");
      });
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!alimentoSelecionado || !quantidade) {
      setError("Por favor, selecione um alimento e insira a quantidade.");
      return;
    }

    axios
      .post("http://localhost:4000/calcular", { alimentoId: alimentoSelecionado, quantidade })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
          setValoresNutricionais(null);
        } else {
          setError(null);
          const resultado = res.data;

          // Atualizar o histórico, salvando o nome do alimento em vez do ID
          const novoHistorico = [...historicoCalculos, {
            alimento: alimentos.find(a => a.id === alimentoSelecionado)?.nome,  // Armazena o nome
            valores: resultado
          }];
          setHistoricoCalculos(novoHistorico);

          // Limpar campos após o cálculo
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
              <option key={alimento.id} value={alimento.id}>
                {alimento.nome}
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
              <p>Alimento: {item.alimento}</p>  {/* Exibe o nome do alimento */}
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