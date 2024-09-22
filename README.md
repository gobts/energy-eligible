# Documentação do Servidor - API de Elegibilidade

## Visão Geral

Este servidor é responsável por verificar a elegibilidade de um cliente para um determinado serviço. A API expõe um endpoint que recebe dados de entrada como o tipo de conexão, classe de consumo, modalidade tarifária e o histórico de consumo, e retorna se o cliente é elegível ou não.

Como Iniciar o Servidor

1. Instalar dependências:
yarn 
```sh
    yarn
```

npm
```sh
    npm install
```

2. Iniciar o servidor:
-  em modo de desenvolvedor

```sh
    yarn start:dev
```
- en modo prod:
```sh
    yarn build
    yarn start
```

O servidor será iniciado na porta 3000. Para acessar, utilize:

```sh
    http://localhost:3000
```

## Endpoints

1. Verificação de Elegibilidade - `/api/eligibility`

Este endpoint POST recebe dados sobre o cliente e verifica se ele é elegível para o serviço.

* URL: /api/eligibility
* Método: POST
* Corpo da Requisição (payload):
```json
{
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
    3878,
    9760,
    5976,
    2797,
    2481,
    5731,
    7538,
    4392,
    7859,
    4160,
    6941,
    4597
  ]
}
```

###  Parâmetros:
 * numeroDoDocumento (string): O número de documento do cliente (CPF ou CNPJ).
 * tipoDeConexao (string): O tipo de conexão do cliente. Valores possíveis: monofasico, bifasico, trifasico.
 * classeDeConsumo (string): A classe de consumo do cliente. Valores possíveis: residencial, comercial, industrial.
 * modalidadeTarifaria (string): A modalidade tarifária do cliente. Valores possíveis: convencional, branca.
 * historicoDeConsumo (array de inteiros): Histórico de consumo em kWh dos últimos 12 meses.

 ###  Exemplo de Requisição:
 ```bash
curl -X POST http://localhost:3000/api/eligibility \
-H "Content-Type: application/json" \
-d '{
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597]
}'
```

### Respostas:

1. 200 OK - Cliente elegível:
```json
{
  "elegivel": true,
  "economiaAnualDeCO2": 4584.04
}
```

2. 400 Bad Request - Cliente inelegível:
```json
{
  "elegivel": false,
  "razoesDeInelegibilidade": [
    "Modalidade tarifária não aceita"
  ]
}
```

3. 400 Bad Request - Erro de validação do schema:
```json
{
  "errors": [
    "Modalidade de Tarifa invalida"
  ]
}
```

## Como Executar Testes:

1. Testes Unitários:

Para rodar os testes unitários:

```sh
yarn test
```

1. Testes Unitários com covertura:

Para rodar os testes unitários com covertura:

```sh
yarn test:cov
```

3. Testes de Integração (e2e):
Para rodar os testes de integração:

```sh
yarn test:e2e
```

## Tecnologias Utilizadas:
* Node.js: Runtime de JavaScript utilizado para executar o servidor.
* Express: Framework minimalista para o servidor web.
* Jest: Ferramenta para testes unitários e de integração.
* Supertest: Ferramenta para testes de integração com APIs HTTP.