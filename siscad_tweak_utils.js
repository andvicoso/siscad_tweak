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
function getValue(x) {
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
function appendLogo(){
	$('.logoApplication').append('<div id=\'twk\' style=\'top:50;left:230;position:absolute;background-color:red;font-size:large;color:black\'><b>TWEAKED!</b></div>');
}