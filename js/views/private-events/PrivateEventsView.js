// by Mark Pajak (Bristol Museums Galleries and Archives)
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/private-events/private-events.html',
  'collections/posters/PostersCollection',
  'models/poster/PosterModel',
  'helpers/Globals',
], function($, _, Backbone, privateEventsTemplate ,PostersCollection,Globals){

  var PrivateEventView = Backbone.View.extend({
  
    el: $("#eventsList"),
	

	initialize: function(options){
			var self=this
			this.logoOffset = (options.logoOffset)
			this.posterOffset = (options.posterOffset)
			this.stick = (options.stick)
			this.venue = (options.venue)
			this.dir = (options.dir)
			this.orientationSpecific = settings.posterOrientationSpecific
			this.settings = (options.settings)
			this.no_internet=options.no_internet ||false
			
	
							    self.PostersCollection = new PostersCollection() 
							
								_.each(options.data, function ( val) {
								
								pictures_in_machine_name_folder = val.folder.replace(" ","").toLowerCase()
								options.machine=options.machine.replace(" ","").toLowerCase()
								
								pictures_in_venue_folder = val.folder.replace(" ","").toLowerCase()
								options.venue=options.venue.replace(" ","").toLowerCase()
								
								
									  if(val.size<=137000000&& val.file.match(/.(jpe?g|png|JPEG|mov|MOV|JPG|mp?4|gif)$/)&& (pictures_in_machine_name_folder==options.machine
										||pictures_in_venue_folder==options.venue)
									  ) { 

									var board1 = new PosterModel({
									  path: val.link ,	 
									  type: val.type ,	 
									  file: val.file ,
										size:val.size									  
									});
									
									 self.PostersCollection.add(board1)
				 
				
				
									} 
									})
									
									self.render(self.PostersCollection)
								
					
						
					
		

		
		
	},
	
	render: function(collection){
	var self=this
	font="AmericanTypewriterStd-Med"
	response="cheese"
	displayCaption="false"
	miniFont=true
	transition="fade"
	console.log(collection)
		self.$el.html(self.PostertemplatePortrait({posters:collection.models,venue:this.venue,font:font,width:$(window).width(),no_internet:self.no_internet,IndexCount : self.posterOffset,displayCaption:displayCaption,miniFont:miniFont,looptime: settings.posterLoop_time,transition:transition},offset=self.posterOffset,TemplateVarialbes=Globals.Globals));	
		
	},
	

	PostertemplatePortrait:  _.template(privateEventsTemplate),



  });

  return PrivateEventView;
  
});
