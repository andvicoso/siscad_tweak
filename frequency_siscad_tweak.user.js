// ==UserScript==
// @name        SiscadFrequencyStudents
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak
// @description Students frequency details and export to csv
// @version     1.4
// @grant       none
// @icon https://siscad.ufms.br/favicon.ico
// @downloadURL https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/frequency_siscad_tweak.user.js
// @include https://siscad.ufms.br/titan.php?toSection=3&toAction=view*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require https://raw.githubusercontent.com/jmosbech/StickyTableHeaders/master/js/jquery.stickytableheaders.min.js
// @require https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
//decorate presence
var failed = 0;
var warning = 0;
$('tr.cabecalho').closest('table').prop('id', 'notas');
var all = $('#notas').find('tr:not(.cabecalho)');
var total = all.length;
all.each(function (index) {
  var line = $(this);
  var value = getValue(getData(line, 4));
  if (isFailed(value)) {
    failed++;
    //change color for the students with more than 26% of absence
    line.css('background-color', '#ff7d66'); //old tomato
  }
  else if (isWarning(value)) {
    warning++;
    //change color for the students with more than 19% of absence
    line.css('background-color', 'khaki');
  }  //hightlight links on hover

  highlightLinks(line);
});
//summary table
appendSummaryTable(warning, failed, total);
//csv export inputs
var inputs = '<input type="checkbox" id="csv_all" checked="checked">Todos';
$('td.cabecalho').children().each(function (index) {
  var text = $(this).text().trim();
  inputs += '<input type="checkbox" id="col' + index + '_csv" checked="checked">' + text;
});
$('#diaLetivoId').parent().last().after('<div id="csv" style="border: 1px solid black;"><input id="csv_btn" type="button" value="to CSV">' + inputs + '</div>');
$('#csv_all').change(function() {
  var all_checked = this.checked;
  $("input[id$='_csv']").each(function (index) {
    $(this).prop("checked", all_checked);
  });
});

$('#csv_btn').click(function () {
  var csv = '';
  all.each(function (index) {
    var line = $(this);
    $('td.cabecalho').each(function (index2) {
      var input_id = 'col' + index2 + '_csv';
      if ($('#' + input_id).prop('checked')) {
        csv += getData(line, index2) + ';';
      }
    });
    csv += '\n';
  });
  //csv para download
  downloadFile('csv_alunos.csv', makeCSVFile(csv));
});
