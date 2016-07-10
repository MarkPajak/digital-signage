define([
  'underscore',
  'backbone'
], function(_, Backbone) {

    	SettingsModel = Backbone.Model.extend({

        defaults: {
				id: 1427988071,
				machineName: "MSHED1",
				mediafilter: "default",
				location: "M SHED",
				 eventsAPI: "http://museums.bristol.gov.uk/sync/data/events.JSON",
				eventTypes: "Poster - Digital Signage, store tour, exhibition,Event, facilities",
				MSHEDworkshopsAPI: "https://script.google.com/macros/s/AKfycbwyroVu6Q37FgG_-ddTWnFXABfLyRilLMrL8b5SfRo7QLcpNmA/exec?id=1CFk5JxBTsD_yeFre72_xj5JDmFOVRD59QGpCQdrWuHE",
				workshopsAPI: "https://script.google.com/macros/s/AKfycbwyroVu6Q37FgG_-ddTWnFXABfLyRilLMrL8b5SfRo7QLcpNmA/exec?id=1tk0IK-_E--tqjBxiin0kk30ASjPXfjVhJGUO5as-lfE",
				sponsors: "http://emudev-app1/~brlsmp4/Events/Scripts/php/events/eventsAPI.php?type=sponsorship",
				posterMode_time: "200",
				posterLoop_time: "20",
				eventsListMode_time: "500",
				date: null,
				comment: "\n\t\t\t\tfirst floor?",
				keywords: "default2",
				sponsorMode_time: "5",
				posterOrientationSpecific: "2"

				      
           
        },
		url: 'http://emudev-app1/~brlsmp4/Events/Scripts/php/events/eventsAPI.php',
        initialize: function(){
          
        },
    
    	})

  return SettingsModel;

});


