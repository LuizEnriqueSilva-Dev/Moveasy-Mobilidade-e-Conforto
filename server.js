const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

const TOKEN = "d763ab858dfebeb8a9d3dcf4b7cd18ae1847a5ee340b69fb0cfb7d92400e285c";

const BASE_URL = "https://api.olhovivo.sptrans.com.br/v2.1";

app.get("/onibus", async (req, res) => {

    try {

        // LOGIN
        const login = await axios.post(
            `${BASE_URL}/Login/Autenticar?token=${TOKEN}`
        );

        console.log("LOGIN:", login.data);

        // TESTE DE LINHA
        const linhas = await axios.get(
            `${BASE_URL}/Linha/Buscar?termosBusca=8000`,
            {
                headers: login.headers
            }
        );

        console.log("LINHAS:", linhas.data);

        res.json(linhas.data);

    } catch (erro) {

        console.log("ERRO COMPLETO:");
        console.log(erro.response?.data || erro.message);

        res.json({
            erro: erro.response?.data || erro.message
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

app.get('/healthz', (req, res) => {
    res.send('OK');
});