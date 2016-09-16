// ==UserScript==
// @name SiscadPresence
// @namespace andvicoso_siscad_tweak
// @description Hide students with more than 25% of faults and other stuff.
// @include https://siscad.ufms.br/titan.php?toSection=3&toAction=edit*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require https://code.responsivevoice.org/responsivevoice.js
// @version 1.3
// @grant   none
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
function getValue(line) {
  var obj = line.find('td').eq(6).first();
  var x = obj.html();
  var posabre = x.indexOf('(');
  var pospercent = x.indexOf('%');
  var percent = x.substring(posabre + 1, pospercent);
  return parseFloat(percent.replace(',', '.'));
}
function percent(value, total) {
  return Math.round(value * 100 / total);
}
function getData(line, pos) {
  return line.find('td').eq(pos).text().trim();
}
function isFailed(value) {
  return value > 25;
}
function isWarning(value) {
  return value > 19;
}
if (confirm('Executar o SISCAD Tweak?')) {
  //logo
  $('.logoApplication').append('<div id=\'twk\' style=\'top:50;left:230;position:absolute;background-color:red;font-size:large;color:black\'><b>TWEAKED!</b></div>');
  //presence
  var failed = 0;
  var warning = 0;
  var all = $('.frequencia > tbody > tr');
  var total = all.length;
  all.each(function (index) {
    var line = $(this);
    var value = getValue(line);
    var links = line.find('a');
    //make the name bold on hover
    line.hover(function () {
      links.css('font-weight', 'Bold');
    }, function () {
      links.css('font-weight', '');
    }
    );
    var presence = 'P';
    if (isFailed(value)) {
      var name = getData(line, 1);
      failed++;
      presence = 'F';
      //line.hide(); //uncomment this line if you want to hide the students with more than 25% of faults
      //change color for the students with more than 26% of faults
      line.css('background-color', '#ff7d66'); //old tomato
      console.log(' ' + name + ' - Hidden (' + value + ')');
    } 
    else if (isWarning(value)) {
      warning++;
      //change color for the students with more than 19% of faults
      line.css('background-color', 'khaki');
    } //set the defined presence to each input text field of the line
    //single click, multiple edition

    var inputs = line.find('.input_hide');
    inputs.each(function (index) {
      if (!$(this).val()) {
        $(this).val(presence);
      }
      $(this).click(function () {
        var currpresence = $(this).val();
        inputs.each(function (index) {
          $(this).val(currpresence);
        });
      });
    });
  });
  //summary table
  var active = total - failed - warning;
  var activep = percent(active, total);
  var warningp = percent(warning, total);
  var failedp = percent(failed, total);
  $('.caixaAzul').last().after('<table style="border-collapse:collapse;border-spacing:0;margin-left:auto;margin-right: auto;"><tr><td style="font-weight:bold;border-style:solid;border-width:1px;padding:5px;text-align:center;">Situação<br></td><td style="font-weight:bold;border-style:solid;border-width:1px;padding:5px;text-align:center;">Quantidade (%)<br></td></tr><tr><td style="border-style:solid;border-width:1px;padding:5px;background-color:#ff7d66;color:#ffffff;">Reprovados por falta</td><td style="border-style:solid;border-width:1px;padding:5px;background-color:#ff7d66;color:#ffffff;text-align:center;">' + failed + ' (' + failedp + '%)' + '</td></tr><tr><td style="border-style:solid;border-width:1px;padding:5px;background-color:khaki;">Atenção</td><td style="border-style:solid;border-width:1px;padding:5px;background-color:khaki;text-align:center;">' + warning + ' (' + warningp + '%)' + '</td></tr><tr><td style="border-style:solid;border-width:1px;padding:5px;background-color:#9aff99;">Ativos<br></td><td style="border-style:solid;border-width:1px;padding:5px;background-color:#9aff99;text-align:center;">' + active + ' (' + activep + '%)' + '</td></tr><tr><td style="border-style:solid;border-width:1px;padding:5px;font-weight:bold;">Total</td><td style="border-style:solid;border-width:1px;padding:5px;text-align:center;font-weight:bold;">' + total + '</td></tr></table>');
  //export to CSV button
  //csv export inputs
  var inputs = '';
  $('td.cabecalho').each(function (index) {
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
  //auto presence button
  $('#csv').after('<div id="autochamanda" style="border: 1px solid black;"><input id="autochamada_btn" type="button" value="Auto Chamada"><input type="checkbox" id="audio_autochamada" checked="checked">Com áudio</div>');
  $('#autochamada_btn').click(function () {
    all.each(function (index) {
      var value = getValue($(this));
      if (!isFailed(value)) {
        var line = getLine($(this));
        var name = getName(line);
        if ($('#audio_autochamada').prop('checked')) {
          responsiveVoice.speak(name, 'Brazilian Portuguese Female');
        }
        var presence = confirm(name) ? 'P' : 'F';
        var inputs = line.find('.input_hide');
        inputs.each(function (index) {
          $(this).val(presence);
        });
      }
    });
  });
}
