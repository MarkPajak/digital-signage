// by Mark Pajak (Bristol Museums Galleries and Archives)
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/sponsors/sponsorListTemplate.html',
  'collections/sponsors/SponsorCollection',
  'helpers/Globals',
], function($, _, Backbone, SponsorListTemplate ,SponsorCollection,Globals){

  var SponsorView = Backbone.View.extend({
  
    el: $("#eventsList"),
	
	initialize: function(options){
			
			
			var options=options.options
			
			this.logoOffset = (options.logoOffset) ||0			
			this.posterOffset = (options.posterOffset)
			this.stick = (options.stick)
			this.nextView=(options.nextView)
			this.venue = (options.venue)
			this.settings = (options.settings)
		        this.machineName = (options.machine)
			this.totalLogos = 0
			//NB this is hard coded: will need to change this if size of sponsor logos changes. Also may need to change if portrait mode
			this.numberofLogosInview = 12
			
	},

	Sponsortemplate:  _.template(SponsorListTemplate),
	
		goToNextView: function(venue,logoOffset,posterOffset,nextView,backupNextView){	
					var self=this	
					window.history.pushState('object or string', 'Title', '#' + self.nextView + '/venue'+	self.venue+"/logo"+ logoOffset +"/poster"+self.posterOffset+"/machine"+self.machineName);
					window.location.reload();

						//if(Globals.curentView){
						//Globals.curentView.close()
						//}
					//console.log('going to next view...' + 	nextView)
					//Backbone.history.navigate(nextView + '/venue'+	venue+"/logo"+ logoOffset +"/poster"+self.posterOffset+"/machine"+machineName, {trigger: true});
		},
		
	renderSponsors: function (response) { 

	var self = this;
	this.totalLogos =response.models.length
							if(response.models.length==0){
								
					window.history.pushState('object or string', 'Title', '#' + self.nextView + '/venue'+	venue+"/logo"+ self.logoOffset +"/poster"+self.posterOffset+"/machine"+self.machineName);
					window.location.reload();
							}
			

					
					self.logoOffset //i.e. number logo to start from
					 if(self.logoOffset>response.models.length-1){
					self.logoOffset=0
					}	
							
							if(self.logoOffset=="null"){self.logoOffset=0}
							console.log('starting from logox ' + self.logoOffset)
							this.$el.html(this.Sponsortemplate({sponsors: response.models},offset=self.logoOffset));
							
							this.justRenderedSponsors = response
			
					var sponsorsDisplayedInCurrentView = []
					
					//this bit checks which logos are in display so that they can be incremented when the template next loads			
					//setTimeout(function() {		
						
										var sponsrNo=0
										var numberOfSponsorsLoadedInView = 0
									
										_.each(response.models, function(sponsor)	{
									
												sponsortofind = document.getElementById("sponsor_" + sponsrNo)
												if($(sponsortofind).length>0){
												
													elementtoCheck = document.getElementById("sponsor_" + sponsrNo)
													
													sponsorTocheck=self.isElementInViewport(elementtoCheck)
													
													if(sponsorTocheck==true){
													
													numberOfSponsorsLoadedInView++
													$(elementtoCheck).addClass('appear').removeClass('hidden')
														sponsorsDisplayedInCurrentView.push(sponsor.get('logoIRN'))	
													}else{$(elementtoCheck).addClass('hidden')}
												}
												sponsrNo++
												
										})
								var timeoutVariable	
											
								console.log('just loaded ' + 	numberOfSponsorsLoadedInView  + ' logos')
								self.logoOffset+=parseInt(this.numberofLogosInview)
									console.log(self.logoOffset>=response.models.length)
								
								
									if(self.logoOffset>=response.models.length==false){
									
										timeoutVariable=setTimeout(function(){
												self.renderSponsors(response)										
										},settings.sponsorMode_time * 1000)		
									}		
									else{
									console.log('final page of logos')
									clearTimeout(timeoutVariable)
									setTimeout(function(){
									self.goToNextView(self.venue,self.logoOffset,self.posterOffset,self.nextView,self.backupNextView)

									},settings.sponsorMode_time * 1000)	
									}									
							
										
										
					//}, 1000);
		},
		
		initializeView: function(){ 
		
							var self = this;
							self.SponsorCollection = new SponsorCollection({parse:true}) 
							self.SponsorCollection.fetch({ success : function(data){
							
							
								  self.SponsorCollection.sortByField('name')
								if( self.SponsorCollection.length>0){
								  self.SponsorCollection.reset(data.models[0].get('sponsors'))
								  
								  self.SponsorCollection=self.SponsorCollection.notNull()
								  
	
										$( document ).ready(function() {
												if($(window).width()<$(window).height() ){	
										
										
											
											self.renderSponsors(self.SponsorCollection)
									
																								
												}else{
														console.log('next view')
														//NB NOT DISPLAYING SPONSOR MODE WHEN IN LANDSCAPE
														self.goToNextView(self.venue,self.logoOffset,self.posterOffset,self.nextView,self.backupNextView)
												}
										})
										
								}
								else{
								//failsafe in case no sponsors listed
								settings.sponsorMode_time =0
								self.goToNextView(self.venue,self.logoOffset,self.posterOffset,self.nextView,self.backupNextView)
								
								
								}
										
							}, dataType: "json" });
		
		},
		
		
		isElementInViewport: function(el) {

				//special bonus for those using jQuery
				if (typeof jQuery === "function" && el instanceof jQuery) {
					el = el[0];
				}

				var rect = el.getBoundingClientRect();

				return (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
					rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
				);
		},
	

  });

  return SponsorView;
  
});
