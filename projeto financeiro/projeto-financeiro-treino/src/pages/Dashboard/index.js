import React from "react";

import "./styles.css";

import CardInfoGerais from "../../components/CardInfoGerais";
import CardMovimentacao from "../../components/CardMovimentacao";

const Dashboard = () => {
  const movimentacoesMock = [
    { descricao: "Despesa do mês", valor: 347.68, categoria: "Alimentação" },
    { descricao: "Wifi Claro", valor: 129.9, categoria: "Entretenimento" },
    {
      descricao: "Recarga Estudante - Jorge",
      valor: 120,
      categoria: "Transporte"
    },
    { descricao: "Skank colombiano", valor: 200, categoria: "Entretenimento" },
    { descricao: "Salário - Jorge", valor: 1800, categoria: "Salário" }
  ];

  return (
    <div className="container-dashboard">
      <CardInfoGerais entradas="1800" saidas="1579" />

      <div className="container-movimentacoes">
        {movimentacoesMock.map(movimentacao => (
          <CardMovimentacao
            descricao={movimentacao.descricao}
            valor={movimentacao.valor}
            categoria={movimentacao.categoria}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
