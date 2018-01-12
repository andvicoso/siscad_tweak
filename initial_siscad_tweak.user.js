// ==UserScript==
// @name        SiscadInitial
// @author      andvicoso
// @namespace   andvicoso_siscad_tweak
// @description Siscad initial auto-login
// @version 1.1
// @grant   none
// @icon https://siscad.ufms.br/favicon.ico
// @downloadURL https://github.com/andvicoso/siscad_tweak/initial_siscad_tweak.user.js
// @include https://siscad.ufms.br/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require https://raw.githubusercontent.com/andvicoso/siscad_tweak/master/siscad_tweak_utils.js
// ==/UserScript==
if ($('#formLogin').length !== 0) {
  if ($('#password').val() != '' && $('#login').val() != '') {
    document.getElementById('formLogin').submit();
  }
}
