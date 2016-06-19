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
			
			this.logoOffset = (options.logoOffset)
			
			this.posterOffset = (options.posterOffset)
			this.stick = (options.stick)
			this.venue = (options.venue)
			this.settings = (options.settings)
	},

	Sponsortemplate:  _.template(SponsorListTemplate),
	
	goToNextView: function(logoOffset){
					var self=this

					if(this.stick=="move"&& settings.posterMode_time>0){			
						setTimeout(function() {
					
								window.history.pushState('object or string', 'Title', '#posters/venue'+	self.venue+"/logo"+logoOffset+"/poster"+self.posterOffset+"/machine"+self.settings.machineName);
								window.location.reload();
						}, settings.sponsorMode_time * 1000);
					}
					
					
						else if(this.stick=="move"&& settings.eventsListMode_time>0){	
					
						setTimeout(function() {
						
								window.history.pushState('object or string', 'Title', '#events/venue'+	self.venue+"/logo"+logoOffset+"/poster"+self.posterOffset+"/machine"+self.settings.machineName);
								window.location.reload();
						}, settings.sponsorMode_time * 1000);
					}
					
		
					else 
					{
						setTimeout(function() {	
					
								Backbone.history.navigate( '#sponsors/venue'+	self.venue + "/p"+logoOffset);
								window.history.pushState('object or string', 'Title', '#sponsors/venue'+	self.venue + "/stick_Y/logo"+self.logoOffset+"/poster"+self.posterOffset+"/machine"+self.settings.machineName);
								window.location.reload();
						}, settings.sponsorMode_time * 1000);				
				
					}

		},
		
	renderSponsors: function (response) { 

	var self = this;

							if(response.models.length==0){
								window.history.pushState('object or string', 'Title', '#posters/venue'+	self.venue + "/logo"+self.logoOffset+"/poster"+self.posterOffset+"/machine"+self.settings.machineName);
								window.location.reload();
							}
					
					

					if(response!== this.justRenderedSponsors){	
							if(self.logoOffset>response.models.length-1){
							self.logoOffset=0
							}	
							
							this.$el.html(this.Sponsortemplate({sponsors: response.models},offset=self.logoOffset));
							this.justRenderedSponsors = response
					 }
			
					var sponsorsDisplayedInCurrentView = []
					
					//this bit checks which logos are in display so that they can be incremented when the template next loads			
					setTimeout(function() {		
						
										var sponsrNo=0
										_.each(response.models, function(sponsor)	{
												sponsortofind = document.getElementById("sponsor_" + sponsrNo)
												if($(sponsortofind).length>0){
													elementtoCheck = document.getElementById("sponsor_" + sponsrNo)
													sponsorTocheck=self.isElementInViewport(elementtoCheck)
													
													if(sponsorTocheck==true){
													$(elementtoCheck).addClass('appear').removeClass('hidden')
														sponsorsDisplayedInCurrentView.push(sponsor.get('logoIRN'))	
													}else{$(elementtoCheck).addClass('hidden')}
												}
												sponsrNo++
										})
											
										var increment=parseInt(self.logoOffset)+sponsorsDisplayedInCurrentView.length

										self.logoOffset=increment
										self.goToNextView(self.logoOffset)
										
					}, 1000);
		},
		
		cycleSponsors: function() {

								var $active = $('#sponsorCylcer .active');
								var $next = ($active.next().length > 0) ? $active.next() : $('#sponsorCylcer div:first');
								$active.clearQueue();
								$active.fadeOut(1000,function(){//fade out the top image  
								$active.css('z-index',1).removeClass('active')//reset the z-index and unhide the image
								$next.css('z-index',3).fadeIn(1000,function(){}).addClass('active')//make the next image the top one
		
		});
		
		},
		
		addSponsorsFromLocaLFile: function(){ 
		
							var self = this;
							self.SponsorCollection = new SponsorCollection({parse:true}) 
							self.SponsorCollection.fetch({ success : function(data){
							
							
								  self.SponsorCollection.sortByField('name')
								if( self.SponsorCollection.length>0){
								  self.SponsorCollection.reset(data.models[0].get('sponsors'))
								  
								  self.SponsorCollection=self.SponsorCollection.notNull()
								  console.log(self.SponsorCollection)
	
										$( document ).ready(function() {
											self.renderSponsors(self.SponsorCollection)
										})
								}
								else{
								//failsafe in case no sponsors listed
								settings.sponsorMode_time =0
								self.goToNextView(self.logoOffset)
								
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
