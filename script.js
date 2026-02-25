let palavra = "";
let palavraOculta = [];
let letrasErradas = [];
let erros = 0;
let pontuacao = 0;

const maxErros = 6;

function iniciarOJogo() {

    palavra = document.getElementById("segredo").value.toLowerCase();

    if (palavra.length < 3) {
        alert("Digite uma palavra válida!");
        return;
    }

    palavraOculta = [];
    letrasErradas = [];
    erros = 0;
    pontuacao = 0;

    for (let i = 0; i < palavra.length; i++) {
        palavraOculta.push("_");
    }

    document.getElementById("painel").innerHTML = palavraOculta.join(" ");

    document.getElementById("areaSegredo").classList.add("hidden");
    document.getElementById("areaJogo").classList.remove("hidden");

    atualizarErros();
    atualizarInfo();
}

function verificarLetra() {

    let letra = document.getElementById("tentativa").value.toLowerCase();
    document.getElementById("tentativa").value = "";

    if (!letra) return;

    if (palavra.includes(letra)) {

        let acertou = false;

        for (let i = 0; i < palavra.length; i++) {
            if (palavra[i] === letra && palavraOculta[i] === "_") {
                palavraOculta[i] = letra;
                pontuacao += 10;
                acertou = true;
            }
        }

        if (!acertou) return;

    } else {

        if (!letrasErradas.includes(letra)) {
            letrasErradas.push(letra);
            erros++;
        }
    }

    document.getElementById("painel").innerHTML = palavraOculta.join(" ");
    document.getElementById("erradas").innerHTML = letrasErradas.join(", ");

    atualizarErros();
    atualizarInfo();
    verificarFim();
}

function atualizarErros() {

    let porcentagem = (erros / maxErros) * 100;
    document.getElementById("barraErro").style.width = porcentagem + "%";

    let linha = "";
    for (let i = 0; i < maxErros; i++) {
        if (i < erros) {
            linha += "❌ ";
        } else {
            linha += "🔘";
        }
    }

    document.getElementById("linhaErros").innerHTML = linha;
}

function atualizarInfo() {
    document.getElementById("tentativasRestantes").innerText = maxErros - erros;
    document.getElementById("pontuacao").innerText = pontuacao;
}

function mostrarTelaFinal(tipo) {

    const tela = document.createElement("div");
    tela.classList.add("tela-final");

    const titulo = document.createElement("h2");

    if (tipo === "vitoria") {
        titulo.innerText = "🎉 VOCÊ VENCEU!";
        titulo.classList.add("vitoria");
    } else {
        titulo.innerText = "💀 GAME OVER";
        titulo.classList.add("derrota");
    }

    const botao = document.createElement("button");
    botao.innerText = "Jogar Novamente";
    botao.onclick = reiniciarJogo;

    tela.appendChild(titulo);
    tela.appendChild(botao);

    document.body.appendChild(tela);
}

function verificarFim() {

    if (!palavraOculta.includes("_")) {
        mostrarTelaFinal("vitoria");
    }

    if (erros >= maxErros) {
        mostrarTelaFinal("derrota");
    }
}

function reiniciarJogo() {
    location.reload();
}