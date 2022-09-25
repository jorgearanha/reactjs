import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CurrencyInput from "react-currency-input";

import logoImg from "../../assets/piggy-bank.svg";
import api from "../../services/api";

import "./styles.css";

const NovaMovimentacao = () => {
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    const {id, flag} = params;

    if (!!id) {
        api.get(flag + "/referencia/" + id).then(response => init(response.data, flag));
    }
  }, []);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState("saida");
  const [referencia, setReferencia] = useState("");
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));

  const init = (res, tipo) => {
    if (res.Count >= 1) {
      const {descricao, valor, data_recebimento, data_vencimento, referencia} = res.Items[0];
      const data = data_vencimento ? data_vencimento : data_recebimento;
      // const dataArray = data.split("-");

      setDescricao(descricao);
      setValor(valor.replace('.', ','));
      setTipo(tipo == 'saidas' ? 'saida' : 'entrada');
      setData(data);
      setReferencia(referencia);
      // setData(new Date(dataArray[0], dataArray[1], dataArray[2]).toISOString().slice(0, 10));
    }
  }

  const handleNovaMovimentacao = async e => {
    e.preventDefault();

    const saida = tipo === "saida";

    if (saida) {
      await saveSaida();
    } else {
      await saveEntrada();
    }
    
  };

  const saveEntrada = async () => {
    const entrada = {
      descricao,
      valor: valor.toString().replace(',', '.'),
      data_recebimento: data,
      referencia: data.substring(0, 4) + data.substring(5, 7)
    };

    try {
      if (!!params.id) {
        entrada.id_code = params.id;
        entrada.referencia = referencia;
        await api.put("/entradas", entrada);
      } else {
        await api.post("/entradas", entrada);
      }
      history.push("/");
    } catch (error) {
      alert("Erro ao tentar salvar movimentacao, tente novamente.");
    }
  }

  const saveSaida = async () => {
    const saida = {
      descricao,
      valor: valor.toString().replace(',', '.'),
      data_vencimento: data,
      referencia: data.substring(0, 4) + data.substring(5, 7)
    };

    try {
      if (!!params.id) {
        saida.id_code = params.id;
        saida.referencia = referencia;
        await api.put("/saidas", saida);
      } else {
        await api.post("/saidas", saida);
      }
      history.push("/");
    } catch (error) {
      console.log(error);
      alert("Erro ao tentar salvar movimentacao, tente novamente.");
    }
  }

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
                value={data}
              />
            </div>
            <button type="submit">{!!params.id ? 'Alterar' : 'Criar'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NovaMovimentacao;
