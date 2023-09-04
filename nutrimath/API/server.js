const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "pedica07",
    database: "nutrimath"
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log("Conectado ao banco de dados MySQL");
});

app.post("/calcular", (req, res) => {
    const { alimento, quantidade } = req.body;

    const query = `SELECT * FROM alimentos WHERE nome = '${alimento}'`;
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            const alimento = result[0];
            const valoresNutricionais = {
                calorias: (alimento.calorias / 100) * quantidade,
                carboidratos: (alimento.carboidratos / 100) * quantidade,
                proteinas: (alimento.proteinas / 100) * quantidade,
                gorduras: (alimento.gorduras / 100) * quantidade,
              };              
            res.json(valoresNutricionais);
        } else {
            res.json({ error: "Alimento não encontrado" });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor backend rodando na porta ${port}`);
});