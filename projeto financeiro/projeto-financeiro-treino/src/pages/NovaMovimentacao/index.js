import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CurrencyInput from "react-currency-input";

import "./styles.css";

import logoImg from "../../assets/piggy-bank.svg";
import api from "../../services/api";

const NovaMovimentacao = () => {
  const history = useHistory();

  const categorias = ["alimentação", "entretenimento", "transporte", "salário"];

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState("saida");
  const [data_venc, setData] = useState(new Date().toISOString().slice(0, 10));
  const [categoria, setCategoria] = useState(categorias[0]);

  const handleNovaMovimentacao = e => {
    e.preventDefault();

    const saida = tipo === "saida";
    
    const movimentacao = {descricao, valor, saida, data_venc, categoria};
    

    try {
      api.post("/movimentacao", movimentacao)
      history.push("/");
    } catch (error) {
      alert("Erro ao tentar salvar movimentacao, tente novamente.")
    }

  };

  return (
    <div className="container-nova-movimentacao">
      <div className="container-card card">
        <section className="cadastro-info">
          <img src={logoImg} alt="Controle financeiro" />

          <h1>Nova movimentação</h1>

          <p>
            Formulário para cadastro de novas movimentações. Preencha todas as
            informações ao lado para uma melhor experiência.
          </p>

          <Link to="/">
            <FiArrowLeft size={12} /> Voltar para o Dashboard
          </Link>
        </section>

        <div className="form">
          <form onSubmit={handleNovaMovimentacao}>
            <input
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Descrição"
              className="descricao"
            />

            <div className="grupo">
              <CurrencyInput
                value={valor}
                onChangeEvent={(event, maskedvalue, floatvalue) => setValor(floatvalue)}
                prefix="R$ "
                decimalSeparator=","
                thousandSeparator="."
              />

              <select
                defaultValue={tipo}
                onChange={e => setTipo(e.target.value)}
              >
                <option value="entrada">entrada</option>
                <option value="saida">saída</option>
              </select>
            </div>

            <div className="grupo">
              <input
                type="date"
                onChange={e => setData(e.target.value)}
                value={data_venc}
              />

              <select
                defaultValue={categoria}
                onChange={e => setCategoria(e.target.value)}
              >
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Criar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NovaMovimentacao;
