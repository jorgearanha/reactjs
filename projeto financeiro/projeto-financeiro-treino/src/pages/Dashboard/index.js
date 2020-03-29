import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

import "./styles.css";

import CardInfoGerais from "../../components/CardInfoGerais";
import CardMovimentacao from "../../components/CardMovimentacao";
import api from "../../services/api";

const Dashboard = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);

  const history = useHistory();

  useEffect(() => {
    api.get("/movimentacao").then(response => setMovimentacoes(response.data));
  }, []);

  useEffect(() => {
    let ent = 0;
    let sai = 0;

    movimentacoes.forEach(movimentacao => {
      movimentacao.saida
        ? (sai += movimentacao.valor)
        : (ent += movimentacao.valor);
    });

    setEntradas(ent);
    setSaidas(sai);
  }, [movimentacoes]);

  const handleNovaMovimentacao = () => {
    history.push("/nova-movimentacao");
  };

  return (
    <div className="container-dashboard">
      <CardInfoGerais entradas={entradas} saidas={saidas} />

      <div className="container-movimentacoes">
        {movimentacoes.map(movimentacao => (
          <CardMovimentacao
            key={movimentacao.descricao}
            descricao={movimentacao.descricao}
            saida={movimentacao.saida}
            valor={movimentacao.valor}
            categoria={movimentacao.categoria}
          />
        ))}

        <button onClick={handleNovaMovimentacao} className="card">
          <FiPlusCircle size="50" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
