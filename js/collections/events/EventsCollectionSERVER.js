define([
  'underscore',
  'backbone',
  'models/event/eventRecordSERVER'
], function(_, Backbone, CommentModel){

  var EventsCollection = Backbone.Collection.extend({
      
     model: EventRecordModel,

	 
	sort_key: 'startDate',	
	
	comparator: function(item) {
        return -item.get(this.sort_key);
    },
	
	
    sortByField: function(fieldName) {
        this.sort_key = fieldName;
        this.sort();
    },

     initialize : function(models, options) {  

	 },
	 
	 
	getUniqueByProperty: function(propertyName) {
		var name=[]
		filteredx = this.filter(function(box) {
		
		
		name.push(box.get("name"))
		var numOfTrue = name.reduce(function(p,c){
			if(c ===box.get("name"))
			
					p++;
				return p;
				},0);
		
		return numOfTrue==1; //removes all duplicates
	});
	
	return new EventsCollection(filteredx);
	
  },

	
	 
	byEventType: function(type) {
		type=type.toUpperCase()
		filteredx = this.filter(function(box) {
		console.log(box.get("type").toUpperCase())
		console.log(type)
		return type.indexOf(box.get("type").toUpperCase()) !== -1;
	});
	
	return new EventsCollection(filteredx);
	
	
	},

	
	
	removePosters: function() {	
		filteredx = this.filter(function(box) {
		return box.get("type").indexOf("Poster") == -1;
	});
	
	return new EventsCollection(filteredx);

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
			var toDay = new Date()//NB TIME VALUE INCLUDED - STRIP OUT ALL TIME BECAUSE OTHERWISE DATE OF EVENT MAY BE GREATER THAN CURRENT DATTIME EVEN THOUGH THE DATE IS CURRENT 
			var toDaydate = toDay.getDate();
			var toDaymonth = toDay.getMonth();
			var toDayyear = toDay.getFullYear();
			toDayMinusTime=new Date(toDayyear,toDaymonth,toDaydate);	
			filteredxx = this.select(function (model) {

			var startDate = new Date(model.get('startDate'))
			var startdate = startDate.getDate();
			var startmonth = startDate.getMonth();
			var startyear = startDate.getFullYear();
			startMinusTime=new Date(startyear,startmonth-1,startdate); 
			//increase number to add more future events as 	coming soon
			
			var workshopEnd = new Date(model.get('endDate')) //NB TIME VALUE INCLUDED
			var WSdate = workshopEnd.getDate();
			var WSmonth = workshopEnd.getMonth();
			var WSyear = workshopEnd.getFullYear();
			workshopEndMinusTime=new Date(WSyear,WSmonth,WSdate);
			//make sure that the event starts within one month and that the end of the event has not happenned
			return (toDayMinusTime>=startMinusTime&&toDayMinusTime<=workshopEndMinusTime) // && 
		

   });
	
    return new EventsCollection(filteredxx);
	},
	
	_dateISToday: function () {
	var toDay = new Date()
 	filteredx =  this.select(function (model) {

	var workshopDay = new Date(model.get('startDate'))

        return workshopDay >= toDay ;
    });
   return new EventsCollection(filteredx);
	},
	 
	 byVenue: function(VENUE) {
     if(VENUE.toUpperCase()=="M SHED"){VENUE = "M SHED"}
				if(VENUE.toUpperCase()=="BMAG"){VENUE = "BRISTOL MUSEUM & ART GALLERY"}
				if(VENUE.toUpperCase()=="MSHED"){VENUE = "M SHED"}
	if (VENUE.toUpperCase() =='ALL'){
		return this;
		} else	{
	filtered = this.filter(function(box) {
	//console.log(box.get("venue"))
	return box.get("venue").toUpperCase() == VENUE.toUpperCase();
	});

	return new EventsCollection(filtered);
	}
	
	},
	 
	  

      parse : function(data) {
  
		return data   
      }

 
  });

  return EventsCollection;

});
