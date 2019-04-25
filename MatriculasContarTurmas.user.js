// ==UserScript==
// @name        MatriculasContarTurmas
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak
// @description Siscad initial auto-login
// @version     1.3
// @include     https://matriculas.ufms.br/matricula/ajustes-coordenadores/disciplina/*
// @icon        https://siscad-admin.ufms.br/favicon.ico
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @grant       none
// ==/UserScript==
/*- The @grant directive is needed to work around a major design
    change introduced in GM 1.0.
    It restores the sandbox.
*/
this.$ = this.jQuery = jQuery.noConflict(true);

$("input[value=Buscar").after("<button id='contarTurmas'>Contar turmas</button>");
$("#contarTurmas").click(runCount);

function runCount () {
    var all = $("#tabela-aptos-turmas tr td:nth-child(5):not(:contains('Confirmada')):not(:contains('Não Solicitada'))");
    var array = [0,0,0,0,0,0,0,0,0,0,0];
    all.each(function (index) {
        var t=$(this).parent().children(':nth-child(4)').text().trim();
        var tti=0;
        if(t != "Indisponível")
            tti=parseInt(t.substring(1));
        array[tti]++;
    });
    var str="";
    var sum = array[0];
    if(array[0]>0)
            str+="Turma Indisponível: "+array[0]+"\n";
    for (var i = 1; i < 11; i++)
        if(array[i]>0){
            str+="T"+i+": "+array[i]+"\n";
            sum += array[i];
        }
    str+="Total: "+sum+"\n";
    alert(str);
}
