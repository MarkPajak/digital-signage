define([
  'underscore',
  'backbone',
  'models/arrow/ArrowModel'
], function(_, Backbone, ArrowModel){

  var ArrowCollection = Backbone.Collection.extend({
      
      model: ArrowModel,

	 byMachine: function(object_ID) {
	  //console.log('filtering by machinename',object_ID)
		filtered = this.filter(function(box) {		
		
		  return box.get("machine_id") == object_ID;
		  });
		return new ArrowCollection(filtered);
	  },


      initialize : function(models, options) {    },

	 url : function() {

	//var SheetToJSONServiceURL = 'data/arrows.JSON' //dont forget to authorise
	var SheetToJSONServiceURL = 'http://museums.bristol.gov.uk/sync/data/arrows.JSON' 
     return SheetToJSONServiceURL
      },


      parse : function(data) {
	  
	  returnedData = []

	  _.each(data, function(name){
	  //console.log(name)
	    returnedData.push(name)
	  })


		return returnedData
	       
      	 }

 
  });

  return ArrowCollection;

});
