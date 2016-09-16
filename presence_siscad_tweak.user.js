// ==UserScript==
// @name SiscadPresence
// @namespace andvicoso_siscad_tweak
// @description Hide students with more than 25% of faults and other stuff.
// @include https://siscad.ufms.br/titan.php?toSection=3&toAction=edit*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require https://code.responsivevoice.org/responsivevoice.js
// @require https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// @version 1.3
// @grant   none
// ==/UserScript==
//if (confirm('Executar o SISCAD Tweak?')) {
//logo
appendLogo();
//presence
var failed = 0;
var warning = 0;
var all = $('.frequencia > tbody > tr');
var total = all.length;
all.each(function (index) {
  var line = $(this);
  var obj = line.find('[id^="f_"]').first();
  var value = getValue(obj.val());
  highlightLinks(line);
  var presence = 'P';
  if (isFailed(value)) {
    var name = getData(line, 1);
    failed++;
    presence = 'F';
    //change color for the students with more than 26% of faults
    line.css('background-color', '#ff7d66'); //old tomato
    //line.hide(); //uncomment this line if you want to hide the students with more than 25% of faults
    //console.log(' ' + name + ' - Hidden (' + value + ')');
  } 
  else if (isWarning(value)) {
    warning++;
    //change color for the students with more than 19% of faults
    line.css('background-color', 'khaki');
  }  /*set the defined presence to each input text field of the line
  single click, multiple edition*/

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
appendSummaryTable(warning, failed, total);
//auto presence button
$('.caixaAzul').first().before('<div id="autochamanda" style="border: 1px solid black;"><input id="autochamada_btn" type="button" value="Auto Chamada"><input type="checkbox" id="audio_autochamada" checked="checked">Com áudio</div>');
$('#autochamada_btn').click(function () {
  all.each(function (index) {
    var line = $(this);
    var obj = line.find('[id^="f_"]').first();
    var value = getValue(obj.val());
    if (!isFailed(value)) {
      var name = getData(line, 1);
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
//}
