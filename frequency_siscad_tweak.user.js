// ==UserScript==
// @name        SiscadFrequencyStudents
// @namespace   andvicoso_siscad_tweak
// @description Students frequency details and export to csv
// @version     1.0
// @grant       none
// @include https://siscad.ufms.br/titan.php?toSection=3&toAction=view*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/sticky-table-headers/0.1.19/js/jquery.stickytableheaders.min.js
// @require https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
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
    //change color for the students with more than 26% of faults
    line.css('background-color', '#ff7d66'); //old tomato
  } 
  else if (isWarning(value)) {
    warning++;
    //change color for the students with more than 19% of faults
    line.css('background-color', 'khaki');
  }  //hightlight links on hover

  highlightLinks(line);
});
//summary table
appendSummaryTable(warning, failed, total);
//csv export inputs
var inputs = '';
$('.tableFloatingHeaderOriginal > tr').children().each(function (index) {
  var text = $(this).text().trim();
  inputs += '<input type="checkbox" id="col' + index + '_csv" checked="checked">' + text;
});
$('#diaLetivoId').parent().last().after('<div id="csv" style="border: 1px solid black;"><input id="csv_btn" type="button" value="to CSV">' + inputs + '</div>');
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
