// ============================
//  Dependências
// ============================
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.routes.js";
import livrosRoutes from "./routes/livros.routes.js";
import avaliacaoRoutes from "./routes/avaliacoes.routes.js"
import favoritosRoutes from "./routes/favoritos.routes.js"
// ============================
//  Configuração do servidor
// ============================
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res) =>{
    res.send("API funcionando");
})

app.use("/usuarios",usuariosRoutes);
app.use("/livros",livrosRoutes);
app.use("/avaliacoes", avaliacaoRoutes);
app.use("/favoritos", favoritosRoutes);

// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
