//===========================================cadastro inicio===========================================//



const nomec = document.getElementById("jscad_nomec")
const cpfc = document.getElementById("jscad_cpf")
const datac = document.getElementById("jscad_data")
const salarioc = document.getElementById("jscad_salario")
const funcaoc = document.getElementById("jscad_funcao")
const cadastro = JSON.parse(localStorage.getItem("cadastro")) || []







function salvarcad() {
    if (!nomec.value.trim() || !cpfc.value.trim() || !datac.value.trim() || !salarioc.value.trim() || !funcaoc.value.trim()) {
        alert("Existem Campos Vazios!")
        return;
    }
    if (/\d/.test(nomec.value)) {
        alert("O nome não pode conter números.");
        return;
    }

    if (!/^\d{11}$/.test(cpfc.value.trim())) {
        alert("CPF Precisa Ter 11 Dígitos!!!")
        return
    }
    if (Number(salarioc.value) < 0) {
        alert("Salário não pode ser menor do que 0")
        return
    }


    let existe = false
    for (let funcionario of cadastro) {
        if (funcionario.cpf === cpfc.value.trim()) {
            existe = true

        }

    }
    if (existe == true) {
        alert("funcionario já cadastrado")
        return
    }


    const dadoscad = {
        nome: nomec.value.trim(),
        cpf: cpfc.value.trim(),
        nascimento: datac.value,
        salario: Number(salarioc.value),
        funcao: funcaoc.value.trim(),
        status: "Ativo"
    }

    cadastro.push(dadoscad)
    localStorage.setItem("cadastro", JSON.stringify(cadastro))
    alert("Cadastro realizado com sucesso!")
}


//===========================================cadastro fim===========================================//


//===========================================alteracao inicio===========================================//


const cpfe = document.getElementById("jsed_cpf")
const nomee = document.getElementById("jsed_nomee")
const salarioe = document.getElementById("jsed_salarioe")


function buscar_cad() {
    const cad = cadastro.find(item => item.cpf == cpfe.value.trim());
    if (cad) {
        nomee.value = cad.nome;
    } else {
        alert("Funcionário não encontrado!");
    }


}



function edit_sal() {
    const cad = cadastro.find(item => item.cpf == cpfe.value.trim());

    if (!cad) {
        alert("Funcionário não encontrado!");
        return;
    }


    if (cad) {
        const nsal = Number(salarioe.value);
        if (salarioe.value.trim() === "") {
        alert("Informe um salário válido.");
        return;
    }
        if (nsal < Number(cad.salario)) {
        alert("O novo salário não pode ser inferior ao salário atual.");
        return;
    }


        if (nsal < Number(cad.salario)) {
            alert("erro sal");
            return;
        }
        cad.salario = nsal;

        localStorage.setItem("cadastro", JSON.stringify(cadastro))
        alert(`Salário do ${nomee.value} foi alterado para ${cad.salario} com sucesso!!!`);

    }




}

//===========================================alteracao fim===========================================//

//===========================================Desligamento inicio===========================================//
const cpfd = document.getElementById("jsde_cpf")
const nomed = document.getElementById("jsde_nomed")


function buscar_deslig() {
    const cad = cadastro.find(item => item.cpf == cpfd.value.trim());
    if (cad) {
        nomed.value = cad.nome;
    } else {
        alert("Funcionário não encontrado!");
    }


}



function edit_status() {
    const cad = cadastro.find(item => item.cpf == cpfd.value.trim());

        if (!cad) {
        alert("Funcionário não encontrado!");
        return;
    }
    if (cad.status !== "Ativo") {
        alert("Precisa ser Ativo para Desligar.");
        return;
    }



        cad.status = "Demitido";

        localStorage.setItem("cadastro", JSON.stringify(cadastro))
        alert(`O Funcionário ${nomed.value} foi ${cad.status} com sucesso!!!`);

    




}

//===========================================Desligamento fim===========================================//

//===========================================relatorios inicio===========================================//


const dadosrl = document.getElementById("listar")
const campo = document.getElementById('js_filtro');



let nomeRelatorio = "";
function cada() {
    campo.value = "cada";
    nomeRelatorio = "De Ativos";
    relatorio();
}
function cadi() {
    campo.value = "cadi";
    nomeRelatorio = "De Demitidos";
    relatorio();
}



function relatorio() {
    if (campo.value === "cadi") {
        let i = 1
        function listarativos() {
            // dadosrl.innerHTML = 'Relatório de Cadastro de Clientes'
            dadosrl.innerHTML = `<span style="color: red;font-size: 1.8rem;"> => <span style="color: black;"> Relatório ${nomeRelatorio} <span style="color: red;"> <= <span style="color: black;">`;



            for (let funcionario of cadastro) {
                if (funcionario.status === "Demitido") {
                    dadosrl.innerHTML += `<p>${i++}º <span style="color: red;"> => <span style="color: black;"> Nome do Funcionário: ${funcionario.nome} || CPF: ${funcionario.cpf} || Função: ${funcionario.funcao} || Salário: R$ ${funcionario.salario} || Status: ${funcionario.status} <span style="color: red;"> <= <span style="color: black;"> </p>`;
                }
            }
        }
        listarativos()
    } else {
        if (campo.value === "cada") {
            let i = 1
            function listarinativos() {
                // dadosrl.innerHTML = 'Relatório de Cadastro de Produtos'
                dadosrl.innerHTML = `<span style="color: red; font-size: 1.8rem;"> => <span style="color: black;">Relatório ${nomeRelatorio}<span style="color: red;"> <= <span style="color: black;">`;
                for (let funcionario of cadastro) {
                    if (funcionario.status === "Ativo") {
                        dadosrl.innerHTML += `<p>${i++}º <span style="color: red;"> => <span style="color: black;"> Nome do Funcionário: ${funcionario.nome} || CPF: ${funcionario.cpf} || Função: ${funcionario.funcao} || Salário: R$ ${funcionario.salario} || Status: ${funcionario.status} <span style="color: red;"> <= <span style="color: black;"> </p>`;
                    }
                }

            }
            listarinativos()
        } else {

            dadosrl.innerHTML = '<p>Selecione uma opção nos botões acima</p>';
        }
    }
}


//===========================================relatorios fim===========================================//


function mostrarRelatorio() {
    const listaAtivos = document.getElementById("listaAtivos");
    const listaDemitidos = document.getElementById("listaDemitidos");

    if (!listaAtivos || !listaDemitidos) {
        return;
    }

    listaAtivos.innerHTML = "";
    listaDemitidos.innerHTML = "";

    let iAtivo = 1;
    let iDemitido = 1;

    for (let funcionario of cadastro) {
        if (funcionario.status === "Ativo") {
            listaAtivos.innerHTML += `<p>${iAtivo++} - ${funcionario.nome} | CPF: ${funcionario.cpf} | Função: ${funcionario.funcao} | Salário: R$ ${funcionario.salario}</p>`;
        } else if (funcionario.status === "Demitido") {
            listaDemitidos.innerHTML += `<p>${iDemitido++} - ${funcionario.nome} | CPF: ${funcionario.cpf} | Função: ${funcionario.funcao} | Salário: R$ ${funcionario.salario}</p>`;
        }
    }

    if (listaAtivos.innerHTML === "") {
        listaAtivos.innerHTML = "<p>Nenhum funcionário ativo.</p>";
    }
    if (listaDemitidos.innerHTML === "") {
        listaDemitidos.innerHTML = "<p>Nenhum funcionário demitido.</p>";
    }
}

mostrarRelatorio();