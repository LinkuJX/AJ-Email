$(document).ready(function(){
    console.log("READY");
    $("#brand button.btn-brand").click(function() {
        $("#brand button.btn-brand").removeClass('active');
        $(this).addClass('active');
    });
});
