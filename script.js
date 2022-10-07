//Funcionalidades do Site



//JOGO EM SI
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

function desenhaLetrasAcertos(evento) {
	var comecoTraco = (480 - (palavraSorteada.length*50 + (palavraSorteada.length-1)*10))/2 + 10;

    for (posicao=0; posicao<=palavraEmCodigo.length; posicao++) {
		if(evento.keyCode == palavraEmCodigo[posicao]) {
			pincel.fillText(palavraLetrasSeparadas[posicao].toUpperCase(),comecoTraco+(60*posicao),425);
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
		}
	}
	pincel.font = "48px Sans-Serif";
}

function reconhecePalavraRepetida() {

}

function desenhaEnforcado() {

}

function reconheceTeclado(evento) {
	achou = false;

    for (var posicaoTeclado=0;posicaoTeclado<codigoTecladoNumeros.length;posicaoTeclado++) {
		if (codigoTecladoNumeros[posicaoTeclado]== evento.keyCode) {
			alert("Por favor, digite uma letra");
		} else {
			for (posicao=0; posicao<=palavraEmCodigo.length; posicao++) {
				if (evento.keyCode == palavraEmCodigo[posicao]) {
					achou = true;
					letrasDigitadas.push(palavraEmCodigo[posicao]);

                    desenhaLetrasAcertos(evento);
                            
                    numeroDeAcertos++;
                    numeroDeLetrasDigitadas++;
                }
			}
		}
	}

    if(achou==false) {
        for (posicao=0; posicao<=codigoTeclado.length; posicao++) {
            if (evento.keyCode == codigoTeclado[posicao]) {
		        alert("você errou!")
            }
        }
		desenhaLetrasErros(evento);
	}

    alert("Número de acertos " + numeroDeAcertos + ". Número de erros " + numeroDeErros);
}

var todasPalavras = ["amarelo","azul","branco","laranja","marrom","preto","rosa","roxo","verde","vermelho"];
var numeroDePalavras = todasPalavras.length;

var botaoNovoJogo = document.querySelector("#novoJogo");

//botaoNovoJogo.onclick = escolherPalavraSecreta;

var tela = document.querySelector("canvas");
var pincel = tela.getContext('2d');

pincel.fillStyle = '#E5E5E5';
pincel.fillRect(0,0,480,650);
pincel.fillStyle = "#0A3871";
pincel.strokeStyle = "#0A3871";
pincel.lineWidth = 3;

var a=65; var b=66; var c=67; var d=68; var e=69; var f=70; var g=71; var h=72; var i=73; var j=74; var k=75; var l=76; var m=77; var n=78; var o=79; var p=80; var q=81; var r=82; var s=83; var t=84; var u=85; var v=86; var w=87; var x=88; var y=89; var z=90;
var codigoTeclado = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z];
var alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var codigoTecladoNumeros = [48,49,50,51,52,53,54,55,56,57]

var comecaJogo = limpaForca();
var palavraSorteada = escolherPalavraSecreta();
var palavraLetrasSeparadas = palavraSorteada.split("");
var desenha = desenhaTracinhos();
var palavraEmCodigo = [];
var converter = convertePalavraEmCodigo();
var achou = false;
var letrasDigitadas = [];
var numeroDeAcertos = 0;
var numeroDeErros = 0;
var numeroDeLetrasDigitadas = 0;
document.onkeydown = reconheceTeclado;
console.log(palavraSorteada);
console.log(palavraEmCodigo);
console.log(numeroDeAcertos);
console.log(numeroDeErros);
console.log(achou);
console.log(letrasDigitadas);



//desenho forca
//cabeça
pincel.beginPath();
pincel.arc(330,55,25,0,2*Math.PI);
pincel.stroke();
//corpo
pincel.fillRect(329,80,3,140);
//braços
pincel.beginPath();
pincel.moveTo(280,130);
//braço direito
pincel.lineTo(330,80);
//braço esquerdo
pincel.lineTo(380,130);
pincel.stroke();
//pernas
pincel.beginPath();
pincel.moveTo(280,270);
//perna direita
pincel.lineTo(330,220);
//perna esquerda
pincel.lineTo(380,270);
pincel.stroke();