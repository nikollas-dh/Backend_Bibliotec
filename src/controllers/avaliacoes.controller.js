import { db } from "../config/db.js";

export async function criarAvaliacao(req, res) {
    try {
        const { usuario_id, livro_id, nota } = req.body;
        
        const notaDecimal = Number.parseFloat(Number(nota).toFixed(1))
        if (!usuario_id || !livro_id || !nota) return res.status(400).json({ erro: "Preencha os campos obrigatórios" });

        await db.execute(
            "INSERT INTO avaliacoes (usuario_id, livro_id, nota) VALUES (?, ?, ?)",
            [usuario_id, livro_id, notaDecimal]
        );

        res.json({ mensagem: "Avaliação criada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function listaAvaliacao(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM avaliacoes");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function obterAvaliacao(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM avaliacoes WHERE id = ?", [
            req.params.id,
        ]);
        if (rows.length === 0)
            return res.status(404).json({ erro: "Avaliação não encontrado" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function atualizaAvaliacao(req, res) {
    try {
        const { usuario_id, livro_id } = req.body;
        await db.execute(
            "UPDATE avaliacoes SET usuario_id = ?, livro_id = ?, nota = ?, WHERE id = ?",
            [usuario_id, livro_id, req.params.id]
        );
        res.json({ mensagem: "Avaliação atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function deletarAvaliacao(req, res) {
    try {
        await db.execute("DELETE FROM avaliacoes WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Avaliação deletado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};