// ==UserScript==
// @name        SiscadStickyTables
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak
// @description Stick siscad table headers
// @version     1.7
// @grant       none
// @icon        https://siscad-admin.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/raw/master/sticky_tables_siscad_tweak.user.js
// @include     https://siscad-admin.ufms.br/titan.php*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require     https://raw.githubusercontent.com/jmosbech/StickyTableHeaders/master/js/jquery.stickytableheaders.min.js
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
//logo
appendLogo();
//sticky table headers
$('tr.cabecalho').closest('table').prop('id','notas');
$('<thead></thead>').prependTo($('#notas')).append($('tr.cabecalho'));
$('#notas').stickyTableHeaders();
