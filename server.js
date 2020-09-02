const express = require('express');
const consign = require('consign'); 

const app = express();

// Config EJS enginer
app.set('view engine', 'ejs');
app.set('views');

// Configurando arquivos estaticos
app.use(express.static('./Client'));

consign()
    .include('./Server/routes')
    .into(app);

module.exports = app; 
