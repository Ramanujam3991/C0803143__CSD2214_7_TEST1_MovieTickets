$(function(){
var row =6;
var col = 10;
var current_selected_lst = [];
var already_selected_lst = [];
for(var i = 0; i < row; i++)
    $('.seat-map-table').append('<tr class= "ticket-row row'+i+'"></tr>')

for(var i = 0; i < row; i++)
    for(var j = 0; j < col; j++)
    $('.row'+i).append('<td class ="available td'+i+j+'"></td>')

$('.ticket-row td').click(function(){
    // alert($(this).attr('class'))
    $(this).removeClass('available');
    $(this).removeClass('occupied');
    $(this).addClass('selected');
    
    var className = $(this).attr('class');
    var rowNo = className.substr(className.indexOf('td')+2,1);
    var colNo = className.substr(className.indexOf('td')+3,1);
    console.log('selected row:'+rowNo+' selected col: '+colNo)
    current_selected_lst.push(className.substr(className.indexOf('td'),4));
    console.log('current list:'+current_selected_lst)

    
    

})
})//End of jQuery