// ==UserScript==
// @name        SiscadGeneral
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak
// @description Siscad initial auto-login
// @version     1.10
// @icon        https://siscad-admin.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/raw/master/general_siscad_tweak.user.js
// @include     https://siscad-admin.ufms.br/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
//// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==
/* globals $ */
/* globals jQuery */
this.$ = this.jQuery = jQuery.noConflict(true);
//waitForKeyElements ("#formLogin", actionFunction);

setTimeout(actionFunction, 500);

function actionFunction () {
    if ($('#formLogin').length !== 0) {
        if ($('#password').val() != '' && $('#login').val() != '') {
            document.getElementById('formLogin').submit();
        }
    }
    //select first option in selection box
    $('select').each(function (index) {
        if($(this).find("option:contains('elecione')").length != 0 || $(this).find("option:contains('scolha')").length != 0){
            $(this).find('option:nth(1)').attr("selected", "selected");
        }
    });
    //increase the font-size of common table headers
    $(".listHeader td").css('font-size','large');

    $('a[style*="color: #00A000; font-weight: bold"]').css({
        "background-color":" #EEEEEE",
        "padding":" 2px 6px 2px 6px",
        "border-top":" 1px solid #CCCCCC",
        "border-right":" 1px solid #333333",
        "border-bottom":" 1px solid #333333",
        "border-left":" 1px solid #CCCCCC"});
}