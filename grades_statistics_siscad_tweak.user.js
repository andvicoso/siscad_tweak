// ==UserScript==
// @name        SiscadGradeStatistics
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak
// @description Grades statistics and export to csv
// @version     1.7
// @grant       none
// @icon        https://siscad-admin.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/raw/master/grades_statistics_siscad_tweak.user.js
// @include     https://siscad-admin.ufms.br/titan.php?toSection=5&toAction=view*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require     https://raw.githubusercontent.com/jmosbech/StickyTableHeaders/master/js/jquery.stickytableheaders.min.js
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

function appendStatisticsTable() {
  var app = percent(ap, total);
  var rnp = percent(rn, total);
  var rfp = percent(rf, total);
  $('#notas').after('<br><table style="border-collapse: collapse; border-spacing: 0; margin-left: auto; margin-right: auto;"><tr><td><table style="border-collapse: collapse; border-spacing: 0; margin-left: auto; margin-right: auto;"><thead><tr><th style="font-weight: bold; border-style: solid; border-width: 1px; padding: 5px; text-align: center;">Situa&ccedil;&atilde;o</th><th style="font-weight: bold; border-style: solid; border-width: 1px; padding: 5px; text-align: center;">Quantidade (%)</th></tr></thead><tbody><tr><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: #ff7d66; color: #ffffff;">Reprovados por falta (RF)</td><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: #ff7d66; color: #ffffff; text-align: center;">' + rf + ' (' + rfp + '%)' + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: khaki;">Reprovados por nota (RN)</td><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: khaki; text-align: center;">' + rn + ' (' + rnp + '%)' + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: LightBlue;">"Quase" Aprovados (RN com MA >=5 & <6)</td><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: LightBlue; text-align: center;">' + almost + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: #9aff99;">Aprovados (AP)</td><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: #9aff99; text-align: center;">' + ap + ' (' + app + '%)' + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; font-weight: bold;">Total</td><td style="border-style: solid; border-width: 1px; padding: 5px; text-align: center; font-weight: bold;">' + total + '</td></tr></tbody></table></td><td><table style="border-collapse: collapse; border-spacing: 0; margin-left: auto; margin-right: auto;"><thead><tr><th style="font-weight: bold; border-style: solid; border-width: 1px; padding: 5px; text-align: center;">Situa&ccedil;&atilde;o</th><th style="font-weight: bold; border-style: solid; border-width: 1px; padding: 5px; text-align: center;">M&eacute;dia</th></tr></thead><tbody><tr><td style="border-style: solid; border-width: 1px; padding: 5px; ">M&eacute;dia da MA</td><td style="border-style: solid; border-width: 1px; padding: 5px; text-align: center; ">&nbsp;' + avg_all + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; background-color: #9aff99;">M&eacute;dia da MA (AP)</td><td style="border-style: solid; border-width: 1px; padding: 5px; text-align: center; background-color: #9aff99;">' + avg_ap + '</td></tr><tr><td style="border-style: solid; border-width: 1px; padding: 5px; ">M&eacute;dia da MA (AP + RN)</td><td style="border-style: solid; border-width: 1px; padding: 5px; text-align: center; ">' + avg_ap_rn + ' (' + (ap + rn) + ')</td></tr></tbody></table></td></tr></table>');
} //decorate presence

var rf = 0;
var rn = 0;
var ap = 0;
$('table.notas').prop('id', 'notas');
var all = $('#notas > tbody > tr:not(.cabecalho)');
var statusIdx = $('#notas tr.cabecalho td').filter(function () {
  return $(this).text() == 'OBS.';
}).index();
var avg_ap = 0;
var avg_ap_rn = 0;
var avg_all = 0;
var almost = 0;
var total = all.length;
all.each(function (index) {
  var line = $(this);
  var status = getData(line, statusIdx);
  var grade = parseFloat(getData(line, statusIdx - 1).replace(',', '.'));
  avg_all += grade;
  if (status == 'RF') {
    rf++;
    line.css('background-color', '#ff7d66'); //old: tomato
  } 
  else if (status == 'RN') {
    avg_ap_rn += grade;
    rn++;
    line.css('background-color', 'khaki');
  } else if (status == 'AP') {
    avg_ap_rn += grade;
    avg_ap += grade;
    ap++;
    line.css('background-color', 'LightGreen');
  } //hightlight links on hover

  if (grade >= 5 && grade < 6) {
    almost++;
    line.css('background-color', 'LightBlue');
  }
  highlightLinks(line);
});
avg_ap_rn /= (ap + rn);
avg_ap /= ap;
avg_all /= total;
//rounding
avg_ap_rn = Math.round(avg_ap_rn * 100) / 100;
avg_ap = Math.round(avg_ap * 100) / 100;
avg_all = Math.round(avg_all * 100) / 100;
//summary table
appendStatisticsTable();
//csv inputs
var inputs = '<input type="checkbox" id="csv_all" checked="checked">Todos';
$('td.cabecalho').each(function (index) {
  var text = $(this).text().trim();
  inputs += '<input type="checkbox" id="col' + index + '_csv" checked="checked">' + text;
});
$('#notas').before('<div id="csv" style="border: 1px solid black;"><input id="csv_btn" type="button" value="to CSV">' + inputs + '</div>');
$('#csv_all').change(function () {
  var all_checked = this.checked;
  $('input[id$=\'_csv\']').each(function (index) {
    $(this).prop('checked', all_checked);
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
  downloadFile('csv_notas_alunos.csv', makeCSVFile(csv));
});
