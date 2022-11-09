<!--
title: 'Serverless Framework Node Express API on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Posts API - Serverless Framework Node Express API on AWS

Esse é o repositório para o back-end da aplicação Posts. Foi criada uma API Rest com Node Express, rodando em uma Lambda AWS usando o framework Serverless.

## Tecnologias utilizadas
* Node.js
* Express
* Mongoose (mongoDB)
* Serverless


## Estrutura do projeto
A estrutura de pastas do projeto é explicada a seguir:

| Nome | Descrição |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **handler.js**                 | Entrada da aplicação, contém as rotas e conexão ao banco de dados.  |
| **node_modules**         | Contém todas as dependências npm                                                           |
| **src**                  | Contém os diretórios src/db, src/posts e src/utils                              |
| **src/db**               | Contém arquivo seeder.js, para realizar um processo de seeding inicial
| **src/posts      **      | Contém todo o domínio de Posts: com seus respectivos controllers, models, repositories, services, dtos, factory e middlewares.
| **src/posts/__mocks__**  | Contém todos os mocks da aplicação.
| **src/posts/controllers** | Contém o controller de Posts com os métodos: getAll, getById, create, update e delete. Acompanha arquivo de testes de controller.
| **src/factories**           | Contém função postFactory, responsável por instanciar repository, service e controller.                       
| **src/middlewares**           | Contém funções de validação de "title" e "content" recebidos das requisições, assim como função para retornar erros de Promise.  |
| **src/models**      | Contém o Schema para a model de posts e cria Model da aplicação. |
| **src/repositories**         | Contém classe PostRepository: repositório com os métodos getAll, getById, create, update e delete.    |
| package.json             | Contém todas as dependências instaladas assim como os scripts da aplicação                             | **src/services**     | Contém classe PostService: serviço com os métodos getAll, getById, create, update e delete.
| **src/utils**              | Contém 3 arquivos: 1. json.validator.js para validar JSONs, 2. status.code.js para concentrar os status e mensagens da aplicação. 3. testes de status.code.js                                             |
| **serverless.yml**         | Declara o serviço serverless, define o cloud provider (AWS) e funções e eventos a serem executados no deploy     |


## Pré-requisitos
- É esperado que o <a href="https://nodejs.org/en/">Node.js</a> esteja instalado.
- Na raiz no projeto, crie um arquivo <strong>.env</strong>, adicione sua string de conexão do MongoDB à chave MONGO, como demonstrado a seguir:
```
MONGO=<sua-string-de-conexão>
```

### Instalação

Instale as dependências:

```
npm install
```

Rode o script de seed:

```
npm run seed
```

Rode o script para rodar localmente:

```
npm run local
```

Ou, para realizar o deploy:
```
serverless deploy
```

### Rodando os testes
Para executar os testes, rode o script:
```
npm test
```
Para visualizar a cobertura de testes da aplicação, use o script:
```
npm run coverage
```

### Quantidade de testes realizados e cobertura da aplicação:
![E2iF52f](https://user-images.githubusercontent.com/97243572/200716466-eee74c7e-781d-4d9a-8232-e8798d3e1af1.png)


## Como usar os endpoints
| Endpoint | Input |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| GET /                 | Não é necessário input, retornará todas as postagens  |
| GET /:id         | Necessário indicar id válido nos parâmetros da rota, retorna o post com o id selecionado.             |
| POST /                  | Necessário informar JSON válido (exemplo: { "title": "sua publicação", "content": "conteúdo dessa publicação"}), retornará a postagem criada. Observação: a chave "content" não é obrigatória para criar postagem.                              |
| PUT /:id         | Necessário indicar id válido nos parâmetros da rota e qual chave deseja alterar (title, content).             |
| DELETE /:id         | Necessário indicar id válido nos parâmetros da rota, retorna post excluido.             |

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[coverage-screenshot]: https://i.imgur.com/E2iF52f.png
