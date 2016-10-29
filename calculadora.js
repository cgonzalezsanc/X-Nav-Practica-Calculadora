$(document).ready(function() {
	var valor = 0;
	var operador = '';
	var es_resultado = false; //variable que indica si se acaba de calcular un resultado
	// Funcionalidad basica
	$(".numero").click(function() {
		if ($(".pantalla").html() === "ERROR" || es_resultado) {
			$(".pantalla").html($(this).html());
			valor = 0;
			operador = '';
		} else {
			$(".pantalla").append($(this).html());
		}
		es_resultado = false;
	});
	$(".operador").click(function() {
		if (valor === 0) {
			if ($(".pantalla").html()==='') {
				hayError(operador,es_resultado,valor);
			} else {
				valor = $(".pantalla").html();
				operador = $(this).html();
				$(".pantalla").html('');
				es_resultado = false;
			}
		} else {
			if ($(".pantalla").html()==='') {
				hayError(operador,es_resultado,valor);
			} else {
				var aux = $(".pantalla").html();
				valor = calcular(valor,aux,operador);
				$(".pantalla").html('');
				operador = $(this).html();
				es_resultado = false;
			}
		}	
	});
	$(".cancel").click(function() {
		$(".pantalla").html($(".pantalla").html().slice(0,-1));
	});
	$(".calcular").click(function() {
		if ($(".pantalla").html()==='') {
			hayError(operador,es_resultado,valor);
		} else {
			var valor2 = $(".pantalla").html();
			var resultado = calcular(valor,valor2,operador);
			es_resultado = true;
			$(".pantalla").html(resultado);
		}
		valor = 0;
	});
	$(document).keypress(function(input) {
		if (input.key >= 0 && input.key <= 9) {
			if ($(".pantalla").html() === "ERROR" || es_resultado) {
				$(".pantalla").html(input.key);
				valor = 0;
				operador = '';
			} else {
				$(".pantalla").append(input.key);
			}
			es_resultado = false;
		} else if ($.inArray(input.key,['+','-','*','/']) >= 0) {
			if (valor === 0) {
				if ($(".pantalla").html()==='') {
					hayError(operador,es_resultado,valor);
				} else {
					valor = $(".pantalla").html();
					operador = input.key;
					$(".pantalla").html('');
					es_resultado = false;
				}
			} else {
				if ($(".pantalla").html()==='') {
					hayError(operador,es_resultado,valor);
				} else {
					var aux = $(".pantalla").html();
					valor = calcular(valor,aux,operador);
					$(".pantalla").html('');
					operador = input.key;
					es_resultado = false;
				}
			}	
		} else if (input.key === "Enter") {
			if ($(".pantalla").html()==='') {
				hayError(operador,es_resultado,valor);
			} else {
				var valor2 = $(".pantalla").html();
				var resultado = calcular(valor,valor2,operador);
				es_resultado = true;
				$(".pantalla").html(resultado);
			}
			valor = 0;
		} else {
			hayError(operador,es_resultado,valor);
		}
	});
	// Funcionalidad extra
	$(".numero, .operador, .calcular").hover(
		function() {
			$(this).attr('id', 'marcado');
		}, function() {
			$(this).removeAttr('id');
	});
});

function hayError(operador,es_resultado,valor) {
	$(".pantalla").html("ERROR");
	operador = "";
	es_resultado = false;
	valor = 0;
}

function calcular(valor1, valor2, operador) {
	switch (operador) {
		case '+':
			resultado = parseInt(valor1) + parseInt(valor2);
			break;
		case '-':
			resultado = parseInt(valor1) - parseInt(valor2);
			break;
		case '*':
			resultado = parseInt(valor1) * parseInt(valor2);
			break;
		case '/':
			resultado = parseInt(valor1) / parseInt(valor2);
			break;
		default: 
			resultado = "ERROR";
	}
	return resultado;
}
