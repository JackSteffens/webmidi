var domain = window.location.hash;
var params = domain.split("&");

var keys = params.map(function (el) {
    var spliced = el.split('=');
    return spliced[0];
});

var values = params.map(function (el) {
    var spliced = el.split('=');
    return spliced[1];
});

var returnObj = {};
keys.forEach(function (val, index) {
    returnObj[val] = values[index];
});
console.log(returnObj);
var redirectUrl = window.location.origin + '/#!/login?access_token=' + returnObj['access_token'];
window.location.href = redirectUrl;