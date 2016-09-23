// ==UserScript==
// @name        SiscadStickyTables
// @namespace   andvicoso_siscad_tweak
// @description Stick siscad table headers
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/sticky-table-headers/0.1.19/js/jquery.stickytableheaders.min.js
// @require https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// @version 1.0
// @grant   none
// ==/UserScript==
//logo
appendLogo();
//sticky table headers
$('tr.cabecalho').closest('table').prop('id','notas');
$('<thead></thead>').prependTo($('#notas')).append($('tr.cabecalho'));
$('#notas').stickyTableHeaders();