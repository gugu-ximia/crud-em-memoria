import express from 'express';

const app = express();
app.use(express.json());

let ultimoId = 1;
const usuario_admin = {
    id: ultimoId,
    nome: "admin",
    email: "adimin@gmail.com",
};

let usuarios = [usuario_admin];

// PEGA TODOS OS USUARIOS
app.get('/usuarios', (req, res) => {
    res.json(usuarios).status(200);
});

// ADICIONA NOVOS USUARIOS
app.post("/usuarios", (req, res) => {
    const {nome, email} = req.body;

    // VERIFICA SE TEM NOME E E-MAIL
    if (!nome || !email) {
        res.status(400).json({mensagem: "Nome e Email obrigatorios"});
    }

    // CRIA UM NOVO USUARIO
    const novoUsuario = {
        nome: nome,
        email: email,
        id: ultimoId + 1,
    };

    // PEGA O ULTIMO ID UTILIZADO E 
    usuarios.push(novoUsuario);
    ultimoId += 1;

    res.send({})
})

// DELETA OS USUARIOS
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

app.patch("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({mensagem: "ID inválido, precisa ser um numero"})
    };

    const usuario = usuarios.find((usuario) => usuario.id === id);
    if (!usuario) {
        return res.status(404).json({mensagem: "Usuario não encontrado"})
    }

    const {novoNome, novoEmail } = req.body;

    if (!nome && !email) {
        return res.status(400).json({mensagem: "manda pelo menos um dos dados"})
    }

    if (email) {
        let emai_existe = usuarios.findIndex((usuario) => usuario.email === email);

        if (email_existe !== -1) {
            return res.status(409).json({mensagem: "E-mail já cadastrado"})
        }

    }
    
})

app.listen(3000);