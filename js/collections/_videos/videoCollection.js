define([
  'underscore',
  'backbone',
  'models/video/videoModel'
], function(_, Backbone, videoModel){

  var VideosCollection = Backbone.Collection.extend({
      
     model: videoModel,	

     initialize : function(models, options) {  

	 },
	 
	 	url : function() {

		var VideosFromGoogleSheetAPI = 'https://script.google.com/macros/s/AKfycbwyroVu6Q37FgG_-ddTWnFXABfLyRilLMrL8b5SfRo7QLcpNmA/exec?id=1YbxTguRcA7QQvxjrNsbdFnuzlOzppw0yfUI8LycNEPs' ;
		
		
        return VideosFromGoogleSheetAPI
      },
	 
	byEventType: function(type) {
	type=type.toUpperCase()
	filteredx = this.filter(function(box) {
		return type.indexOf(box.get("type").toUpperCase()) !== -1;
	});
	
	return new VideosCollection(filteredx);
	
	
	},
	
	removePosters: function() {
	
	filteredx = this.filter(function(box) {
	return box.get("type").indexOf("Poster") == -1;
	});
	
	return new VideosCollection(filteredx);
	
	
	},
	
	convertHoursTo12: function () {
	
	
	var hours = time.getHours();
	if (hours > 12) {
    hours -= 12;
	} else if (hours === 0) {
   hours = 12;
	}
	
	
	},
	
	
	dateISToday: function () {
	var toDay = new Date()
 	filteredx =  this.select(function (model) {

	var workshopDay = new Date(model.get('startDate'))

        return workshopDay <= toDay;
    });
   return new VideosCollection(filteredx);
	},
	 
	 byVenue: function(VENUE) {
     if(VENUE.toUpperCase()=="M SHED"){VENUE = "M SHED"}
				if(VENUE.toUpperCase()=="BMAG"){VENUE = "BRISTOL MUSEUM AND ART GALLERY"}
				if(VENUE.toUpperCase()=="MSHED"){VENUE = "M SHED"}
	if (VENUE.toUpperCase() =='ALL'){
		return this;
		} else	{
	filtered = this.filter(function(box) {
	console.log(box.get("venue"))
	return box.get("venue").toUpperCase() == VENUE.toUpperCase();
	});

	return new VideosCollection(filtered);
	}
	
	},
	 
	  

      parse : function(data) {
  
		return data	       
      }

 
  });

  return VideosCollection;

});
