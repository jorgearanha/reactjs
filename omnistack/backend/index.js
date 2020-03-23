const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        evento: 'Semana Omnistack',
        aluno: 'isso é mesmo necessário?'
    });
});

app.listen(3333);