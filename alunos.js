//const furiosos= [raissa, dan, Nai, Caique, Nicolas];
const fs = require("fs");

const alunos = [
    {
        nome: "Kate",
        media: 7.5,
        matricula: 1
    },
    {
        nome: "Penjamin",
        media: 9.0,
        matricula: 2
    },
    {
        nome: "Leonette",
        media: 7.0,
        matricula: 3
    }
];

function filtrarAlunoNome(nomeAluno) {
    const alunosEncontrados = alunos.filter((aluno) => aluno.nome.toLowerCase().startsWith(nomeAluno.toLowerCase()))

    if (alunosEncontrados) {
        return alunosEncontrados
    }
}
function filtrarAlunoMedia(mediaAluno) {
    const alunosEncontrados = alunos.filter((aluno) => aluno.media >= mediaAluno)
    if (alunosEncontrados) {
        return alunosEncontrados
    }
}
function filtrarAlunoNomeMedia(nomeAluno, mediaAluno) {
    const alunosEncontrados = alunos.filter((aluno) => aluno.media >= mediaAluno && aluno.nome.toLowerCase().startsWith(nomeAluno.toLowerCase()))
    if (alunosEncontrados) {
        return alunosEncontrados
    }
}

function adicionarAluno(req, res) {
    const { nome, media, matricula } = req.query;
    const novosAlunos = { nome, matricula, media }

    if (nome && matricula && media) {
        alunos.push(novosAlunos)
        res.status(201).json(novosAlunos)
    } else {
        res.status(400).json({ message: "Bad request" })
    }
    const jsonData= JSON.stringify(alunos) 
    fs.writeFile('./db/db.json',`${jsonData}`)
}
function deletarAluno(req, res) {
    const { index } = req.params
    if (index <= alunos.length - 1) {
        alunos.splice(index, 1);
        res.send(alunos)
    } else {
        res.status(404).send("Aluno não encontrado!")
    }
    fs.writeFile('./db/db.json', JSON.stringify(alunos))
}

function atualizarAluno(req, res) {
    const { index } = req.params
    const { nome, media } = req.query;
    alunos[index].nome = nome;
    alunos[index].media = media;
    res.send(alunos)
}

module.exports = { alunos, filtrarAlunoNome, filtrarAlunoMedia, filtrarAlunoNomeMedia, adicionarAluno, deletarAluno, atualizarAluno };






