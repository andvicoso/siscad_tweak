// ==UserScript==
// @name         Paste presences
// @version      1.0
// @author       andvicoso
// @match        https://siscad-admin.ufms.br/titan.php?toSection=3&toAction=edit*
// @namespace   andvicoso_siscad_ppc_tweak
// @description Paste presences from space separated values
// @grant       none
// @icon        https://siscad-admin.ufms.br/favicon.ico
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @require https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var buttonHandler = function () {
    var presencasCSV = prompt('Informe as presenças separadas por espaços');
    presencasCSV = presencasCSV.split(' ');

    var column = $('#notas tbody tr td:nth-child(' + this.value + ') .input_hide');
    column.each(function (i) {
        $(this).val(presencasCSV[i]);
        $(this).css('font-weight','Bold');
        $(this).trigger("blur");

        $(this).click(function () {
            var currpresence = $(this).val();
            inputs.each(function (index) {
                $(this).val(currpresence);
                $(this).css('font-weight','normal');
            });
        });
    });
};

var cabecalhos = $("td.cabecalho:contains('H/A')");
cabecalhos.each(function (i) {
    var text = $(this).text().trim();
    $(this).html($('<button style="padding: 0;" type="button" value="' + (i+3) + '" id="csv' + i + '">' + text + '</button>'));
    $('#csv' + i).on('click', buttonHandler);
});