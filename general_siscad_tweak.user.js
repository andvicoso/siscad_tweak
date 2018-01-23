// ==UserScript==
// @name        SiscadGeneral
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak
// @description Siscad initial auto-login
// @version     1.1
// @grant       none
// @icon        https://siscad.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/general_siscad_tweak.user.js
// @include     https://siscad.ufms.br/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
if ($('#formLogin').length !== 0) {
    if ($('#password').val() != '' && $('#login').val() != '') {
        document.getElementById('formLogin').submit();
    }
}
//select first option in selection box
$('select').each(function (index) {
    $(this).find('option:nth(1)').attr("selected", "selected");
});
//increase the font-size of common table headers
$(".listHeader td").css('font-size','large');
