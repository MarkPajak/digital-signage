define([
  'underscore',
  'backbone',
  'models/message/messageModel'
], function(_, Backbone, MessageModel){

  var MessageCollection = Backbone.Collection.extend({
  
	sort_key: 'startTime', // default sort key
    
	comparator: function(item) {
        return item.get(this.sort_key);
    },
    
	sortByField: function(fieldName) {
        this.sort_key = fieldName;		
	},
 
    model: MessageModel,
    initialize : function(models, options) { 
	},
	
	dateISToday: function () {
	var toDay = new Date()
    var models = this.select(function (model) {
	
	
	var workshopDay = new Date(model.get('startDate'))	
        return workshopDay.getDate() == toDay.getDate();
    });
    return models;
	},
	
	greaterThan: function ( attribute, value) {
    var models = this.select(function (model) {
        return model.get(attribute) > value;
    });
    return models;
	},
	
	url : function() {

		var MessagesAPI = 'https://script.google.com/macros/s/AKfycbwyroVu6Q37FgG_-ddTWnFXABfLyRilLMrL8b5SfRo7QLcpNmA/exec?id=1VHc5AplL12Q7qYmmHcByg1ogneDJZCfpgY3CyulOMxI' ;
		//var MessagesAPI = 'data/sponsors.JSON';
		
        return MessagesAPI
      },
	  
	
      parse : function(data) {	  
		return data	       
      }

 
  });

  return MessageCollection;

});
