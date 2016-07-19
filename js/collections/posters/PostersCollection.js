define([
  'underscore',
  'backbone',
  'models/poster/posterModel'
], function(_, Backbone, SponsorModel){

  var PosterCollection = Backbone.Collection.extend({
  
	sort_key: 'startTime', // default sort key
    

	url : function() {

		var EventsAPI = 'http://museums.bristol.gov.uk/sync/data/posters.JSON';
		
        return EventsAPI
      },
	  

	
		byEventType: function(type) {
		type=type.toUpperCase()
		filteredx = this.filter(function(box) {
		console.log(box.get("type").toUpperCase())
		return type.indexOf(box.get("type").toUpperCase()) !== -1;
	});
	
	return new PosterCollection(filteredx);
	
	
	},
	
		eventHasntFinished: function () {
		var toDay = new Date()//NB TIME VALUE INCLUDED - STRIP OUT ALL TIME BECAUSE OTHERWISE DATE OF EVENT MAY BE GREATER THAN CURRENT DATTIME EVEN THOUGH THE DATE IS CURRENT 
				var toDaydate = toDay.getDate();
				var toDaymonth = toDay.getMonth();
				var toDayyear = toDay.getFullYear();
				toDayMinusTime=new Date(toDayyear,toDaymonth,toDaydate);	
		filteredx =  this.select(function (model) {
		var workshopDay = new Date(model.get('endDate'))
		var workshopDay_from = new Date(model.get('startDate'))

			return workshopDay >= toDayMinusTime  && workshopDay_from <= toDayMinusTime || model.get('type')=="Exhibition" ;
			//return workshopDay >= toDayMinusTime;
		});
	   return new PosterCollection(filteredx);
		},
		
	
		byOrientation: function(typex) {	
		typex=typex.toUpperCase()
		filteredx = this.filter(function(box) {	
			var venuetoTest = box.get("orientation")	
			if(	box.get("orientation")){
				venuetoTest = (box.get("orientation").toUpperCase())
			}		
			return typex.indexOf(venuetoTest) !== -1 || box.get("type")=="Special Event";
		});	
		return new PosterCollection(filteredx);
	},
	
	

	venueFilter: function(venue) {	  
	
	//venue must match the venue field in emu
		    if(venue.toUpperCase()=="M SHED"){venue = "M SHED"}	 
				if(venue.toUpperCase()=="BMAG"){venue = "BRISTOL MUSEUM & ART GALLERY"}
				if(venue.toUpperCase()=="MSHED"){venue = "M SHED"}
				if(venue.toUpperCase()=="BLAISE"){venue = "BLAISE CASTLE HOUSE MUSEUM"}
				
	filteredx = this.filter(function(box) {
	
	var venuetoTest = box.get("venue")
	if(	box.get("venue")){
	venuetoTest = (box.get("venue").toUpperCase())}
	
	return venuetoTest==venue ||box.get("venue")==null
	});	
	return new PosterCollection(filteredx);
	
	},
	
      parse : function(data) {	  
		return data	       
      }

 
  });

  return PosterCollection;

});
