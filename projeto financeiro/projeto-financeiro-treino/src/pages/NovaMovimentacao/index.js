import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CurrencyInput from "react-currency-input";
import CreatableSelect from "react-select/creatable";

import "./styles.css";

import logoImg from "../../assets/piggy-bank.svg";
import api from "../../services/api";

const NovaMovimentacao = () => {
  const history = useHistory();

  useEffect(() => {
    api.get("/categoria").then(response => setCategorias(response.data));
  }, []);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState("saida");
  const [data_venc, setData] = useState(new Date().toISOString().slice(0, 10));
  const [categoria, setCategoria] = useState(null);
  const [categorias, setCategorias] = useState([]);

  const options = categorias.map(categoria => ({
    label: categoria.nome,
    value: categoria.nome
  }));

  const handleNovaMovimentacao = async e => {
    e.preventDefault();

    const saida = tipo === "saida";

    const movimentacao = {
      descricao,
      valor,
      saida,
      data_venc,
      categoria: categoria.value.toLowerCase()
    };

    if (categoria?.__isNew__ === true)
      createCategoria(categoria.value.toLowerCase());

    try {
      await api.post("/movimentacao", movimentacao);
      history.push("/");
    } catch (error) {
      alert("Erro ao tentar salvar movimentacao, tente novamente.");
    }
  };

  const createCategoria = async value => {
    try {
      await api.post("/categoria", { nome: value });
    } catch (error) {
      alert("Erro ao tentar salvar movimentacao, tente novamente.");
    }
  };

  const handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setCategoria(newValue);
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
                onChangeEvent={(event, maskedvalue, floatvalue) =>
                  setValor(floatvalue)
                }
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

              <CreatableSelect
                isClearable
                onChange={handleChange}
                options={options}
                placeholder="Categoria"
                className="react-select"
                classNamePrefix="react-select"
              />
            </div>
            <button type="submit">Criar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NovaMovimentacao;
