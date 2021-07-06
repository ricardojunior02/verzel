# Teste FullStack Verzel

## Inicialização

Para Iniciar o projeto basta rodar yarn ou npm install, o gerenciador de pacotes que preferir
Após a instalação das dependencias é preciso preencher algumas informações no .env arquivo, neste projeto foi utilizado o banco mongoDB,
então deve-se fornecer a url de conexão na variável MONGO_URL, existe também rotas autorizadas somente para usuários admin logados,
para acesso a essas rotas é necessário preencher tres informações no .env arquivo, SECRET_TOKEN, ADMIN_MAIL e ADMIN_PASSWORD, variáveis que serão
usadas para cadastrar um usuário admin e gerar um token na hora do login.
Após os passos anteriores, podemos rodar a seed de usuário admin com o comando yarn seeds ou npm run seeds, e em seguida já podemos
inicializar a aplicação com yarn dev ou npm run dev

## Endpoints da aplicação

## Endpoint de Sessão

### POST /session

#### Parâmetros

Recebe um body json com email e password, os mesmos adicionados no .env de usuário admin

#### Respostas

Retorna um json com informações do usuário admin junto com o token a ser usado nas rotas protegidas por autenticação de usuários admin.

## Endpoints de Módulos

### POST /modules

#### Parâmetros

Deve receber um Bearer token de autorização.
Recebe também um body json, com uma propriedade name e um valor obrigatório

{
"name": "módulo de teste"
}

#### Respostas

Retorna um status code 201 com o objeto do módulo criado

### GET /modules

#### Parâmetros

Não recebe nenhum parâmetro, rota publica para acesso aos módulos

#### Respostas

Retorna um array com todos os modulos cadastrados na aplicação

### DELETE /modules/:module_id

#### Parâmetros

Deve receber um Bearer token de autorização, e o id do módulo a ser deletado

#### Respostas

Retorna um status code 200.

### PUT /modules/:modules_id

#### Parâmetros

Deve receber um Bearer token de autorização, e o id do módulo a ser atualizado

Recebe também um body json com os dados a serem atualizados, no caso uma propriedade name e um valor

{
"name": "módulo atualizado"
}

## Endpoints de Aulas

### POST /classes/:module_id

#### Parâmetros

Deve receber um Bearer token de autorização, e o id do módulo ao qual a aula irá pertencer
recebe também um body json com as informações necessarias para criar uma aula como name e class_date que deve ser no formato Timestamp ISO-8601,
o class_date deve ser uma data futura ao momento da criação

{
"name": "Aula teste",
"class_date": "2021-07-05T21:00:00.001Z"
}

### GET /classes;:module_id

#### Parâmetros

Deve receber o id do módulo que as aulas pertencem

#### Retorno

Retorna um array com todas as aulas de um módulo

### DELETE /classes/:class_id

#### Parâmetros

Deve receber o id da aula a ser deletada

#### Retorno

Retorna um status code 200.

### PUT /classes/:class_id

#### Parâmetros

Deve receber o id da aula a ser atualizada.
Recebe tambem um body json com as informações a serem atualizadas.

#### Retornos

Retorna um status code 200.
