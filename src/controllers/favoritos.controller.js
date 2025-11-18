import { db } from "../config/db.js";

export async function listarFavoritos(req, res) {

    try {
        const [rows] = await db.execute("SELECT * FROM favoritos");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}



export async function criarFavoritos(req, res) {
    console.log(req.body)
    try {
        const { usuario_id, livro_id } = req.body;
        if (!usuario_id || !livro_id)
            return res.status(400).json({ erro: "Preencha os campos obrigatórios" });

        const [usuarios] = await db.execute(
            'SELECT id FROM usuarios WHERE id = ?',
            [usuario_id]
        );
        if (usuarios.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Usuário não encontrado'
            });
        }

        const [livros] = await db.execute(
            'SELECT id FROM livros WHERE id = ?',
            [usuario_id]
        );
        if (livros.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Livro não encontrado'
            });
        }
        const [livros_favoritos] = await db.execute(
            "SELECT * from favoritos WHERE usuario_id = ? AND livro_id = ?",
            [usuario_id, livro_id]
        );

        console.log(livros_favoritos)
        if (livros_favoritos.length > 0) {
            return res.status(200).json({ msg: "Este livro já está favoritado ." })
        }

        await db.execute(
            "INSERT INTO favoritos (usuario_id, livro_id) VALUES (?, ?)",
            [usuario_id, livro_id]
        );

        res.json({ mensagem: "Livro adicionado aos favoritos com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function deletarFavorito(req, res) {
    try {
        await db.execute("DELETE FROM favoritos WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Livro removido dos favoritos com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}