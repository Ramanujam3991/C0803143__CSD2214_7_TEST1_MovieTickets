$(function(){
var row =6;
var col = 10;
var current_selected_lst = [];
var already_selected_lst = [];
var totalPrice= 0;
//Initial load
sessionStorage.setItem('currentMovie', 'Titanic $20');
getDataFromSession();


//Theater screen 1
sessionStorage.setItem('move1', 'Titanic $20');
sessionStorage.setItem('current_selected_lst1', current_selected_lst);
sessionStorage.setItem('already_selected_lst1', already_selected_lst);


//Theater screen 2
sessionStorage.setItem('move2', 'Back to the future $10');
sessionStorage.setItem('current_selected_lst2', current_selected_lst);
sessionStorage.setItem('already_selected_lst2', already_selected_lst);


//Theater screen 3
sessionStorage.setItem('move3', 'Ironman $30');
sessionStorage.setItem('current_selected_lst3', current_selected_lst);
sessionStorage.setItem('already_selected_lst3', already_selected_lst);



$('#movie').change(function(){

    //save old theater session
    if(sessionStorage.getItem('currentMovie') == 'Titanic $20')
    {
        sessionStorage.setItem('current_selected_lst1', current_selected_lst);
        sessionStorage.setItem('already_selected_lst1', already_selected_lst);

    }
    else if(sessionStorage.getItem('currentMovie') == 'Back to the future $10')
    {
        sessionStorage.setItem('current_selected_lst2', current_selected_lst);
        sessionStorage.setItem('already_selected_lst2', already_selected_lst);
    }
    else{
        sessionStorage.setItem('current_selected_lst3', current_selected_lst);
        sessionStorage.setItem('already_selected_lst3', already_selected_lst);
    }

    //load new theater

    sessionStorage.setItem('currentMovie', $('#movie').find(':selected').text());
    getDataFromSession();
    loadStructure();
});

//Load the structure in jQuery
for(var i = 0; i < row; i++)
    $('.seat-map-table').append('<tr class= "ticket-row row'+i+'"></tr>')

for(var i = 0; i < row; i++)
    for(var j = 0; j < col; j++)
        $('.row'+i).append('<td class ="available td'+i+j+'"></td>')

if(already_selected_lst.length!=0)
    disableOccupied(already_selected_lst);

function loadStructure(){

    enableAvailable();
    if(already_selected_lst.length!=0)
        disableOccupied(already_selected_lst);

    
}
function getDataFromSession(){
    current_selected_lst = [];
    already_selected_lst = [];
    if(sessionStorage.getItem('currentMovie') == sessionStorage.getItem('move1'))
    {
        
        if(sessionStorage.getItem('current_selected_lst1')!='' && sessionStorage.getItem('current_selected_lst1')!=null)
            current_selected_lst=sessionStorage.getItem('current_selected_lst1').split(',')

        
        if(sessionStorage.getItem('already_selected_lst1')!='' && sessionStorage.getItem('already_selected_lst1')!=null)
            already_selected_lst = sessionStorage.getItem('already_selected_lst1').split(',')

    }
    else if(sessionStorage.getItem('currentMovie') == sessionStorage.getItem('move2'))
    {
        if(sessionStorage.getItem('current_selected_lst2')!='' && sessionStorage.getItem('current_selected_lst2')!=null){
            current_selected_lst=sessionStorage.getItem('current_selected_lst2').split(',')

        }

        
        if(sessionStorage.getItem('already_selected_lst2')!='' && sessionStorage.getItem('already_selected_lst2')!=null)
            already_selected_lst = sessionStorage.getItem('already_selected_lst2').split(',')
    }
    else
    {
        if(sessionStorage.getItem('current_selected_lst3')!='' && sessionStorage.getItem('current_selected_lst3')!=null)
            current_selected_lst=sessionStorage.getItem('current_selected_lst3').split(',')

        
        if(sessionStorage.getItem('already_selected_lst3')!='' && sessionStorage.getItem('already_selected_lst3')!=null)
            already_selected_lst = sessionStorage.getItem('already_selected_lst3').split(',')
        

    }
}
$('.ticket-row td').click(function(){
    if($(this).hasClass('available'))
    {
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
    }
    else{
        alert('Error: Please select an available seat');
    }
})

$('.buy-tickets').click(function(){
    if(totalPrice == 0)
    {
        alert('Error: Please select atleast 1 seat to proceed')
    }
    else{
    alert('Please make the payment to confirm seats');
    $( "#dialog" ).dialog({
        minWidth: 360,
        title:'Payment for movie: $'+totalPrice
      });
    }
});

$('.pay').click(function(){
    if(payValidation())
    {
    Array.prototype.push.apply(already_selected_lst,current_selected_lst);
    current_selected_lst = [];
    disableOccupied(already_selected_lst);
    $( "#dialog" ).dialog('close');
    alert('Booking success!')
    }
})

function payValidation(){
    var isValid = true;
    $('.error-message').css('color','red');
    if($('.first-name').val()==''
    || $('.last-name').val()==''
    || $('.email').val()==''
    || $('.CVV').val()==''
    || $('.expiry').val()==''
    || $('.card-number').val()==''
    )
    {
        $('.error-message').text('Please enter mandatory fields');
        
        isValid = false;
    }
    else if($('.card-number').val().length != 16)
    {
        $('.error-message').text('Card number should be 16 digit but it is '+$('.card-number').val().length);
        isValid = false;
    }
    else if(isNaN($('.card-number').val()) || isNaN($('.CVV').val()) || isNaN($('.card-number').val()))
    {
        $('.error-message').text('Card number, cvv and expiry should be numeric');
        isValid = false;
    }
    else{
        $(".error-message").text("");

    }
    return isValid;
}

function disableOccupied(already_selected_lst){
    $(already_selected_lst).each(function(element){
        let class_name = already_selected_lst[element];
        clearPayments();
        $('.'+class_name).removeClass('available');
        $('.'+class_name).removeClass('selected');
        $('.'+class_name).addClass('occupied');
    })

}
function enableAvailable(){
    $('.seat-map-table td').each(function(element){
        clearPayments();
        $(this).removeClass('occupied');
        $(this).removeClass('selected');
        $(this).addClass('available');
    })

}
function disableOccupied(already_selected_lst){
    $(already_selected_lst).each(function(element){
        let class_name = already_selected_lst[element];
        clearPayments();
        $('.'+class_name).removeClass('available');
        $('.'+class_name).removeClass('selected');
        $('.'+class_name).addClass('occupied');
    })

}
function highlightSelected(current_selected_lst){
    $(current_selected_lst).each(function(element){
        let class_name = current_selected_lst[element];
        clearPayments();
        $('.'+class_name).removeClass('available');
        $('.'+class_name).removeClass('occupied');
        $('.'+class_name).addClass('selected');
    })

}
function clearPayments(){
    $('.pricing-table tr:eq(0) td:eq(1)').text('');
    $('.pricing-table tr:eq(1) td:eq(1)').text('');
    $('.pricing-table tr:eq(2) td:eq(1)').text('');
}
})//End of jQuery