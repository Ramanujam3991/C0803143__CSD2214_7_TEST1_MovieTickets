$(function(){
var row =6;
var col = 10;

for(var i = 0; i < row; i++)
    $('.seat-map-table').append('<tr class= "ticket-row row'+i+'"></tr>')

for(var i = 0; i < row; i++)
    for(var j = 0; j < col; j++)
    $('.row'+i).append('<td class ="ticket-td td'+i+j+'"></td>')
})//End of jQuery