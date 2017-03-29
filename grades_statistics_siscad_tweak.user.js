// ==UserScript==
// @name        SiscadGradeStatistics
// @namespace   andvicoso_siscad_tweak
// @description Grades statistics and export to csv
// @version     1.0
// @grant       none
// @include https://siscad.ufms.br/titan.php?toSection=5&toAction=view*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/sticky-table-headers/0.1.19/js/jquery.stickytableheaders.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.27.6/js/jquery.tablesorter.min.js
// @require https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// @version 1.0
// @grant   none
// ==/UserScript==
function appendStatisticsTable() {
  var active = total - failed - warning;
  var activep = percent(active, total);
  var warningp = percent(warning, total);
  var failedp = percent(failed, total);
  $('#notas').after('<br><table style="border-collapse: collapse; border-spacing: 0; margin-left: auto; margin-right: auto;"><thead><tr><th style="font-weight: bold; border-style: solid; border-width: 1px; padding: 5px; text-align: center;">Situa&ccedil;&atilde;o</th><th style="font-weight: bold; border-style: solid; border-width: 1px; padding: 5px; text-align: center;">Quantidade (%)</th></tr></thead><tbody><tr><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: #ff7d66; color: #ffffff;">Reprovados por falta</td><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: #ff7d66; color: #ffffff; text-align: center;">' + failed + ' (' + failedp + '%)' + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: khaki;">Reprovados por nota</td><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: khaki; text-align: center;">' + warning + ' (' + warningp + '%)' + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: LightBlue;">"Quase" Aprovados (>=5 & <6)</td><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: LightBlue; text-align: center;">' + count55 + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: #9aff99;">Aprovados</td><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: #9aff99; text-align: center;">' + active + ' (' + activep + '%)' + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; font-weight: bold;">Total</td><td style="border-style: solid; border-width: 1px; padding: 5px; text-align: center; font-weight: bold;">' + total + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; font-weight: bold;">M&eacute;dia da MA</td><td style="border-style: solid; border-width: 1px; padding: 5px; text-align: center; font-weight: bold;">&nbsp;' + avg0 + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; font-weight: bold;">M&eacute;dia da MA (>1)</td><td style="border-style: solid; border-width: 1px; padding: 5px; text-align: center; font-weight: bold;">' + avg + '(' + count0 + ')</td></tr></tbody></table>');
} //decorate presence

var failed = 0;
var warning = 0;
$('table.notas').prop('id', 'notas');
var all = $('#notas > tbody > tr:not(.cabecalho)');
var statusIdx = $('#notas tr.cabecalho td').filter(function () {
  return $(this).text() == 'OBS.';
}).index();
var avg = 0;
var avg0 = 0;
var count0 = 0;
var count55 = 0;
var total = all.length;
all.each(function (index) {
  var line = $(this);
  var status = getData(line, statusIdx);
  var grade = parseFloat(getData(line, statusIdx - 1).replace(',', '.'));
  avg0 += grade;
  if (grade > 1) {
    avg += grade;
    count0++;
  }

  if (status == 'RF') {
    failed++;
    line.css('background-color', '#ff7d66'); //old tomato
  } 
  else if (status == 'RN') {
    warning++;
    line.css('background-color', 'khaki');
  } else if (status == 'AP') {
    line.css('background-color', 'LightGreen');
  } //hightlight links on hover

  if (grade >= 5 && grade < 6) {
    count55++;
     line.css('background-color', 'LightBlue');
  }
  
  highlightLinks(line);
});
avg /= count0;
avg0 /= total;
//rounding
avg=Math.round(avg*100)/100;
avg0=Math.round(avg0*100)/100;
//summary table
appendStatisticsTable();
//table sorter
$('#notas').tablesorter();
//csv inputs
var inputs = '';
//tableFloatingHeaderOriginal from stickyTableHeaders
$('td.cabecalho').each(function (index) {
  var text = $(this).text().trim();
  inputs += '<input type="checkbox" id="col' + index + '_csv" checked="checked">' + text;
});
$('#notas').before('<div id="csv" style="border: 1px solid black;"><input id="csv_btn" type="button" value="to CSV">' + inputs + '</div>');
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
  downloadFile('csv_notas_alunos.csv', makeCSVFile(csv));
});
