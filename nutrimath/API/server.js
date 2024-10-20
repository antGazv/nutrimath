const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "P22092003p",
    database: "nutrimath"
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log("Conectado ao banco de dados MySQL");
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    } else {
        console.log("Conexão com o banco de dados estabelecida com sucesso!");

        // Teste simples: fazer uma consulta para verificar se a conexão funciona
        db.query("SELECT 1 + 1 AS resultado", (err, result) => {
            if (err) {
                console.error("Erro ao executar consulta de teste:", err);
            } else {
                console.log("Consulta de teste executada com sucesso:", result);
            }
        });
    }
});


app.get("/alimentos", (req, res) => {
    const query = "SELECT id, nome FROM alimento";  // Verifique o nome da tabela
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar alimentos" });
        }
        res.json(result);  // Envia a lista de alimentos como resposta
    });
});



app.post("/calcular", (req, res) => {
  const { alimentoId, quantidade } = req.body;

  const query = `SELECT * FROM alimento WHERE id = ${mysql.escape(alimentoId)}`;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar alimento no banco de dados" });
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
      res.status(404).json({ error: "Alimento não encontrado" });
    }
  });
});



app.listen(port, () => {
    console.log(`Servidor backend rodando na porta ${port}`);
});