import { db } from "../config/db.js";

export async function criarLivro(req, res) {
    console.log(req.body)
    try {
        const { titulo, autor } = req.body;
        if (!titulo || !autor )
            return res.status(400).json({ erro: "Preencha os campos obrigatórios" });

        await db.execute(
            "INSERT INTO livros (titulo, autor) VALUES (?, ?)",
            [titulo, autor]
        );

        res.json({ mensagem: "Livro criado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function listaLivro(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM livros");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function obterLivro(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM livros WHERE id = ?", [
            req.params.id,
        ]);
        if (rows.length === 0)
            return res.status(404).json({ erro: "Livro não encontrado" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function atualizaLivro(req, res) {
    try {
        const { titulo, autor} = req.body;
        await db.execute(
            "UPDATE livros SET titulo = ?, autor = ? = ? WHERE id = ?",
            [titulo, autor, req.params.id]
        );
        res.json({ mensagem: "Livro atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function deletarLivro(req, res) {
    try {
        await db.execute("DELETE FROM livros WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "livro deletado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};