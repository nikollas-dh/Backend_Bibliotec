import express from "express";
import { 
    criarUsuario, 
    listarUsuarios,
    obterUsuarios,
    deletarUsuario 
} from "../controllers/usuario.controller.js";
const router = express.Router();


router.get("/" , listarUsuarios)
router.post("/", criarUsuario)
router.get("/:id",obterUsuarios)
router.delete("/:id",deletarUsuario)

export default router; 