// ==UserScript==
// @name        SiscadCoordReports
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak/coord
// @description Siscad coordinator reports improved interface
// @version     1.3
// @grant       none
// @icon        https://siscad-admin.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/raw/master/coord/reports_siscad_tweak.user.js
// @include     https://siscad-admin.ufms.br/titan.php?toSection=24
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var all = $("img[title='Visualizar Item']");
all.each(function (index) {
	var link = $( this ).closest('tr').find('td:nth(2)').find("a");
    var td_text = $( this ).closest('tr').find('td:nth(1)');
    var text = td_text.text();
    td_text.html("<a style='font-size:20px' href='"+link.attr("href")+"'>"+text+"</a>");
});
