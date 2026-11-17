# Sistema de Controle de Funcionários

Desenvolva uma aplicaçãopara o gerenciamento de funcionários de uma empresa. Os dados deverão salvos no **LocalStorage**.

---

## Modelo de Dados

Cada registro de funcionário armazenado no `LocalStorage` deve seguir a estrutura abaixo:

| Campo | Tipo | Regra / Restrição |
| :--- | :--- | :--- |
| **Nome** | `string` | Obrigatório |
| **CPF** | `string` | Obrigatório e **único** (não permitir duplicidade) |
| **Data de Nascimento** | `date` / `string` | Obrigatório |
| **Salário** | `number` | Obrigatório (valor numérico positivo) |
| **Função** | `string` | Obrigatório |
| **Estado Atual** | `string` | Valores permitidos: `"Ativo"` ou `"Demitido"` |

---

## Funcionalidades e Páginas Obrigatórias

### 1. Cadastro de Funcionário
- Formulário contendo os campos: *Nome*, *CPF*, *Data de Nascimento*, *Salário* e *Função*.
- **Regra de Negócio:** Todo funcionário deve ser cadastrado automaticamente com o **Estado Atual** definido como **Ativo**.
- **Validação:** Impedir o cadastro caso o CPF informado já exista no `LocalStorage`.

### 2. Alteração de Salário
- Interface para localizar o funcionário e informar o novo valor salarial.
- **Regra de Negócio:** O novo salário **não pode ser inferior** ao salário atual registrado para o funcionário. Caso seja menor, exibir mensagem de erro e bloquear a atualização.

### 3. Demissão de Funcionário
- Interface para selecionar ou buscar um funcionário **Ativo** e confirmar o desligamento.
- **Regra de Negócio:** Ao confirmar a ação, o registro não deve ser excluído do `LocalStorage`; apenas o **Estado Atual** deve ser alterado para **Demitido**.

### 4. Listagem de Funcionários
- Página de visualização que exibe os registros salvos no `LocalStorage`.
- **Regra de Negócio:** Os funcionários devem ser apresentados em **duas listas ou tabelas separadas**:
  1. **Funcionários Ativos**
  2. **Funcionários Demitidos**

---

## Requisitos Técnicos
- **Tecnologias:** HTML5, CSS3 e JavaScript.
- **Persistência:** Uso de `localStorage.getItem()` e `localStorage.setItem()` com serialização via `JSON.stringify()` e `JSON.parse()`.
- **Navegação:** Menu acessível entre todas as páginas da aplicação.
