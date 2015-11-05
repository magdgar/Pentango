$('#root').animate({  borderSpacing: -360 }, {
    step: function(now,fx) {

        $(this).css("-webkit-transform-origin", "center center" );
        $(this).css('-moz-transform','rotate('+now+'deg)');
        $(this).css('transform','rotate('+now+'deg)');
    },
    duration:'slow'
},'linear');

//$('#buttonToReverce').click(function(){
//    $('#id0').toggleClass('rotated');
//});

