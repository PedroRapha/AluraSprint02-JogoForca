//Funcionalidades do Site
	//tela inicial
function voltarParaTelaInicial() {
	telaNovaPalavra.style.display = "none";
	telaJogo.style.display = "none";
	telaInicial.style.display = "flex";
	gameMode = false;
}

function mudarParaTelaJogo(){
	gameMode = true;
	telaInicial.style.display = "none";
	telaJogo.style.display = "flex";
	limpaForca();
}

function mudarParaTelaAdicionar() {
	telaInicial.style.display = "none";
	telaNovaPalavra.style.display = "flex";
}

var gameMode = false;
document.getElementById("telaInicial");
document.getElementById("telaNovaPalavra")
document.getElementById("telaJogo");
var logoAlura = document.querySelector(".logo-topo");
var botaoComecar = document.querySelector("#comecarAJogar");
var botaoNovaPalavra = document.querySelector("#adicionarNovaPalavra");

logoAlura.onclick = voltarParaTelaInicial;
botaoComecar.onclick = mudarParaTelaJogo;
botaoNovaPalavra.onclick = mudarParaTelaAdicionar;

	//tela Nova Palavra
var botaoVoltar = document.querySelector("#voltar");
botaoVoltar.onclick = voltarParaTelaInicial;

	//funções de funcionalidade da tela de Jogo estão todos na funcionalidade do próprio jogo

//Funcionalidades de adicionar palavra
function verificaPalavraRepetida(){
	palavraProibida = false;

	for(var posicao = 0;posicao<=todasPalavras.length;posicao++){
		if (input.value == todasPalavras[posicao]){
			palavraProibida = true;
			alert("Essa palavra já está no jogo! Por favor, adicione uma palavra nova");
			input.value = "";
			input.focus();
		}
	}
}

function verificaSeTemSomenteLetras(str) {
	return /^[a-zA-Z]+$/.test(str);
	//lembrete: isto retorna true ou false, dependendo se o string tiver só letras não acentuadas ou tiver outros dígitos, respectivamente
}

function verificaTamanhoDaPalavra() {
	var tamanhoDaPalavra = input.value;
	if (palavraProibida == false){
		if (tamanhoDaPalavra.length>8) {
			palavraProibida = true;
			alert("Por favor, digite uma palavra com 8 letras ou menos, sem acentos");
			input.value = "";
			input.focus();
		}
	}
}

function adicionaPalavraNova() {
	var palavraDigitada = input.value;

	verificaPalavraRepetida();
	verificaSeTemSomenteLetras(palavraDigitada);
	verificaTamanhoDaPalavra();
	
	if (palavraProibida == false &&
		verificaSeTemSomenteLetras(palavraDigitada) == true){
		alert(input.value + " adicionada ao jogo")
		todasPalavras.push(input.value);
		input.value = "";
		input.focus();
	}else if (verificaSeTemSomenteLetras(palavraDigitada) == false) {
		alert("Por favor, digite uma palavra com 8 letras ou menos, sem acentos, números ou caracteres especiais")
		input.value = "";
		input.focus();
	}
}

var input = document.querySelector(".palavrasUsuario");
var palavraProibida = false;
var botaoAdiciona = document.querySelector("#adicionarPalavra");

botaoAdiciona.onclick = adicionaPalavraNova;

//funcionalidades do JOGO EM SI
function limpaForca() {
	pincel.fillStyle = '#E5E5E5';
	pincel.fillRect(0,0,480,650);
	pincel.fillStyle = "#0A3871";
	pincel.strokeStyle = "#0A3871";
	pincel.lineWidth = 3;
	pincel.font = "48px Sans-Serif";
	pincel.fillRect(90,300,300,3);
	pincel.fillRect(150,0,3,300);
	pincel.fillRect(150,0,180,3);
	pincel.fillRect(330,0,3,30);

	numeroDePalavras = todasPalavras.length;
	palavraSorteada = escolherPalavraSecreta();
	palavraLetrasSeparadas = palavraSorteada.split("");
	palavraEmCodigo = [];
	converter = convertePalavraEmCodigo();
	achou = false;
	letraRepetida = false;
	fimDeJogo = false;
	letrasDigitadas = [];
	numeroDeAcertos = 0;
	numeroDeErros = 0;
	numeroDeLetrasDigitadas = 0;

	desenhaTracinhos();
}

function sorteioPosicao() {
	return Math.floor(Math.random()*numeroDePalavras);
}

function escolherPalavraSecreta() {
	var sorteio = sorteioPosicao();
	return todasPalavras[sorteio];
}

function desenhaTracinhos() {
	var comecoTraco = (480 - (palavraSorteada.length*50 + (palavraSorteada.length-1)*10))/2;

    for (posicao = 1; posicao <= palavraSorteada.length; posicao++) {
		pincel.fillRect(comecoTraco+(60*(posicao-1)),450,50,3);
	}
}

function convertePalavraEmCodigo() {
	for (posicao=0; posicao<=palavraLetrasSeparadas.length;posicao++) {
		for (var alfa = 0; alfa < 26; alfa++) {
			if (alfabeto[alfa] == palavraLetrasSeparadas[posicao]) {
				palavraEmCodigo.push(codigoTeclado[alfa]);
				break;
			}
		}
	}
}

/* Já funciona detectar se é uma letra só ou não e td mais. Falta só enviar isso para uma simulação do teclado.*/
function digitarLetraMobile() {
	var somenteLetraMobile = false;

	letraDigitadaMobile = inputLetra.value;
	
	if (letraDigitadaMobile=="") {
		alert("Por favor, digite uma letra")
	} else if (letraDigitadaMobile.length > 1) {
		alert("Por favor, digite apenas uma letra");
	} else if (/^[a-zA-Z]+$/.test(letraDigitadaMobile) == false) {
		alert("Por favor, digite apenas uma letra. Nada de números ou caracteres especiais");
	} else {
	somenteLetraMobile = true;
	
	}
	
	if (somenteLetraMobile) {
		
		for (var posicao = 0; posicao <= codigoTeclado.length; posicao++) {
			if (letraDigitadaMobile.toLowerCase() == alfabeto[posicao]) {
				var keyboardEvent = document.createEvent('KeyboardEvent');
				var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

				keyboardEvent[initMethod](
				'keydown', // event type: keydown, keyup, keypress
				true, // bubbles
				true, // cancelable
				window, // view: should be window
				false, // ctrlKey
				false, // altKey
				false, // shiftKey
				false, // metaKey
				codigoTeclado[posicao], // keyCode: unsigned long - the virtual key code, else 0
				0, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
				);
				document.dispatchEvent(keyboardEvent);
			}
		}
	}

}

function desenhaLetrasAcertos(evento) {
	var comecoTraco = (480 - (palavraSorteada.length*50 + (palavraSorteada.length-1)*10))/2 + 10;

    for (posicao=0; posicao<=palavraEmCodigo.length; posicao++) {
		if(evento.keyCode == palavraEmCodigo[posicao]) {
			pincel.fillText(palavraLetrasSeparadas[posicao].toUpperCase(),comecoTraco+(60*posicao),425);

			numeroDeAcertos++;
			numeroDeLetrasDigitadas++;
		}
	}
}

function desenhaLetrasErros(evento) {
	var comecoTraco = 143;

    pincel.font = "24px Sans-Serif";
	for (posicao=0;posicao<codigoTeclado.length;posicao++) {
		if (codigoTeclado[posicao]==evento.keyCode) {
			pincel.fillText(alfabeto[posicao].toUpperCase(),comecoTraco+(35*numeroDeErros),475);

            letrasDigitadas.push(codigoTeclado[posicao]);
			numeroDeErros++;
			numeroDeLetrasDigitadas++;
			desenhaEnforcado();
		}
	}
	pincel.font = "48px Sans-Serif";
}

function reconheceLetraRepetida(evento) {
	for (posicao=0;posicao<=letrasDigitadas.length;posicao++) {
		if (evento.keyCode==letrasDigitadas[posicao]) {
			letraRepetida = true;
			alert("Você já digitou essa letra. Por favor, digite uma letra nova");
			break;
		}
	}

}

function desenhaEnforcado() {
	if (numeroDeErros==1) {
		//cabeça
		pincel.beginPath();
		pincel.arc(330,55,25,0,2*Math.PI);
		pincel.stroke();
	} else if (numeroDeErros==2) {
		//corpo
		pincel.fillRect(329,80,3,140);
	} else if (numeroDeErros==3) {
		//braço direito
		pincel.beginPath();
		pincel.moveTo(280,130);
		pincel.lineTo(330,80);
		pincel.stroke();
	} else if (numeroDeErros==4) {
		//braço esquerdo
		pincel.lineTo(380,130);
		pincel.stroke();
	} else if (numeroDeErros==5) {
		//perna direita
		pincel.beginPath();
		pincel.moveTo(280,270);
		pincel.lineTo(330,220);
		pincel.stroke();
	} else if (numeroDeErros==6) {
		//perna esquerda
		pincel.lineTo(380,270);
		pincel.stroke();
	}
}

function reconheceTeclado(evento) {
	if (fimDeJogo == false &&
		gameMode == true) {
		achou = false;
		letraRepetida = false;

		reconheceLetraRepetida(evento);

		for (posicao=0; posicao<=palavraEmCodigo.length; posicao++) {
			if (evento.keyCode == palavraEmCodigo[posicao] &&
				letraRepetida == false) {
				achou = true;
				letrasDigitadas.push(palavraEmCodigo[posicao]);

				desenhaLetrasAcertos(evento);
			}
		}

		if(achou==false &&
			letraRepetida == false) {
			for (posicao=0; posicao<=codigoTeclado.length; posicao++) {
				if (evento.keyCode == codigoTeclado[posicao]) {
					alert("você errou!")
				}
			}
			desenhaLetrasErros(evento);
		}
	}
	
	if(gameMode ==true) {
		verificaFimDeJogo();
	}
}

function verificaFimDeJogo() {
	if (fimDeJogo == false) {
		//quando vence
		if (numeroDeAcertos == palavraEmCodigo.length) {
			fimDeJogo = true;
			alert("Fim de Jogo!");
			pincel.fillStyle = '#E5E5E5';
			pincel.fillRect(0,0,480,333);
			//cabeça
			pincel.beginPath();
			pincel.arc(240,55,25,0,2*Math.PI);
			pincel.stroke();
			//corpo
			pincel.fillStyle = "#0A3871";
			pincel.fillRect(239,80,3,140);
			//braço direito
			pincel.beginPath();
			pincel.moveTo(190,50);
			pincel.lineTo(240,100);
			pincel.stroke();
			//braço esquerdo
			pincel.lineTo(290,50);
			pincel.stroke();
			//perna direita
			pincel.beginPath();
			pincel.moveTo(190,270);
			pincel.lineTo(240,220);
			pincel.stroke();
			//perna esquerda
			pincel.lineTo(290,270);
			pincel.stroke();
			//mensagem
			pincel.font = "62px Sans-Serif";
			pincel.fillStyle = "green";
			pincel.fillText("VOCÊ VENCEU!",0,350);
		}

		//quando perde
		if (numeroDeErros >= 6) {
			fimDeJogo = true;
			alert("Fim de Jogo!");
			//mensagem
			pincel.font = "62px Sans-Serif";
			pincel.fillStyle = "red";
			pincel.fillText("Você perdeu :(",37,365);
			//escreve palavra sorteada
			pincel.fillStyle = '#E5E5E5';
			pincel.fillRect(0,377,480,48);
			pincel.font = "48px Sans-Serif";
			pincel.fillStyle = "black";
			var comecoTraco = (480 - (palavraSorteada.length*50 + (palavraSorteada.length-1)*10))/2 + 10;
			for (var position = 0; position < palavraLetrasSeparadas.length; position++) {
				pincel.fillText(palavraLetrasSeparadas[position].toUpperCase(),comecoTraco+(60*position),430);
			}
		}
	}
}

function desistir(){
	if (fimDeJogo == false) {
		for(numeroDeErros;numeroDeErros<=6;numeroDeErros++){
			desenhaEnforcado();
		}
	}
	verificaFimDeJogo();
}

var todasPalavras = ["amarelo","azul","branco","laranja","marrom","preto","rosa","roxo","verde","vermelho"];
var numeroDePalavras = todasPalavras.length;

var tela = document.querySelector("canvas");
var pincel = tela.getContext('2d');

var a=65; var b=66; var c=67; var d=68; var e=69; var f=70; var g=71; var h=72; var i=73; var j=74; var k=75; var l=76; var m=77; var n=78; var o=79; var p=80; var q=81; var r=82; var s=83; var t=84; var u=85; var v=86; var w=87; var x=88; var y=89; var z=90;
var codigoTeclado = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z];
var alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var codigoTecladoNumeros = [48,49,50,51,52,53,54,55,56,57]

var palavraSorteada = escolherPalavraSecreta();
var palavraLetrasSeparadas = palavraSorteada.split("");
var palavraEmCodigo = [];
var converter = convertePalavraEmCodigo();
var achou = false;
var letraRepetida = false;
var fimDeJogo = false;
var somenteLetraMobile = false;
var letrasDigitadas = [];
var numeroDeAcertos = 0;
var numeroDeErros = 0;
var numeroDeLetrasDigitadas = 0;

var inputLetra = document.querySelector("#inputLetra")
var botaoConfirmarLetra = document.querySelector("#confirmarLetra");
var botaoNovoJogo = document.querySelector("#novoJogo");
var botaoDesistir = document.querySelector("#desistir");

botaoConfirmarLetra.onclick = digitarLetraMobile;
botaoDesistir.onclick = desistir;
botaoNovoJogo.onclick = limpaForca;

document.onkeydown = reconheceTeclado;
console.log(palavraSorteada);
console.log(todasPalavras);