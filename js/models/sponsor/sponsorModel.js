define([
  'underscore',
  'backbone'
], function(_, Backbone) {

    	SponsorModel = Backbone.Model.extend({

        defaults: {
            category: 'sponsor',
			heading: 'business name ',	
			message: 'business name '			

        },
        initialize: function(){
            //alert("Welcome to this world");
        },
        adopt: function( newChildsName ){
           // this.set({ child: newChildsName });
        }
    	})

  return SponsorModel;

});


