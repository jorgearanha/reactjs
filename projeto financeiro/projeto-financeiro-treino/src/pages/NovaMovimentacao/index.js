import React from "react";
import { useHistory, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CurrencyInput from "react-currency-input";

import "./styles.css";
import { useState } from "react";

const NovaMovimentacao = () => {
  const history = useHistory();

  const categorias = ["alimentação", "entretenimento", "transporte", "salário"];

  const [valor, setValor] = useState(0);

  return (
    <div className="container-nova-movimentacao">
      <div className="container-card card">
        <section className="cadastro-info">
          <h1>Nova movimentação</h1>

          <p>
            Formulário para cadastro de novas movimentações. Preencha todas as
            informações ao lado para uma melhor experiência.
          </p>

          <Link to="/"><FiArrowLeft size={12} /> Voltar para o Dashboard</Link>

        </section>
        <div className="form">
          <form>
            <input placeholder="Descrição" className="descricao" />

            <div className="grupo">
              <CurrencyInput
                value={valor}
                onChangeEvent={e => setValor(e.target.value)}
                prefix="R$ "
                decimalSeparator=","
                thousandSeparator="."
              />

              <select>
                <option value="entrada">entrada</option>
                <option value="saida">saída</option>
              </select>
            </div>

            <div className="grupo">
              <input
                type="date"
                value={new Date().toISOString().slice(0, 10)}
              />

              <select>
                {categorias.map(categoria => (
                  <option value={categoria}>{categoria}</option>
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
