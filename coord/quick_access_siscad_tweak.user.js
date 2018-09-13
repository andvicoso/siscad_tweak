// ==UserScript==
// @name        SiscadCoordQuickAccess
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak/coord
// @description Siscad coordinator main interface
// @version     1.2
// @grant       none
// @icon        https://siscad.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/raw/master/coord/quick_access_siscad_tweak.user.js
// @include     https://siscad.ufms.br/titan.php*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js?
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_cookies_utils.js?
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

function extractEmails (text){
    return text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

var requestHandler = function () {

    $.ajax({
        url: 'https://siscad.ufms.br/titan.php?toSection=89&toAction=findAcademicosCoordenador',
        type: 'post',
        data: "args[]="+cursoId+"&args[]=&args[]=&args[]=&args[]=ALL",
        success: function( data, textStatus, jQxhr ){
            var emails = extractEmails(data).join(',');
            $("#responseEmails").html(emails);
            $("#btn_copy").show();
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
};

var copyHandler = function () {
    alert($("#responseEmails").text());
    var all = $("#responseEmails").text().split(",");
    alert(all.length + " emails foram copiados para a área de transferência.");
    copyToClipboard(all);
};

var previsaoHandler = function () {
    var action = $("#form_previsao").attr("action");
    action += '&cursoCodigo='+cursoId;
    action += '&ano='+$("#anoSituacao_previsao").val();
    action += '&sem='+$("#semSituacao_previsao").val();

    $("#form_previsao").attr("action", action);
    $("#form_previsao").submit();
};

var disciplinasHandler = function () {
    var action = $("#form_disciplinas").attr("action");
    action += '&cursoCodigo='+cursoId;
    action += '&ano='+$("#anoSituacao_disciplinas").val();
    action += '&sem='+$("#semSituacao_disciplinas").val();

    $("#form_disciplinas").attr("action", action);
    $("#form_disciplinas").submit();
};

var cursoId = "";

if($("span.ThemeOfficeMainFolderText:contains('Coordenador')").length){
    cursoId = checkCookie();
}

if($("#cursoCodigo").length){
    $("#cursoCodigo").val(cursoId);
    $("#cursoCodigo").trigger("focus");
    $("#cursoCodigo").trigger("blur");
}

if($("td:contains('Bem-Vindo')").length){
    var year = (new Date()).getFullYear();
    var semester = (new Date()).getMonth()<7?1:2;

    $(".bodySection" ).prepend("<div style='text-align: left; font-size: large;'><span>Acesso rápido: </span><br/>"+
                               "<ul>"+
                               "<li><a style='font-size: large;' href='https://siscad.ufms.br/titan.php?toSection=24&toAction=viewForm&itemId=5'>Histórico Escolar</a></li>"+
                               "<li><a style='font-size: large;' href='https://siscad.ufms.br/titan.php?toSection=24&toAction=viewForm&itemId=4'>Relatório de Acadêmicos Matriculados</a></li>"+
                               "<li><a style='font-size: large;' href='https://siscad.ufms.br/titan.php?toSection=24&toAction=viewForm&itemId=1'>Relatório de Lista de Ofertas por Curso</a></li>"+

                               "<li><form id='form_previsao' action='/titan.php?toSection=78&toAction=view_previsao&itemId=1&cursoCodigo="+cursoId+"' method='post'>"+
                               "<input type='hidden' name='fromAction' value='form'></input>"+
                               "<input type='hidden' name='relatorioType' value='titan.php?toSection=78&toAction=view_previsao&itemId=1'></input>"+
                               "<span>Previsão de Vagas por Disciplina: </span><input id='anoSituacao_previsao' name='anoSituacao' value='"+year+"' maxlength='4' type='text' size='4'>"+
                               "<input id='semSituacao_previsao' name='semSituacao' value='"+semester+"' maxlength='1' type='text' size='1'>"+
                               "<input id='btn_previsao' type='button' value='Ir'></input></form></li>"+

                               "<li><form id='form_disciplinas' action='/titan.php?toSection=78&toAction=view_disciplinasOfertadas&itemId=3&cursoCodigo="+cursoId+"' method='post'>"+
                               "<input type='hidden' name='fromAction' value='form'></input>"+
                               "<input type='hidden' name='relatorioType' value='titan.php?toSection=78&toAction=view_previsao&itemId=1'></input>"+
                               "<span>Disciplinas/Ofertas (Disciplinas ofertadas ou deveriam ser ofertadas): </span><input id='anoSituacao_disciplinas' name='anoSituacao' value='"+year+"' maxlength='4' type='text' size='4'>"+
                               "<input id='semSituacao_disciplinas' name='semSituacao' value='"+semester+"' maxlength='1' type='text' size='1'>"+
                               "<input id='btn_disciplinas' type='button' value='Ir'></input></form></li>"+

                               "<li><input id='responseEmails' type='hidden'></input>"+
                               "<span>Buscar todos os emails de alunos do curso: </span><button type='button' id='btn_request'>Ir</button>"+
                               "<button type='button' id='btn_copy'>Copiar emails para a área de transferência</button></li>"+

                               "</div>"
                              );


    $("#btn_previsao").on('click', previsaoHandler);
    $("#btn_disciplinas").on('click', disciplinasHandler);

    $("#btn_copy").hide();

    $("#btn_request").on('click', requestHandler);
    $("#btn_copy").on('click', copyHandler);
}