# siscad_tweak
## UFMS SISCAD utility library

Conjunto de scripts que auxiliam no dia-a-dia do professor dentro da interface do SISCAD.
Algumas funcionalidades são: Facilidade em exportar e importar notas do excel, melhorias visuais, tabelas com dados sobre as turmas e muito mais. 
Mais informaçõs abaixo na seção scripts.

## Instalação dos Scripts

No Firefox: precisa da extensão Tampermonkey ([Mais detalhes](https://addons.mozilla.org/pt-BR/firefox/addon/tampermonkey/)).

No Chrome: também precisa da extensão Tampermonkey. Para instalá-lo, só entrar em extensões e procurar por "Tampermonkey". Clique na bolinha para instalar e ativar.
Depois disso, só clicar no novo botão do Tampermonkey nos três pontinhos no canto direito do Chrome. Depois de abrir, vai aparecer uma aba com um "+" pra adicionar um novo script.
Apague todo o texto padrão e coloque o texto do script correspondente. Só salvar e voltar a página para executar.

**Não usar o GREASEMONKEY mais, depois da última atualização os scripts não estão mais funcionando no Greasemonkey.**
Pra quem tinha o Greasemonkey no FF, pode ser interessante migrar de acordo com esse [link](https://stackoverflow.com/questions/47317983/how-to-transfer-all-greasemonkey-userscripts-to-tampermonkey-on-firefox-57)


Depois de instalar a extensão no browser correspondente só instalar os scripts individualmente.
Os scripts que compoem o siscad_tweak são todos os arquivos fonte que terminam em **'*.user.js'**.

No Firefox, clique no script desejado acima, por exemplo 'sticky_tables_siscad_tweak.user.js', depois clique no canto direito superior em 'Raw' para ver a caixa de instalação.
Outra opção é arrastar o arquivo do script baixado para o gerenciador de scripts do navegador.

**IMPORTANTE**: Ordem de execução/carregamento dos scripts no navegador importa! Primeiro a ser executado deve ser o **sticky_tables_siscad_tweak**.
Para fazer isso no Tampermonkey, só abrir o dashboard, clicar no script 'SiscadStickyTables' e depois ir na aba 'configurações' e depois selecionar a opção 'posição' com o valor '1'.

# Scripts

## Para coordenadores: quick_access_siscad_tweak

Cria um menu de acesso rápido para essas opções na página inicial.
O mais legal deles é o botão que copia os emails de todos os alunos matriculados para a área de transferência.

## Tabelas em geral: sticky_tables_siscad_tweak
* Titulos das colunas das tabelas de todo o SISCAD acompanham o scroll da página;

## Seção Chamada
* Passar o mouse sobre uma linha de uma tabela realça a linha;

### Editar presenças por aluno: single_student_presence_siscad_tweak 
* Ao alterar um valor de presença, todos os campos/aulas do mesmo dia daquele aluno são alterados automaticamente (tanto na frequência por aula como na frequência por aluno);
* Presenças em negrito foram automaticamente definidas pelo script (diferenciar visualmente as presenças definidas pelo usuário ou script).

### Editar presenças por turma: presence_siscad_tweak
* Ao alterar um valor de presença, todos os campos/aulas do mesmo dia daquele aluno são alterados automaticamente (tanto na frequência por aula como na frequência por aluno);
* Auto-chamada com áudio **[BETA-TEST]**;
* Presenças em negrito foram automaticamente definidas pelo script (diferenciar visualmente as presenças definidas pelo usuário ou script).

### Ver presenças: frequency_siscad_tweak

* Mostra em vermelho os alunos já reprovados por falta;
* Mostra em amarelo os alunos que estão prestes a reprovar por falta (mais de 19% de faltas e menos 25%);
* Os alunos reprovados já ficam automaticamente com F e os outros com P na chamada (em todos os campos/aulas do mesmo dia);
* Exportar a tabela em formato CSV escolhendo as colunas;

## Seção Notas

### Ver notas: grades_statistics_siscad_tweak
* Tabela com estatísticas sobre aprovados, reprovados, "quase" aprovados (nota >5 e <6);
* Tabela com médias das notas dos aprovados, reprovados falta e nota;
* Exportar a tabela em formato CSV escolhendo as colunas;
* Mostra em vermelho os alunos já reprovados por falta;
* Mostra em amarelo os alunos reprovados por nota;
* Mostra em azul os alunos "quase" aprovados (nota >5 e <6) por nota;
* Mostra em verde os alunos aprovados;
* Exportar a tabela em formato CSV escolhendo as colunas;

### Editar notas: grades_edit_view_siscad_tweak
* É possível copiar do excel e colar de acordo com a coluna associada a nota (botão em cima de cada coluna referente a nota);

## Atualização

* Caso não receba as atualizações rapidamente ou não esteja atualizando automaticamente: 
** Para fazer isso no Tampermonkey, só clicar no botão do tampermonkey e selecionar a opção  na 'Checar atualizações de scripts';

## WARNING: Se  estiver tendo dificuldade com a atualização de alguns arquivos ou novas versões não funcionarem, tente o seguinte passo a passo:

Firefox
type in URL: about:support
open profile folder
goto gm_scripts
goto script folder
delete script
reload page do download script again


OR

go to scripts manager in greasemonkey
right click on script
open containing folder
