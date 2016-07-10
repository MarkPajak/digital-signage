// by Mark Pajak (Bristol Museums Galleries and Archives)
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/posters/posterFullScreenFaderTemplate_1080x1920.html',
  'collections/posters/PostersCollection',
  'Globals',
  'fotorama_amd',
], function($, _, Backbone, posterFullScreenTemplate ,PostersCollection,Globals,fotorama_amd){

  var PosterView = Backbone.View.extend({
  
    el: $("#eventsList"),
	

	initialize: function(options){
			var self=this
			this.logoOffset = (options.logoOffset)
			this.posterOffset = (options.posterOffset)
			this.stick = (options.stick)
			this.venue = (options.venue)
			this.orientationSpecific = settings.posterOrientationSpecific
			this.settings = (options.settings)
			this.no_internet=options.no_internet ||false

		
		
	},
	

	PostertemplatePortrait:  _.template(posterFullScreenTemplate),

	
	goToNextView: function(venue,logoOffset,posterOffset,nextView,backupNextView){	
					var self=this	
					//window.history.pushState('object or string', 'Title', '#' + nextView + '/venue'+	venue+"/logo"+ logoOffset +"/poster"+self.posterOffset+"/machine"+machineName);
					//window.location.reload();	
					
						Backbone.history.navigate(nextView + '/venue'+	venue+"/logo"+ logoOffset +"/poster"+self.posterOffset+"/machine"+machineName, {trigger: true});
					
		},
		
		renderPosters: function (response) { 
		
					var	miniFont=false
					var displayCaption = true
		
					if(Globals.curentView){
					Globals.curentView.close()
					}
					var self=this
					if(	self.posterOffset>= response.models.length){self.posterOffset=0}
					
	
								
								var width = (response.models[self.posterOffset].get('width'))
								var height = (response.models[self.posterOffset].get('height'))
								PORTRAIT=(parseInt(width)<=parseInt(height))
						
								ImageProportion =  width/height 
								console.log('ImageProportion='+ImageProportion)
								if(ImageProportion<=0.7){miniFont='miniFont'}
								if(ImageProportion<=0.6){miniFont='microFont'}
					
					
								
					var transition="Slide"
					
					if(settings.machineName=="BMAGPI1"){transition="crossfade"}
					console.log(this.venue)
					if(this.venue=="M SHED"){
					font="AmericanTypewriterStd-Med"
					}
					else
					{
					font="AvantGardeGothicITCW01Bk"
					}
					
					
				self.$el.html(self.PostertemplatePortrait({venue:this.venue,font:font,width:$(window).width(),no_internet:self.no_internet,posters: response.models,IndexCount : self.posterOffset,displayCaption:displayCaption,miniFont:miniFont,looptime: settings.posterLoop_time,transition:transition},offset=self.posterOffset,TemplateVarialbes=Globals.Globals));	
				
						
										
					
									
					self.posterOffset++
					setTimeout(function() {	
				
							self.posterOffset++	
						}, settings.posterLoop_time
						* 1000);
		
		},
			
		initializeView: function(){ 
		
							var self = this;
							self.PostersCollection = new PostersCollection({parse:true}) 
							
								if(this.no_internet==true){
								console.log('cant reach remote data....')
								self.listPostersFromLocalFile()	
						
								}
								else
								{
							
							self.PostersCollection.fetch({ 
							success : function(data){ 
							//n.b. no eror handling for if http://museums.bristol.gov.uk/sync/data/posters.JSON is down
							self.PostersCollection.reset(data.models[0].get('posters'))
							console.log(self.PostersCollection.length)
							self.PostersCollection=(self.PostersCollection.byEventType(self.settings.eventTypes));
							console.log('filter posters')
								console.log(self.PostersCollection.length)
							
							
							if($(window).width()<$(window).height()){
							self.PostersCollection=(self.PostersCollection.byOrientation('portrait'));
							}
							else{
							self.PostersCollection=(self.PostersCollection.byOrientation('landscape'));
							}
							
							
							self.PostersCollection=(self.PostersCollection.venueFilter(self.venue));
							self.PostersCollection=(self.PostersCollection.eventHasntFinished());
							
							
											
							$( document ).ready(function() {
								self.renderPosters(self.PostersCollection)
							})
		
						},
						
						error: function(data){ 
						console.log('cant reach remote data....')
						self.listPostersFromLocalFile()	
						
						
						}
						, dataType: "json" });
						
						}
		
		},
		
			listPostersFromLocalFile: function (events) {
	//n.b. cached JSON file can cause date issues if data has changed since

				   var self = this;	
			   
				   self.PostersCollection.url="data/posters.JSON"
				   self.PostersCollection.fetch({
					processData: true,
					success : function(collection){
					console.log('...found local data!')
				
					self.PostersCollection.reset(collection.models[0].get('posters'))
							self.PostersCollection=(self.PostersCollection.byEventType(self.settings.eventTypes));
							
							if($(window).width()<$(window).height()){
							self.PostersCollection=(self.PostersCollection.byOrientation('portrait'));
							}
							else{
							self.PostersCollection=(self.PostersCollection.byOrientation('landscape'));
							}
							
							
							self.PostersCollection=(self.PostersCollection.venueFilter(self.venue));
								self.PostersCollection=(self.PostersCollection.eventHasntFinished());
													
							$( document ).ready(function() {
								self.renderPosters(self.PostersCollection)
							})
				
						}, 
							
					dataType: "json" });
		
  		},

  });

  return PosterView;
  
});
