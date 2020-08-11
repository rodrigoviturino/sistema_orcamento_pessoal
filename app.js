class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
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
		$("#validacaoFormDespesas").modal("show")
	} else {
		$("#validacaoFormDespesas").modal("show")
	}

}
