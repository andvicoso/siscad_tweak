# siscad_tweak
## UFMS SISCAD utility library

No Firefox precisa da extensão Greasemonkey ([Mais detalhes](https://www.tecmundo.com.br/firefox/2931-como-usar-o-greasemonkey.htm)).
No Chrome precisa da extensão Tampermonkey. ([Mais detalhes](https://tugatech.com.pt/t12232-dica-como-instalar-scripts-no-google-chrome)).

Depois de instalar a extensão só instalar os scripts.
(Clique no script desejado acima, por exemplo 'grades_statistics_siscad_tweak.user.js', depois clique no canto direito superior em 'Raw'. Aí só clicar para instalar);

**IMPORTANTE**: Ordem de execução/carregamento dos scripts no navegador importa! Primeiro a ser executado deve ser o SiscadStickTables.
Para fazer isso no Firefox, só abrir o gerenciador de scripts e arrastar o script para cima.

## Geral:

* Passar o mouse sobre uma linha de uma tabela realça a linha;
* Titulos das colunas das tabelas de todo o SISCAD acompanham o scroll da página;

## Seção Chamada:

* Mostra em vermelho os alunos já reprovados por falta (tem a opção no script ao descomentar uma linha para esconder os alunos reprovados da página também);
* Mostra em amarelo os alunos que estão para reprovar por falta (mais de 19% de faltas);
* Os alunos reprovados já ficam automaticamente com F e os outros com P na chamada (em todos os campos/aulas do mesmo dia);
* Ao alterar um valor de presença, todos os campos/aulas do mesmo dia daquele aluno são alterados automaticamente (tanto na frequência por aula como na frequência por aluno);
* Auto-chamada com áudio;
* Exportar a tabela em formato CSV escolhendo as colunas;
* Presenças em negrito foram automaticamente definidas pelo script (diferenciar visualmente as presenças definidas pelo usuário ou script).

## Seção Notas: 

* É possível copiar do excel e colar de acordo com a coluna associada a nota;
* Tabela com estatísticas sobre aprovados, reprovados, "quase" aprovados (nota >5 e <6);
* Tabela com médias das notas dos aprovados, reprovados falta e nota;
* Exportar a tabela em formato CSV escolhendo as colunas;


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
