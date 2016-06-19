// by Mark Pajak (Bristol Museums Galleries and Archives)
define([
	  'jquery',
	  'underscore',
	  'backbone',
	  'text!templates/videos/youtube.html',
	  'collections/videos/videoCollection',
	  'helpers/Globals',
	  'https://www.youtube.com/iframe_api'
], function($, _, Backbone ,youtubeTemplate,VideoCollection,Globals,iframe_api){

  var Videoview = Backbone.View.extend({
  
    el: $("#eventsList"),
	

	initialize: function(options){
	
	
			var self=this
			this.logoOffset = (options.logoOffset)
			this.videoOffset = (options.videoOffset)
			this.posterOffset  = (options.posterOffset )
			this.stick = (options.stick)
			this.venue = (options.venue)
			this.orientationSpecific = settings.posterOrientationSpecific
			this.settings = (options.settings)
			
			//code added to enable skipping posters using the arrows
			document.onkeydown = function(e) {
			
					switch (e.keyCode) {
								case 37:
								  
									this.videoOffset = (options.videoOffset-2)
								
									self.close()
									
									self.addPostersFromLocaLFile()
									break;
								case 38:
								
									break;
								case 39:
								   // ('right');
										this.videoOffset = (options.videoOffset+1)
									
										self.close()
									self.addPostersFromLocaLFile()
									break;
								case 40:
								  //  alert('down');
									break;
				}
		};
			
			
			

	},
	
		events: {
			  'keyup ': 'logKey',
			  'keypress body': 'logKey'
		} ,
		
		logKey: function(e) {
			console.log(e.type, e.keyCode);

			},
	

	PostertemplatePortrait:  _.template(youtubeTemplate),
	
	goToNextView: function(videoOffset){
	
					var self=this
					if(this.stick=="move" && settings.eventsListMode_time>0){			
						window.history.pushState('object or string', 'Title', '#events/venue'+	self.venue+"/logo"+self.logoOffset +"/poster"+videoOffset+"/machine"+self.settings.machineName);
						window.location.reload();					
					} else if(this.stick=="move"&& settings.sponsorMode_time>0){			
						window.history.pushState('object or string', 'Title', '#sponsors/venue'+	self.venue+"/logo"+self.logoOffset +"/poster"+videoOffset+"/machine"+self.settings.machineName);
						window.location.reload();					
					}
					
					else{										
						setTimeout(function() {						
						Backbone.history.navigate( '#videos/venue'+	self.venue + "/p"+self.logoOffset+"/poster"+videoOffset+"/machine"+self.settings.machineName);
						}, settings.posterMode_time * 1000);						
					}
		},
		
		renderVideos: function (response) { 
	
					var	miniFont=false
					var displayCaption = true
		
					if(Globals.curentView){
					Globals.curentView.close()
					}
					var self=this
					if(	self.videoOffset>= response.models.length){self.videoOffset=0}

					self.$el.html(self.PostertemplatePortrait({video: response.models[self.videoOffset],displayCaption:displayCaption,miniFont:miniFont},offset=self.videoOffset,TemplateVarialbes=Globals.Globals));	

					youotubeid=response.models[self.videoOffset].get('youtubeid')
					self.onYouTubeIframeAPIReady(youotubeid)
					self.videoOffset++	
		
		},
			
		addPostersFromLocaLFile: function(){ 
		
							var self = this;
							self.videoCollection = new VideoCollection({parse:true}) 
							self.videoCollection.fetch({ success : function(data){
							self.videoCollection.reset(data.models[0].get('videos'))
							//self.videoCollection=(self.videoCollection.byEventType(self.settings.eventTypes));
							//self.videoCollection=(self.videoCollection.venueFilter(self.venue));
							self.renderVideos(self.videoCollection)
					
		
						}, dataType: "json" });
		
		},
		

     
	  onYouTubeIframeAPIReady: function(youtubeid){ 
	  
				      var self=this				  
					  player = new YT.Player('player', {
					  height: '500px',
					  width: '500px',
					  videoId: youtubeid ,
					  currentVideo:self.videoOffset,
					  videoCollection:self.videoCollection,
					 playerVars: {
								controls: 0,
								disablekb: 1
								
							},					  
					  events: {
						'onReady': self.onPlayerReady,
						'onStateChange':  self.onPlayerStateChange
					  }
					});
      },

     
	  onPlayerReady: function(event){ 

					event.backboneView = this
					event.target.playVideo();
      },

	   onPlayerStateChange: function(event){ 
	 
					var done = false;
					var self=this
					if(event.data==0){ //video has stopped playing
							//play videos from collection on a loop
							currentVideo=event.target.h.h.currentVideo+1
							if(	currentVideo>= event.target.h.h.videoCollection.models.length){
							currentVideo=0
							
							}
							youtubeid=event.target.h.h.videoCollection.models[currentVideo].get('youtubeid')
							event.target.cueVideoById(youtubeid)
							event.target.playVideo();
							event.target.h.h.currentVideo=currentVideo				
					}
					
      },
	  
	   stopVideo: function(){ 
  
					player.stopVideo();
      }
		

  });

  return Videoview;
  
});
