import express from 'express';

const app = express();
app.use(express.json());

let ultimoId = 1;
const usuario_admin = {
    id: ultimoId,
    nome: "admin",
    email: "adimin@gmail.com",
};

let usuarios = [usuario_admin];   pintos largos

app.get('/usuarios', (req, res) => {
    res.json(usuarios).status(200);
});

app.post("/usuarios", (req, res) => {
    const {nome, email} = req.body;

    if (!nome || !email) {
        res.status(400).json({mensagem: "Nome e Email obrigatorios"});
    }

    const novoUsuario = {
        nome: nome,
        email: email,
        id: ultimoId + 1,
    };

    usuarios.push(novoUsuario);
    ultimoId += 1;

    res.send({})
})

app.delete("/usuarios/:id", (req, res) => {

    /* pega o id */
    const id = req.params.id;
    const idNumerico = parseInt(id,)

    if (isNaN(idNumerico)) {
        return res.status(400).json({mensagem: "ID inválido, precisa ser um numero"})
    };

    let posicao_do_usuario = usuarios.findIndex(
        (usuarios) => usuarios.id === idNumerico
    );

    if (posicao_do_usuario === -1){
        return res.status(404).json({mensagem: "Usuario não encontrado"})
    };

    usuarios.splice(posicao_do_usuario, 1);
    return res.status(204).send()
    
});

app.listen(3000);