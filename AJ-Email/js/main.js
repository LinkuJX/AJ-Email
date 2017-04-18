$(document).ready(function(){
    
    console.log("READY");
    
    // Brand Selection Buttons
    $("#brand button.btn-brand").click(function() {
        $("#brand button.btn-brand").removeClass('active');
        $(this).addClass('active');
    });
    
    // Collapsible Panels
    $(document).on('click', '.panel-heading span.clickable', function(e){
        var $this = $(this);
        if(!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
    });
    
    $(".inputgroup input").inputmask();
});
