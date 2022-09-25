import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

import CardInfoGerais from "../../components/CardInfoGerais";
import CardMovimentacao from "../../components/CardMovimentacao";
import api from "../../services/api";

import "./styles.css";

const Dashboard = () => {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);

  const history = useHistory();

  useEffect(() => {
    loadMovimentacoes();
  }, []);

  useEffect(() => {
    let ent = 0;
    let sai = 0;

    movimentacoes.forEach(movimentacao => {
      movimentacao.saida
        ? (sai += Number(movimentacao.valor))
        : (ent += Number(movimentacao.valor));
    });

    setEntradas(ent);
    setSaidas(sai);
  }, [movimentacoes]);

  const loadMovimentacoes = () => {
    Promise.all([api.get("/entradas"), api.get("/saidas")]).then(([ent, sai]) => {
      ent.data.Items.forEach(i => i.saida = false);
      sai.data.Items.forEach(i => i.saida = true);
      setMovimentacoes([...ent.data.Items, ...sai.data.Items]);
      console.log([...ent.data.Items, ...sai.data.Items]);
    })
  }

  const handleNovaMovimentacao = () => {
    history.push("/nova-movimentacao");
  };

  const handleRemove = (id) => {
    setMovimentacoes(movimentacoes.filter((a) => a.id_code !== id));
  }

  return (
    <div className="container-dashboard">
      <CardInfoGerais entradas={entradas} saidas={saidas} />
      {console.log(movimentacoes)}
      <div className="container-movimentacoes">
        {movimentacoes.map(movimentacao => (
          <CardMovimentacao
            key={movimentacao.id_code}
            descricao={movimentacao.descricao}
            saida={movimentacao.saida}
            valor={movimentacao.valor}
            categoria={movimentacao.categoria}
            id_code={movimentacao.id_code}
            reload={loadMovimentacoes}
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
