import { 
    criarAvaliacao, 
    listaAvaliacao, 
    obterAvaliacao  , 
    atualizaAvaliacao, 
    deletarAvaliacao } from "../controllers/avaliacoes.controller.js";

import express from "express";

const router = express.Router();

router.get("/",listaAvaliacao);
router.post("/",criarAvaliacao);
router.get("/:id", obterAvaliacao);
router.put("/:id",atualizaAvaliacao);
router.delete("/:id",deletarAvaliacao);

export default router;
