	
define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var InstsgramModel = Backbone.Model.extend({
 defaults: {
	
				          
				          object_id: "11034",
						  title: "image title",
				          caption: "",
				          copyright: "© Bristol Museums, Galleries and Archives",
				          file: "3543",
						  orientation:"",
						  width: "3543",
						  height: "3543",
						  irn:"3543",
						  data:""
				     
				      
           
        },
		url: 'https://api.instagram.com/v1/tags/spider/media/recent?client_id=71f4d51edbac4b0993cfa25305238bdb',
        initialize: function(){
          
        },
        adopt: function( newChildsName ){
           // this.set({ child: newChildsName });
        }
    	})



  return InstsgramModel;

});


