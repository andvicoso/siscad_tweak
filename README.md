# siscad_tweak
ufms siscad tweak utility library

IMPORTANTE: Ordem de execução/carregamento dos scripts no navegador importa! Primeiro a ser executado deve ser o SiscadStickTables.

Geral:
- Titulos das colunas acompanham o scroll da página;

Chamada:
- Mostra em vermelho os alunos já reprovados por falta (Tem a opção no script ao descomentar uma linha para esconder os alunos reprovados da página também);
- Mostra em amarelo os alunos que estão para reprovar por falta (mais de 19% de faltas);
- Os alunos reprovados já ficam automaticamente com F e os outros com P na chamada (em todos os campos/aulas do mesmo dia);
- Ao alterar um valor de presença, todos os campos/aulas do mesmo dia daquele aluno são alterados automaticamente (tanto na frequência por aula como na frequência por aluno);
- Auto-chamada com áudio;
- Exportar a tabela em formato CSV escolhendo as colunas;
- Presenças em negrito foram automaticamente definidas pelo script (diferenciar visualmente as presenças definidas pelo usuário ou script).

Notas: 
- É possível copiar do excel e colar de acordo com a coluna associada a nota;
- Tabela com estatísticas sobre aprovados, reprovados, "quase" aprovados (nota >5 e <6);
- Exportar a tabela em formato CSV escolhendo as colunas;

