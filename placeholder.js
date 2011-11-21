function addEvent(elem, evType, fn, useCapture) {

         if(elem.addEventListener) {

           return elem.addEventListener(evType,fn,useCapture); 

         } else if(elem.attachEvent) {
           var _fn = function() {
               fn.call(elem);
           };
           return elem.attachEvent('on'+evType,_fn);   
         } else {
           elem['on'+evType] = fn;
         } 
};

var $ = function(id){return document.getElementById(id);}

var DOMhelp = {

   evtHash: [],

   ieGetUniqueID: function(_elem) {

      if (_elem === window) { return 'theWindow'; }

      else if (_elem === document) { return 'theDocument'; }

      else { return _elem.uniqueID; }
   },

   addEvent: function(_elem, _evtName, _fn, _useCapture) {

      if (typeof _elem.addEventListener != 'undefined') {

          _elem.addEventListener(_evtName, _fn, _useCapture); 

      } else if (typeof _elem.attachEvent != 'undefined') {

         var key = '{FNKEY::obj_' + xb.ieGetUniqueID(_elem) + '::evt_' + _evtName + '::fn_' + _fn + '}';

         var f = xb.evtHash[key];

         if (typeof f != 'undefined')

            { return; }

         f = function() {

            _fn.call(_elem);

         };

         xb.evtHash[key] = f;

         _elem.attachEvent('on' + _evtName, f);

         // attach unload event to the window to clean up possibly IE memory leaks
         window.attachEvent('onunload', function() {
            _elem.detachEvent('on' + _evtName, f);
         });

         key = null;
      }
      else { _elem['on' + _evtName] = _fn; }
   },

   removeEvent: function(_elem, _evtName, _fn, _useCapture)
   {
      if (typeof _elem.removeEventListener != 'undefined')
         { _elem.removeEventListener(_evtName, _fn, _useCapture); }
      else if (typeof _elem.detachEvent != 'undefined')
      {
         var key = '{FNKEY::obj_' + xb.ieGetUniqueID(_elem) + '::evt' + _evtName + '::fn_' + _fn + '}';
         var f = xb.evtHash[key];

         if (typeof f != 'undefined') {

            _elem.detachEvent('on' + _evtName, f);

            delete xb.evtHash[key];
         }

         key = null;
      }
   }
};

(function(){

   var placeholderText = document.createElement('input'),
       isSupported = "placeholder" in placeholderText;

   if(!isSupported) {
       var elems = document.getElementsByTagName("*"), 

           n = elems.length;

           for(var i=0;i<n;i++){

               if(elems[i].nodeName.toLowerCase() == 'input' || elems[i].nodeName.toLowerCase() == 'textarea') {

                  var elem = elems[i];

                  if(elem.getAttribute('placeholder')) {

                     addEvent(elem,"blur", function() {

                             if(this.value == "") this.value = this.getAttribute("placeholder");

                     }); 

                     addEvent(elem,"focus", function() {

                              if(this.value == this.getAttribute("placeholder")) this.value = "";
                     }); 
 
                     if(elem.value === "") elem.value = elem.getAttribute("placeholder");
                  }
               }
           }  
   };
})();