import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

const CardMovimentacao = ({ descricao, valor, saida, categoria, id_code, reload }) => {
  const history = useHistory();

  const handleDelete = async (id_code, saida, reload) => {
    console.log(id_code);
    try {
      if (saida) {
        await api.delete("/saidas/" + id_code);
      } else {
        await api.delete("/entradas/" + id_code);
      }
      reload();
    } catch (error) {
      alert("Erro ao tentar excluir movimentacao, tente novamente.");
    }
  }

  const handleEdit = async (id_code, saida) => {
    console.log(id_code);
    if (saida) {
      history.push("editar-movimentacao/saidas/" + id_code);
    } else {
      history.push("editar-movimentacao/entradas/" + id_code);
    }
  }

  return (
    <div className={"container-card-movimentacao card " + (saida ? "saida" : "entrada")}>
      <p>{descricao}</p>
      <p>
        Valor:{" "}
        {Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(valor)}
      </p>
      <p>{categoria}</p>
      <div className="icon-container">
        <a className="icon" onClick={() => handleDelete(id_code, saida, reload)}>
          <FiTrash2 size="20" />
        </a>
        <a className="icon" onClick={() => handleEdit(id_code, saida)}>
          <FiEdit size="20" />
        </a>
      </div>
    </div>
  );
};

export default CardMovimentacao;
