function getElementsByClassName(search,node,tag) {
         var ret = []
         if(node == null) {node = document}
         if(tag == null) {tag = "*"}
         var els = node.getElementsByTagName(tag), n = els.length, pattern = new RegExp("(^|\ss)"+search+"(\\s|$)")
         for(var i=0;i<n;i++) {
             if(pattern.test(els[i].className)) {
                ret.push(els[i])
             }
         }
    return ret
}
var note = getElementsByClassName("note")[0]
if("placeholder" in document.createElement('input')) {
        note.innerHTML = "Your current browser natively supports <span>placeholder</span> for <b>input</b> and <b>textarea</b>. The plugin won't run in this case,since it's not needed. If you want to test the plugin, use IE."
} else {
        note.innerHTML = "testing..."
}