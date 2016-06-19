define([
  'jquery',
  'underscore',
  'backbone',
  'collections/events/EventsCollectionSERVER',
  'collections/workshop/WorkShopCollection',
  'text!templates/workshops/eventImages.html',
], function($, _, Backbone, EventsCollection,WorkShopcollection, eventImages){

  var HomeView = Backbone.View.extend({
  
    el: $("#eventsList"),
	
	initialize : function(models, options) {   },
	
	template: _.template(eventList),
	
	workShoptemplate: _.template(workshopListTemplate),
	
	eventListTemplate: _.template(workshopListTemplate),
	
	render: function (response) { 	
		
		
  	},
	

	
	cycleImages: function() {
		var $active = $('#cycler .active');
		var $next = ($active.next().length > 0) ? $active.next() : $('#cycler img:first');     
		$active.fadeOut(1000,function(){//fade out the top image  
		$active.css('z-index',1).removeClass('active')//reset the z-index and unhide the image
		$next.css('z-index',3).fadeIn(1000,function(){}).addClass('active')//make the next image the top one
      });
	
    },

		
		
	}; 
	i++
  })
  
	   self.render(self.collection)


	}, dataType: "json" });
	var self=this
setInterval(function(){ self.cycleImages() }, 10000);


  		}

  });

  return HomeView;
  
});
