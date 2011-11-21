(function(){  
  var inputText = new Element('input'),
      isSupported = "placeholder" in inputText;
      if(!isSupported) {
          var elems = document.getElements("textarea,input");
          elems.each(function(elem,index){
                if(elem.get('placeholder')) {
                        $(elem).addEvent('focus', function(){
                                if(this.get('placeholder') == this.get('value')) $(elem).set('value',"");
                        });
                        $(elem).addEvent('blur', function(){
                                if(this.get('value') == "") $(elem).set('value',this.get("placeholder"));
                        });
                        if($(elem).get('value') == "") $(elem).set('value',elem.get("placeholder"));
                }
          });
      };
})(); 
