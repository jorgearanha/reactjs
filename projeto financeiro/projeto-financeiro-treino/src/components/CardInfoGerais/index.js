import React from "react";

import "./styles.css";

const CardInfoGerais = ({ entradas, saidas }) => {
  const saldo = entradas - saidas;

  return (
    <div className="container-card-info-gerais card">
      <p>
      <strong>Saldo: </strong>
        {Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(saldo)}
      </p>
      <p>
      <strong>Entradas: </strong>
        {Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(entradas)}
      </p>
      <p>
      <strong>Saídas: </strong>
        {Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(saidas)}
      </p>
    </div>
  );
};

export default CardInfoGerais;
