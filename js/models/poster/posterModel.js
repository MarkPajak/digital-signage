define([
  'underscore',
  'backbone'
], function(_, Backbone) {

    	PosterModel = Backbone.Model.extend({

        defaults: {
			
            category: 'sponsor',
			irn: '123456'		,
			startDate: '123456'		,
			orientation: ''		,
			endDate: '123456'		,
			venue: 'venue'		,
			caption: 'caption'		,
			strapline: 'strapline'	,
			copyright: ''	,
			name:"xx"	,
			type:"xx"			
			
		

        },
        initialize: function(){
            //alert("Welcome to this world");
        },
        adopt: function( newChildsName ){
           // this.set({ child: newChildsName });
        }
    	})

  return PosterModel;

});


