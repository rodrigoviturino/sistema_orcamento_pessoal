class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor

		this.modalEl = document.querySelector("#validacaoFormDesepesas");
	}

	validarDados(){
		for(let i in this){
			if(this[i] == false) {
				return false
			}
		}
		return true;
		
	}
}

class Db {

	constructor(){
		let id = localStorage.getItem("id");

		if(id === null){
			localStorage.setItem("id",0)
		}
	}

	getProximoId(){
		let proximoId = localStorage.getItem("id");
		return (+proximoId) + 1;
	}	

	gravar(data){
		// return localStorage.setItem("despesa", JSON.stringify(data));
		let id = this.getProximoId();

		localStorage.setItem(id, JSON.stringify(data));

		localStorage.setItem("id", id);
	}

	recuperaTodosRegistros(){
		let id = localStorage.getItem("id");
		let arrayDespesas = [];

		for (let i = 1; i <= id; i++) {
			let despesa = JSON.parse(localStorage.getItem(i));

			// Macete: Caso tenha algum indice apagado, ele ignora e só traz os que estão com valor
			if(despesa === null ){
				continue;
			}

			arrayDespesas.push(despesa);
		}

		return arrayDespesas;
	}

	pesquisar(despesa){

		let despesasFiltradas = [];

		despesasFiltradas = this.recuperaTodosRegistros();

		// dia
		// if(despesa.dia != ""){
		// 	despesasFiltradas = despesasFiltradas.filter((item) => {
		// 		item.dia == despesa.dia;
		// 	})
		// }

		// mes
		if(despesa.mes != ""){
			despesasFiltradas = despesasFiltradas.filter((item) => {
				return item.mes == despesa.mes;
			})
		}

		// ano
		if(despesa.ano != ""){
			despesasFiltradas = despesasFiltradas.filter((item) => {
				return item.ano == despesa.ano;
			})
		}

		// // tipo
		// if(despesa.tipo != ""){
		// 	despesasFiltradas = despesasFiltradas.filter((item) => {
		// 		item.tipo == despesa.tipo;
		// 	})
		// }

		// // descricao
		// if(despesa.descricao != ""){
		// 	despesasFiltradas = despesasFiltradas.filter((item) => {
		// 		item.descricao == despesa.descricao;
		// 	})
		// }


		console.log(despesasFiltradas);

		// console.log(despesa);
	}
}

let db = new Db();

function cadastrarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value
	)

	if( despesa.validarDados() ) {
		db.gravar(despesa)
		let titulo = document.querySelector(".modal-title");
		
		let btn = document.querySelector(".modal-footer button");
		titulo.innerHTML = "Registro inserido com sucesso";
		
		btn.innerHTML = "Voltar";
		titulo.setAttribute("class", "text-success");
		btn.setAttribute("class", "btn btn-success");
		$("#validacaoFormDespesas").modal("show");

		// Resetando os campos ao registrar
		ano.value = "";
		mes.value = "";
		dia.value = "";
		tipo.value = "";
		descricao.value = "";
		valor.value = "";
		
	} 
		else
	{
		let titulo = document.querySelector(".modal-title");
		let btn = document.querySelector(".modal-footer button");
		titulo.innerHTML = "Dados incompleto, verifique!";
		btn.innerHTML = "Voltar e corrigir!";
		titulo.setAttribute("class", "text-danger");
		btn.setAttribute("class", "btn btn-danger");
		$("#validacaoFormDespesas").modal("show")
	}

}

function carregaListaDespesas(){
	let despesas = [];

	despesas = db.recuperaTodosRegistros();
	// console.log(despesas);

	let rowTable = document.querySelector("[data-table='consulta'] tbody");
	// let tdTable = document.createElement("tr");

	despesas.forEach((item) => {
		let linha = rowTable.insertRow();

		
		// setando o TIPO
		switch(item.tipo){
			case '1': item.tipo = "Alimentação";
			break
			case '2': item.tipo = "Educação";
			break
			case '3': item.tipo = "Lazer";
			break
			case '4': item.tipo = "Saúde";
			break
			case '5': item.tipo = "Transporte";
			break
			
		}
		
		linha.insertCell(0).innerHTML = `${item.dia}/${item.mes}/${item.ano}`;
		linha.insertCell(1).innerHTML = `${item.tipo}`;
		linha.insertCell(2).innerHTML = `${item.descricao}`;
		linha.insertCell(3).innerHTML = `${item.valor}`;

	})
	// rowTable.appendChild(tdTable)

	// console.log(rowTable);
	// return rowTable;
}

function pesquisarDespesa(){
	let ano = document.querySelector("#ano").value;
	let mes = document.querySelector("#mes").value;
	let dia = document.querySelector("#dia").value;
	let tipo = document.querySelector("#tipo").value;
	let descricao = document.querySelector("#descricao").value;
	let valor = document.querySelector("#valor").value;

	let despesa = new Despesa(ano, mes, dia , tipo, descricao, valor);

	db.pesquisar(despesa);
}