define([
  'underscore',
  'backbone'
], function(_, Backbone) {

    	EventRecordModel = Backbone.Model.extend({

        defaults: {
			category: 'EXHIBITION',
            name: 'Record Title',
            type: 'All about the record',
			venue: 'venue',
			startDate:'',
			strapline:'',
			event_space:'',
			room:'',
			startTime:'',
			endTime:'',
			endDate:'',           
			timings:" ",
			requirements:"",	
			source: 'EMu',			
            images: [
				        {
				          
				          object_id: "11034",
						  title: "image title",
				          caption: "",
				          copyright: "© Bristol Museums, Galleries and Archives",
				          file: "3543",
						  orientation:"",
						  width: "3543",
						  height: "3543",
						  irn:"3543",
						  QuoteMatch:""
				        }]
				      
           
        },
		url: 'http://emudev-app1/~brlsmp4/Events/Scripts/php/events/eventsAPI.php',
        initialize: function(){
          
        },
        adopt: function( newChildsName ){
           // this.set({ child: newChildsName });
        }
    	})

  return EventRecordModel;

});


