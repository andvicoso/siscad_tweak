// ==UserScript==
// @name        SiscadExportStudents
// @namespace   andvicoso_siscad_tweak
// @description Export students details
// @version     1
// @grant       none
// @include https://siscad.ufms.br/titan.php?toSection=3&toAction=view*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
function downloadFile(filename, url) {
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
function makeCSVFile(text) {
  var data = new Blob([text], {
    type: 'text/csv'
  });
  // returns a URL you can use as a href
  return window.URL.createObjectURL(data);
}
function getLine(obj) {
  return obj.parent().parent();
}
function getName(line) {
  return line.children(':nth-child(2)').text();
}
function getRGA(line) {
  return line.children(':nth-child(1)').text().trim();
}
function getAbsence(line) {
  return line.children(':nth-child(5)').text().trim();
}
function getPresence(line) {
  return line.children(':nth-child(6)').text().trim();
}
$('.logoApplication').append('<div id=\'twk\' style=\'top:50;left:230;position:absolute;background-color:red;font-size:large;color:black\'><b>TWEAKED!</b></div>');
$('#diaLetivoId').parent().last().after('<div id="csv" style="border: 1px solid black;"><input id="csv_btn" type="button" value="to CSV"><input type="checkbox" id="nome_csv" checked="checked">Nome<input type="checkbox" id="rga_csv" checked="checked">RGA<input type="checkbox" id="absent_csv" checked="checked">Faltas<input type="checkbox" id="presence_csv" checked="checked">Presenças</div>');
$('#csv_btn').click(function () {
  var csv = '';
  $('tr.cabecalho').parent().each(function (index) {
    var line = getLine($(this));
    if ($('#rga_csv').prop('checked')) {
      csv += getRGA(line) + ';';
    }
    if ($('#nome_csv').prop('checked')) {
      csv += getName(line) + ';\n';
    }
    if ($('#absence_csv').prop('checked')) {
      csv += getAbsence(line) + ';\n';
    }
    if ($('#presence_csv').prop('checked')) {
      csv += getPresence(line) + ';\n';
    }
  });
  //csv para download
  downloadFile('csv_alunos.csv', makeCSVFile(csv));
});
