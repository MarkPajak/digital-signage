//version 2
define([
  'underscore',
  'backbone',
  'models/event/eventRecordSERVER',
  'models/workshop/workshopModel'
], function(_, Backbone, CommentModel,WorkShopModel){

  var WorkshopCollection = Backbone.Collection.extend({
  
	sort_key: 'category', // it is vital that categories are sorted together - this is so they can be properly aggregated for the workshops view - because category forms the ID of the div and so must be unique.
    
	comparator: function(item) {
 return item.get("sort_key")
       // return [item.get("sort_key"), item.get("startTime")]
    },
	


	sortByField: function(fieldName) {
        this.sort_key = fieldName;		
	},
	
	byEventType: function(type) {
		type=type.toUpperCase()
		filteredx = this.filter(function(box) {
		console.log("TYPEFILTER ",box.get("category").toUpperCase())
		return type.indexOf(box.get("category").toUpperCase()) !== -1;
	});
	
	return new WorkshopCollection(filteredx);
	
	
	},
	
	byCurentType: function() {

	filteredx = this.filter(function(box) {
	var date = new Date()
	////console.log(box.get("startTime"))
	return box//.get("startTime")>=date.getHours();
	});
	
	return new WorkshopCollection(filteredx);
	
	
	},
	
	sortByColumn: function(colName) {
	  this.sortKey = colName;
	  this.sort();
	},

 
    model: WorkShopModel,
    initialize : function(models, options) { 

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
			startMinusTime=new Date(startyear,startmonth,startdate);
			
			var workshopEnd = new Date(model.get('endDate')) //NB TIME VALUE INCLUDED
			var WSdate = workshopEnd.getDate();
			var WSmonth = workshopEnd.getMonth();
			var WSyear = workshopEnd.getFullYear();
			workshopEndMinusTime=new Date(WSyear,WSmonth,WSdate);
			
			return (toDayMinusTime>=startMinusTime&&toDayMinusTime<=workshopEndMinusTime) // && 
		
		
	
   


   });
	
    return new WorkshopCollection(filteredxx);
	},
	


	greaterThan: function ( attribute, value) {
     filteredxx = this.select(function (model) {
	
        return model.get(attribute) > value;
    });
   return new WorkshopCollection(filteredxx);
	},
	
	url : function() {

		
	var EventsAPI = 'https://script.google.com/macros/s/AKfycbwyroVu6Q37FgG_-ddTWnFXABfLyRilLMrL8b5SfRo7QLcpNmA/exec?id=1u2bA7NE3ZFsWh6Bvy32ztA3akEUvFnLIvbK3BAL9itk' 
		//for google docs to execute the script it must run as a google drive user in the 'publish as web app' settings
		//N.B. this is for reference only - the url above is overwritten from the MSHEDworkshopsAPI in settings.JSON which comes from the digital signage admin panel database.
        return EventsAPI
      },
	  
	
      parse : function(data) {
	  
	
		return data	       
      }

 
  });

  return WorkshopCollection;

});
