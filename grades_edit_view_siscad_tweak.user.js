// ==UserScript==
// @name        SiscadGradesEdit
// @author      andvicoso and renanmarks
// @namespace   andvicoso_siscad_tweak
// @description Auxilia o lançamento de notas no Siscad - thanks to @RenanMarks
// @version     1.5
// @grant       none
// @icon        https://siscad.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/raw/master/grades_edit_view_siscad_tweak.user.js
// @include     https://siscad.ufms.br/titan.php?toSection=5&toAction=edit*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

var buttonHandler = function () {
  var column = $('#notas tbody tr td:nth-child(' + this.value + ') input.inputType');
  var notasCSV = prompt('Informe notas separadas por espaços');
  notasCSV = notasCSV.split(' ');
  column.each(function (i, e) {
    $(e).val(notasCSV[i]);
    $(e).trigger("blur");
  });
};

var cabecalhos = $("td.cabecalho");
cabecalhos.each(function (i, e) {
  if (e.id.indexOf("#prova") === -1)
  {
    return;
  }
  
  var text = $(e).text().trim();
  $(e).html($('<button style="padding: 0;" type="button" value="' + (i+1) + '" id="csv' + i + '">' + text + '</button>'));
  $('#csv' + i).on('click', buttonHandler);
});
