$(function(){
var row =6;
var col = 10;
var current_selected_lst = [];
var already_selected_lst = [];
var totalPrice= 0;
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

    // Fill the pricing table
    var moviePrice = $('#movie').find(':selected').val();
    var seatsSelected = current_selected_lst.length
    totalPrice = moviePrice*seatsSelected; //global
    $('.totalPrice').val(totalPrice)
    $('.pricing-table tr:eq(0) td:eq(1)').text('$'+moviePrice);
    $('.pricing-table tr:eq(1) td:eq(1)').text(seatsSelected);
    $('.pricing-table tr:eq(2) td:eq(1)').text('$'+totalPrice);

})

$('.buy-tickets').click(function(){
    alert('open new tab')
});

})//End of jQuery