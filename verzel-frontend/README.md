# Teste FullSatck Verzel

## Inicialização

Para iniciar o aplicativo antes temos de realizar alguns passos.

Antes de mais nada precisamos já estar com o back-end rodando, e após isso podemos seguir os próximos passos.

Deve-se rodar o comando yarn ou npm install, para instalar as dependencias do app,
em seguida deve-se preencher algumas informações no arquivo .env, como REACT_APP_API_URL que é a url de conexão com o backend,
REACT_APP_LOCAL_STORAGE que é o nome da chave onde vamos armazenar nosso token de autenticação.
Após isso ja podemos iniciar o app com yarn start ou npm start.

## Instruções de uso

Já com o app rodando temos acesso aos módulos existentes, que ao início não tera nenhum.

### Realizando login

Para fazer login de admin existe no header um botão de ADMIN LOGIN, ao clicar nele será redirecionado para a tela de login, onde se deve fornecer o email e password fornecidos lá no .env do backend.
Após realizar o submit de login será redirecionado para a tela inicial, agora com acesso a ações permitidas somente para admin, como criar módulos e aulas, através de dois botões no header.

### Criando módulos

Agora temos acesso a criação de módulos através do botão CRIAR MÓDULOS, no header do app.
Ao clicar você será redirecionado a página de criação de módulos onde deve-se fornecer um nome, e clicar no botão CADASTRAR, após essas ações será redirecionado para a página home, e agora temos um módulo a ser exibido.

### Editando módulo

Por estar logado como um admin, temos acesso a duas ações no módulo, deletar e editar, para editar vamos clicar no botão com ícone de caneta onde será aberto um modal com as informações do módulo a ser editado, podemos manter as informações e clicar em CANCELAR para fechar o modal ou mudar o nome e clicar em ATUALIZAR e o model será fechado sozinho atualizando o nome do módulo, caso você limpe o input do nome e clique em atualizar, ele irá manter o nome original, já que não podemos ter módulos sem nome.

### Deletando módulo

Como vimos acima temos acesso a duas ações em nosso módulo, agora vamos falar sobre a de deletar um módulo, basta clicarmos no botão com o ícone de lixeira, ele irá abrir um modal de confirmação, onde temos um aviso de que todas as aulas relacionadas com aquele módulo será excluída junto com ele, ao clicar em DELETAR o módulo será excluído, caso quiser cancelar basta clicar no botão CANCELAR que o model irá fechar.

### Criando aulas

Existe duas maneiras de cadastrarmos aulas na nossa aplicação, uma delas é através da própria página home, onde temos o botão CRIAR AULAS, ao clicar nele será redirecionado a página de criação de aulas, onde vamos fornecer o nome da aula, uma data e hora e por último selecionar o módulo ao qual aquela aula fará parte, ao clicar em cadastrar será redirecionado para a página home.
A segunda opção para criação de aulas é selecionar um módulo na página home onde será redirecionado para a página de aulas daquele módulo, e agora no nosso Header vamos ter a opção de CRIAR AULA, que onde ao clicarmos irá abrir um modal de criação para aquele módulo, e deve-se fornecer um nome para a aula assim como uma data e hora, ou se decidir não criar mais a aula existe um botão com ícone x no canto superior direito do modal, onde podemos fecha-lo.

### Editando aulas

Podemos clicar no módulo na página home onde vamos ser redirecionados a página de aulas daquele módulo, e vamos ter acesso as ações permitidas de editar e excluir aulas, para editar vamos clicar no botão com ícone de caneta onde irá abrir um modal com as informações da aula, e podemos mudar nome, data e horário da aula, assim como na atualização de módulo, se você limpar algum dos campos ele irá manter o valor inicial caso clicar no botão de ATUALIZAR, ou se quiser cancelar a atualização basta clicar no botão CANCELAR, que o model será fechado.

### Deletando aulas

Para deletar vamos seguir o mesmo passo inicial da instrução anterior, caso você tenha voltado para a página home, deve-se clicar em algum módulo para ter acesso as aulas ou se ainda estiver na página de aulas, podemos ver um botão com o ícone de lixeira, que ao clicar será aberto um modal de confirmação onde temos um aviso se queremos mesmo realizar essa ação, caso realmente quiser excluir a aula, basta clicar no botão DELETAR, e o model será fechado sozinho, caso contrário podemos clicar no botão de CANCELAR e fechar o model.

### OBSERVAÇÕES

Cadastre mais de um módulo e aulas para os módulos, afim de depois que realizar as operações ainda restem alguns módulos com aulas, para realizar o último teste que é fazer o logout da aplicação,e observar que agora não temos mais acesso para os CRUD's de módulos e aulas.
