// ==UserScript==
// @name         RemoveBibSiscadPPC
// @version      1.0
// @author       andvicoso
// @match        https://siscad.ufms.br/ppc/estrutura/*/bibliografia/*
// @namespace   andvicoso_siscad_ppc_tweak
// @description Remove bibliography siscad ppc
// @grant       none
// @icon        https://siscad.ufms.br/favicon.ico
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @require https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

function hideAll(){
    $("button.close[data-notify='dismiss']").parent().hide();
}

var linksb = $("a[href='#confirmar-remover-basico'] > i ");
var linksc = $("a[href='#confirmar-remover-complementar'] > i ");

if(linksb.length>0 || linksc.length>0){
    $("a:contains('Adicionar Bibliografia')").before('<a id="btn_remove_all" href="#remover" type="button" class="btn btn-danger"><i class="fa fa-remove"></i> Remover todas</a>');
    $('#btn_remove_all').click(function () {
        linksb = $("a[href='#confirmar-remover-basico'] > i ");
        linksb.each(function (index) {
            $(this).first().click();
            setTimeout(null, 100);
            $("button:contains('Sim')").click();
            setTimeout(hideAll, 1500);
        });

        linksc = $("a[href='#confirmar-remover-complementar'] > i ");
        linksc.each(function (index) {
            $(this).first().click();
            setTimeout(null, 100);
            $("button:contains('Sim')").click();
            setTimeout(hideAll, 1500);
        });
    });
}