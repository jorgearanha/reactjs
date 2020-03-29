import React from "react";

import "./styles.css";

const CardMovimentacao = ({ descricao, valor, saida, categoria }) => {
  return (
    <div className={"container-card-movimentacao card " + (saida? "saida": "entrada")}>
      <p>{descricao}</p>
      <p>
        Valor:{" "}
        {Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(valor)}
      </p>
      <p>{categoria}</p>
    </div>
  );
};

export default CardMovimentacao;
