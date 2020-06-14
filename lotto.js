module.exports = function(RED) {
    function Lotto(n) {
        RED.nodes.createNode(this,n);
        this.low = Number(n.low || 1);
        this.high = Number(n.high || 45);
        this.cnt = Number(n.cnt || 7);
        this.property = n.property||"payload";
        var node = this;
        var value = [];
        this.on("input", function(msg) {
          for (var i = 0; i < node.cnt; i++){
      	    value[i] = Math.round(Math.random() * (node.high - node.low + 1) + node.low - 0.5);
      	    for (var j = 0; j < i; j++){
          		if ( value[j] == value[i] && node.cnt < (node.high-node.low) ){
          		 i--;
             }
           }
         }
         RED.util.setMessageProperty(msg,node.property,value);
         node.send(msg);
       });
    }
    RED.nodes.registerType("lotto",Lotto);
}
