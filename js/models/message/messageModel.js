define([
  'underscore',
  'backbone'
], function(_, Backbone) {

    	MessageModel = Backbone.Model.extend({

        defaults: {
            category: 'sponsor',
			message: 'this is a message'		

        },
        initialize: function(){
            //alert("Welcome to this world");
        },
        adopt: function( newChildsName ){
           // this.set({ child: newChildsName });
        }
    	})

  return MessageModel;

});


