const exception = require("../exception/exception");

module.exports = {
  create(request, response) {
    const { descricao, valor, saida, data, pago, categoria } = request.body;

    const movimentacao = {
      descricao: typeof descricao === "string" ? descricao : () => {break},
      valor,
      saida,
      data,
      pago,
      categoria
    };

    return response.json(movimentacao);
  }
};
