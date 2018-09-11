// ==UserScript==
// @name        SiscadCoordQuickAccess
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak/coord
// @description Siscad coordinator main interface
// @version     1.0
// @grant       none
// @icon        https://siscad.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/raw/master/coord/main_siscad_tweak.user.js
// @include     https://siscad.ufms.br/titan.php*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js?
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_cookies_utils.js?
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

function extractEmails (text)
{
    return text.match(/([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

if($("td:contains('Bem-Vindo')").length){

    $(".bodySection" ).prepend("<span>Acesso rápido: </span>"+
                               "<input id='response' type='hidden'></input>"+
                                 "<button type='button' id='btn_request'>Buscar todos os emails de alunos do curso</button>"+
                                 "<button type='button' id='btn_copy'>Copiar emails para a área de transferência</button>" );

   $("#btn_copy").hide();

    var requestHandler = function () {
        var cursoId = checkCookie();
        $.ajax({
            url: 'https://siscad.ufms.br/titan.php?toSection=89&toAction=findAcademicosCoordenador',
            type: 'post',
            data: "args[]="+cursoId+"&args[]=&args[]=&args[]=&args[]=ALL",
            success: function( data, textStatus, jQxhr ){
                var emails = extractEmails(data).join(',');
                $("#response").html(emails);
                $("#btn_request").hide();
                $("#btn_copy").show();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    };

    var copyHandler = function () {
        var all = $("#response").html().split(",");
        copyToClipboard(all);
    };

    $("#btn_request").on('click', requestHandler);
    $("#btn_copy").on('click', copyHandler);
}