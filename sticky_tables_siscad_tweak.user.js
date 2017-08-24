// ==UserScript==
// @name        SiscadStickyTables
// @namespace   andvicoso_siscad_tweak
// @description Stick siscad table headers
// @version 1.3
// @grant   none
// @icon https://siscad.ufms.br/favicon.ico
// @downloadURL https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/sticky_tables_siscad_tweak.user.js
// @include https://siscad.ufms.br/titan.php*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/sticky-table-headers/0.1.19/js/jquery.stickytableheaders.min.js
// @require https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
//logo
appendLogo();
//sticky table headers
$('tr.cabecalho').closest('table').prop('id','notas');
$('<thead></thead>').prependTo($('#notas')).append($('tr.cabecalho'));
$('#notas').stickyTableHeaders();
