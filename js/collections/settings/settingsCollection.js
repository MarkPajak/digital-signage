define([
  'underscore',
  'backbone',
  'models/settings/settingsModel'
], function(_, Backbone, settingsMODEL){

  var SettingsCollection = Backbone.Collection.extend({
      
     model: settingsMODEL,

	 
	sort_key: 'type',	
	
	comparator: function(item) {
        return item.get(this.sort_key);
    },
	
    sortByField: function(fieldName) {
        this.sort_key = fieldName;
        this.sort();
    },

     initialize : function(models, options) {  

	 },
	 
	byEventType: function(type) {
		type=type.toUpperCase()
		filteredx = this.filter(function(box) {
		return type.indexOf(box.get("type").toUpperCase()) !== -1;
	});
	
	return new EventsCollection(filteredx);
	
	
	},
	
	removePosters: function() {	
		filteredx = this.filter(function(box) {
		return box.get("type").indexOf("Poster") == -1;
	});

	
	},
	 
	  

      parse : function(data) {
  
		return data   
      }

 
  });

  return SettingsCollection;

});
