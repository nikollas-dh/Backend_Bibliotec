import { 
    criarLivro, 
    listaLivro, 
    obterLivro, 
    atualizaLivro, 
    deletarLivro } from "../controllers/livros.controllers.js";

import express from "express";

const router = express.Router();

router.get("/",listaLivro);
router.post("/",criarLivro);
router.get("/:id", obterLivro);
router.put("/:id",atualizaLivro);
router.delete("/:id",deletarLivro);

export default router;

