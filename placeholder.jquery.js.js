if(jQuery.browser.msie) {
(function($){
 $.placeholder = function(){
    var inputText = document.createElement("input"),
        isSupported = "placeholder" in inputText;
        if(!isSupported) {
            var els = $("input[type=text],textarea");
            els.each(function(index,elem){

                if($(elem).attr("placeholder")) {
                   $(elem).focus(function(){
                          if($(this).val() === $(this).attr("placeholder")) {
                             $(this).val("");
                          }
                   }); 
                   $(elem).blur(function(){
                          if($(this).val() == "") {
                             $(this).val($(this).attr("placeholder")); 
                          }
                   }); 
                   if($(elem).val() === "")$(elem).val($(elem).attr("placeholder"));
                }                
            });  
        };
 };
})(jQuery);
   jQuery.placeholder();
};
