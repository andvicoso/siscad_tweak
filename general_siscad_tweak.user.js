// ==UserScript==
// @name        SiscadGeneral
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak
// @description Siscad initial auto-login
// @version 1.0
// @grant   none
// @icon https://siscad.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/general_siscad_tweak.user.js
// @include https://siscad.ufms.br/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
//auto-login
if ($('#formLogin').length !== 0) {
  if ($('#password').val() != '' && $('#login').val() != '') {
    document.getElementById('formLogin').submit();
  }
}
//select only option in single option selection box
$('select').each(function (index) {
    alert($(this).find('option:nth(1)').html());
	if($(this).find('option').size() == 2)
		$(this).find('option:nth(1)').attr("selected", "selected");
});
