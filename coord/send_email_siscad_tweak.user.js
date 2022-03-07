// ==UserScript==
// @name        SiscadCoordSendEmail
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak/coord
// @description Siscad coordinator send email improved interface
// @version     1.7
// @grant       none
// @icon        https://siscad-admin.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/raw/master/coord/send_email_siscad_tweak.user.js
// @include     https://siscad-admin.ufms.br/titan.php?toSection=89&toAction=sendEmail*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js?
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
//load all the emails after loading page
$( "#pesquisaCoordenador" ).trigger( "click" );

var copyHandler = function () {
    var csv = "";
    var all = $("#jGrid_gridAcademicos #jTableBody tbody tr:not([style*='display: none']) td[name$='_4']");
    var count = 0;
    all.each (function() {
        if($(this).text().trim() != ""){
            csv+=$(this).text()+", ";
            count++;
        }
    });
    alert(count + " emails foram copiados para a área de transferência.");
    copyToClipboard(csv);
};

$("th[name='academicoEmail']").wrapInner("<button type='button'></button>" );
$("th[name='academicoEmail']").on('click', copyHandler);
