define([
  'underscore',
  'backbone'
], function(_, Backbone) {

    	VideoModel = Backbone.Model.extend({

        defaults: {
		
			category: 'EXHIBITION',
            name: 'Record Title',
            type: 'All about the record',
			venue: 'venue',
			startDate:'',	
			startTime:10,
			endTime:11,
			endDate:'',           
			source: 'EMu',			
		    title: "image title",
		    caption: "",
		    copyright: "© Bristol Museums, Galleries and Archives",
		    file: "3543",
		    width: "3543",
		    height: "3543",
		    youtubeid:"3543"

        },
		url: 'http://emudev-app1/~brlsmp4/Events/Scripts/php/events/eventsAPI.php',
        initialize: function(){
          
        }
    	})

  return VideoModel;

});


