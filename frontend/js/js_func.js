//===========================================cadastro inicio===========================================//



const nomec = document.getElementById("jscad_nomec")
const cpfc = document.getElementById("jscad_cpf")
const datac = document.getElementById("jscad_data")
const salarioc = document.getElementById("jscad_salario")
const funcaoc = document.getElementById("jscad_funcao")
const cadastro = JSON.parse(localStorage.getItem("cadastro")) || []







function salvarcad() {
    if (!nomec.value.trim() && !cpfc.value.trim() && !datac.value.trim() && !salarioc.value.trim() && !funcaoc.value.trim()) {
        alert("Existem Campos Vazios!")
        return;
    }
    if (!/^[A-Za-zÁ-ý\s]+$/.test(nomec.value)) {
        alert("Campos de Nome e Função Não podem Conter Números")
        return
    }
    if (!/^\d{11}$/.test(cpfc.value)) {
        alert("CPF Precisa Ter 11 Dígitos!!!")
        return
    }
    if (salarioc.value < 0) {
        alert("Salário não pode ser menor do que 0")
        return
    }


    let existe = false
    for (let funcionario of cadastro) {
        if (funcionario.cpf === cpfc.value) {
            existe = true

        }

    }
    if (existe == true) {
        alert("funcionario já cadastrado")
        return
    }


    const dadoscad = {
        nome: nomec.value,
        cpf: cpfc.value,
        nascimento: datac.value,
        salario: salarioc.value,
        funcao: funcaoc.value,
        status: "ATIVO"
    }

    // console.log(dadoscad.nomec)
    cadastro.push(dadoscad)
    localStorage.setItem("cadastro", JSON.stringify(cadastro))
    alert("Cadastro ok")
}


//===========================================cadastro fim===========================================//


//===========================================alteracao inicio===========================================//


const cpfe = document.getElementById("jsed_cpf")
const nomee = document.getElementById("jsed_nomee")
const salarioe = document.getElementById("jsed_salarioe")


async function buscar_cad() {
    const cad = cadastro.find(item => item.cpf == cpfe.value);
    if (cad) {
        nomee.value = cad.nome;
    } else {
        alert("Funcionário não encontrado!");
    }


}



function edit_sal() {
    const cad = cadastro.find(item => item.cpf == cpfe.value);

    if (cad) {
        const nsal = Number(salarioe.value);
        if (nsal < Number(cad.salario) && cad.status == "ATIVO") {
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


async function buscar_deslig() {
    const cad = cadastro.find(item => item.cpf == cpfd.value);
    if (cad) {
        nomed.value = cad.nome;
    } else {
        alert("Funcionário não encontrado!");
    }


}



function edit_status() {
    const cad = cadastro.find(item => item.cpf == cpfd.value);

    if (cad) {
        const nstatus = "DESLIGADO";
        if (!nstatus) {
            alert("erro ");
            return;
        }
        cad.status = nstatus;

        localStorage.setItem("cadastro", JSON.stringify(cadastro))
        alert(`O Funcionário ${nomed.value} foi ${cad.status} com sucesso!!!`);

    }




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
    nomeRelatorio = "De Inativos";
    relatorio();
}



function relatorio() {
    if (campo.value === "cadi") {
        let i = 1
        function listarativos() {
            // dadosrl.innerHTML = 'Relatório de Cadastro de Clientes'
            dadosrl.innerHTML = `<span style="color: red;font-size: 1.8rem;"> => <span style="color: black;"> Relatório ${nomeRelatorio} <span style="color: red;"> <= <span style="color: black;">`;



            for (let funcionario of cadastro) {
                if (funcionario.status === "DESLIGADO") {
                    dadosrl.innerHTML += `<p>${i++}º <span style="color: red;"> => <span style="color: black;"> ${funcionario.nome} | Função: ${funcionario.funcao} | Salário: R$ ${funcionario.salario} | Status: ${funcionario.status} <span style="color: red;"> <= <span style="color: black;"> </p>`;
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
                    if (funcionario.status === "ATIVO") {
                        dadosrl.innerHTML += `<p>${i++}º <span style="color: red;"> => <span style="color: black;"> ${funcionario.nome} | Função: ${funcionario.funcao} | Salário: R$ ${funcionario.salario} | Status: ${funcionario.status} <span style="color: red;"> <= <span style="color: black;"> </p>`;
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


