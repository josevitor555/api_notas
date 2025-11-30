# Sistema de Gerenciamento de Notas Escolares

## 1. Introdução

### 1.1. Propósito

Este documento tem como objetivo descrever de forma precisa os requisitos funcionais e não funcionais do sistema de Gerenciamento de Notas Escolares, englobando suas funcionalidades principais, regras de negócio, módulos de autenticação e casos de uso. O sistema proposto disponibiliza uma interface de programação de aplicações (API) voltada ao cadastro e gerenciamento de alunos, professores, turmas, matérias e notas, garantindo segurança, consistência e integridade das informações.

### 1.2. Escopo

O sistema consiste em uma API RESTful que permitirá que administradores cadastrem e gerenciem usuários e turmas; professores lancem e atualizem notas; e alunos consultem seus resultados acadêmicos. A API será independente de interface gráfica, mas poderá ser integrada futuramente a aplicações web, mobile ou sistemas escolares.

### 1.3. Definições e Abreviações

- **API** – Application Programming Interface
- **JWT** – JSON Web Token, utilizado para autenticação e autorização
- **CRUD** – Create, Read, Update, Delete
- **MVP** – Minimum Viable Product (Produto Mínimo Viável)

## 2. Descrição Geral

### 2.1. Perspectiva do Produto

O sistema atuará como camada de backend para um ambiente de gestão escolar. Por meio de endpoints RESTful, será possível manipular dados referentes a alunos, professores, turmas, matérias e notas. A API utilizará autenticação baseada em papéis (roles), definindo permissões distintas para administradores, professores e alunos.

### 2.2. Usuários do Sistema

- **Administrador**: responsável pelo gerenciamento global do sistema, incluindo usuários, turmas e matérias.
- **Professor**: responsável pelo lançamento, atualização e consulta de notas em suas matérias.
- **Aluno**: responsável por consultar suas notas, médias e situação acadêmica final.

### 2.3. Restrições

- O sistema deverá operar em ambiente web.
- Um banco de dados relacional (ex.: MySQL ou PostgreSQL) será utilizado.
- A autenticação será obrigatória para todas as rotas, exceto para o endpoint de login.
- Apenas um professor poderá ser responsável por cada matéria.

## 3. Requisitos Funcionais

- **RF01 – Cadastro de Alunos**: O sistema deve permitir que o administrador cadastre novos alunos, informando dados pessoais e vinculando-os a uma turma.

- **RF02 – Edição e Exclusão de Alunos**: O administrador deve poder editar e remover cadastros de alunos.

- **RF03 – Cadastro de Professores**: O sistema deve permitir o cadastro de professores, contendo nome, e-mail e senha de acesso.

- **RF04 – Edição e Exclusão de Professores**: O administrador deve poder editar e remover professores do sistema.

- **RF05 – Cadastro de Turmas**: O sistema deve permitir o cadastro de turmas, associando-as a um ano letivo e, opcionalmente, a um professor coordenador.

- **RF06 – Cadastro de Matérias**: O administrador deve cadastrar matérias e associá-las a uma turma e a um professor responsável.

- **RF07 – Lançamento de Notas**: O professor deve poder lançar notas para os alunos vinculados à turma e à matéria sob sua responsabilidade.

- **RF08 – Atualização de Notas**: O professor deve poder atualizar notas já registradas, respeitando as permissões e vínculos acadêmicos.

- **RF09 – Consulta de Notas e Médias (Aluno)**: O aluno deve poder consultar suas notas, médias e situação final em cada matéria.

- **RF10 – Cálculo Automático de Médias**: O sistema deve calcular automaticamente a média das notas de cada aluno com base nas avaliações registradas.

- **RF11 – Determinação de Situação Final**: O sistema deve atribuir automaticamente a situação final do aluno:
  - Aprovado: média ≥ 7,0
  - Recuperação: 5,0 ≤ média < 7,0
  - Reprovado: média < 5,0

- **RF12 – Autenticação de Usuários**: O sistema deve autenticar administradores, professores e alunos por meio de JWT.

- **RF13 – Controle de Acesso por Perfil**: O sistema deve garantir que cada tipo de usuário acesse apenas as funcionalidades permitidas para seu perfil.

## 4. Requisitos Não Funcionais

- **RNF01 – Desempenho**: As respostas da API devem possuir tempo médio inferior a 1 segundo em condições normais.

- **RNF02 – Segurança**: A autenticação utilizará tokens JWT, e as senhas devem ser armazenadas com criptografia segura.

- **RNF03 – Escalabilidade**: A arquitetura da API deverá permitir integração futura com sistemas web ou mobile sem necessidade de alterações estruturais significativas.

- **RNF04 – Manutenibilidade**: A aplicação deve ser modular, seguindo separação entre controllers, models, services e rotas.

- **RNF05 – Padrões de API**: A API seguirá o estilo REST, utilizando métodos HTTP adequados e respostas em formato JSON.

- **RNF06 – Confiabilidade**: O sistema deve garantir a integridade das informações, impedindo o lançamento duplicado ou inconsistente de notas.

## 5. Casos de Uso

### Caso de Uso 1 – Cadastrar Aluno

**Ator Principal**: Administrador

**Descrição**: O administrador cadastra um novo aluno e o vincula a uma turma.

**Pré-condição**: Estar autenticado como administrador.

**Fluxo Principal**:
1. O administrador acessa o endpoint de cadastro de alunos.
2. Informa os dados obrigatórios (nome, e-mail, data de nascimento, turma).
3. O sistema valida as informações.
4. O sistema grava os dados no banco.
5. O sistema retorna sucesso e o ID do aluno criado.

**Fluxo Alternativo**:
- 2a. Caso algum campo obrigatório esteja ausente, o sistema retorna erro de validação.

### Caso de Uso 2 – Lançar Notas

**Ator Principal**: Professor

**Descrição**: O professor insere as notas dos alunos vinculados às matérias sob sua responsabilidade.

**Pré-condição**: Estar autenticado como professor e vinculado à matéria.

**Fluxo Principal**:
1. O professor acessa o endpoint de lançamento de notas.
2. Seleciona a matéria e o aluno.
3. Registra as notas (ex.: nota1, nota2).
4. O sistema calcula automaticamente a média.
5. O sistema determina a situação final (aprovado, recuperação ou reprovado).
6. O sistema confirma a operação.

### Caso de Uso 3 – Consultar Notas

**Ator Principal**: Aluno

**Descrição**: O aluno consulta suas notas, médias e situação final.

**Pré-condição**: Estar autenticado como aluno.

**Fluxo Principal**:
1. O aluno acessa o endpoint de consulta de notas.
2. O sistema retorna as notas, médias e situação final por matéria.

## 6. Considerações Finais

Esta versão representa o MVP do sistema de Gerenciamento de Notas Escolares. O escopo cobre as funcionalidades essenciais para cadastro de usuários, gerenciamento acadêmico e lançamento de notas. Funcionalidades futuras poderão incluir histórico de desempenho, dashboards analíticos, relatórios completos e integração com sistemas externos de instituições de ensino.

## 7. Tecnologias Utilizadas

- [AdonisJS](https://adonisjs.com/) - Framework Node.js para construção de APIs RESTful
- PostgreSQL/MySQL - Banco de dados relacional
- JWT - Autenticação e autorização
- TypeScript - Tipagem estática para JavaScript