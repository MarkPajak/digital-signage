define([
  'jquery',
  'underscore',
  'backbone',
  'models/instagram/instagram',
  'helpers/Globals'
], function($, _, Backbone, ImagesModel,Globals){

	var InstagramCollection  = Backbone.Collection.extend({
 
			model: ImagesModel,   
			parse : function(response) {
				
			
			
					return  response
			 },
			 
			 shuffle: function shuffle(o){ //v1.0
			
					for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
					return o;
			}
			 
			 
     
    
	});


  return InstagramCollection;
  

});