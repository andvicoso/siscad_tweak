// ==UserScript==
// @name        SiscadFrequencySingleStudent
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak
// @description Single Student frequency edit
// @version     1.5
// @grant       none
// @icon        https://siscad.ufms.br/favicon.ico
// @downloadURL https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/single_student_presence_siscad_tweak.user.js
// @include     https://siscad.ufms.br/titan.php?toSection=12&toAction=edit*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require     https://raw.githubusercontent.com/jmosbech/StickyTableHeaders/master/js/jquery.stickytableheaders.min.js
// @require     https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
var all = $('#notas > tbody > tr:not(.cabecalho)');
var total = all.length;
all.each(function (index) {
  var line = $(this);
  var obj = line.find('input.input_hide');
  var value = getValue(obj.val());
  var presence = 'P';
  if (isFailed(value)) {
    presence = 'F';
  }
  //set the defined presence to each input text field of the line
  //single click, multiple edition
  var inputs = line.find('.input_hide');
  inputs.each(function (index) {
    if (!$(this).val()) {
      $(this).val(presence);
      $(this).css('font-weight','Bold');
    }
    $(this).click(function () {
      var currpresence = $(this).val();
      inputs.each(function (index) {
        $(this).val(currpresence);
        $(this).css('font-weight','normal');
      });
    });
  });
  
  highlightLinks(line);
});