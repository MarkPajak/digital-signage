// by Mark Pajak (Bristol Museums Galleries and Archives
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/events/EventsCollectionSERVER',
  'collections/workshop/WorkShopCollection',
  'collections/sponsors/SponsorCollection',
  'collections/messages/MessagesCollection',
  'collections/arrows/ArrowCollection',
  'text!templates/events/blankEvent_1080x1920.html',
  'text!templates/workshops/workshopListTemplate.html',
  'text!templates/sponsors/sponsorListTemplate.html',
  'helpers/Globals'
], function($, _, Backbone, EventsCollection,WorkShopcollection,SponsorCollection, MessagesCollection,ArrowCollection, eventList,workshopListTemplate,SponsorListTemplate,Globals){

  var EventView = Backbone.View.extend({
  
    el: $("#eventsList"),
	
	  events: {
      "click ":  "goNext",
    },

	
	initialize: function(options){
	
			var options=options.options
			this.venue=(options.venue).toUpperCase()
			
			this.stickyEvents = 5
			this.queryparams=options
			this.querystring=options
			this.settings = (options.settings)
			this.eventOffset=0 //i.e. number logo to start from
			
			//SCROLLER VARIABLES
			this.eventscrollTIme = 15
			this.eventHeight = 225 

	
			this.logoOffset = (options.logoOffset)
			this.posterOffset = (options.posterOffset)
			this.stick = (options.stick)
			this.nextView=(options.nextView)
			
			this.settings = (options.settings)
			this.totalLogos = 0
			//NB this is hard coded: will need to change this if size of sponsor logos changes. Also may need to change if portrait mode
			this.numberofLogosInview = 7
			
			
			
	},
	
		
	goNext: function(options){
		var self=this
		this.goToNextView(self.venue,self.logoOffset,self.posterOffset,self.nextView,self.backupNextView,self.eventOffset)
									
	},

	template: _.template(eventList),
	
	goToNextView: function(venue,logoOffset,posterOffset,nextView,backupNextView){	
					var self=this	
					window.history.pushState('object or string', 'Title', '#' + nextView + '/venue'+	venue+"/logo"+ logoOffset +"/poster"+self.posterOffset+"/machine"+machineName);
					window.location.reload();
	

					
		},
	
	workShoptemplate: _.template(workshopListTemplate),
	Sponsortemplate:  _.template(SponsorListTemplate),

		ChangeStyle:  function (querystring) {
		var self=this
		$( document ).ready(function() {
	
		//MSHED STYLE		
		if (self.venue=="M SHED"){
					$('body').css({															
				"background":
				" #c4030d; /* Old browsers */",
				"background":" -moz-linear-gradient(top, #c4030d 0%, #8f0222 78%, #6d0019 100%)",
				"background":" -webkit-gradient(linear, left top, left bottom, color-stop(0%,#c4030d), color-stop(78%,#8f0222), color-stop(100%,#6d0019)); /* Chrome,Safari4+ */",
				"background":" -webkit-linear-gradient(top, #c4030d 0%,#8f0222 78%,#6d0019 100%)",
				"background":" -o-linear-gradient(top, #c4030d 0%,#8f0222 78%,#6d0019 100%)",
				"background":" -ms-linear-gradient(top, #c4030d 0%,#8f0222 78%,#6d0019 100%)",
				"background":" linear-gradient(#BF0101,  rgb(91, 1, 9) 100%)",
				
				"filter":" progid:DXImageTransform.Microsoft.gradient( startColorstr='#c4030d', endColorstr='#6d0019',GradientType=0 )"
					})
					
				
					$('#bmagLOGO').hide()
					
					$('.venue-image--ident-digiscreenBMAG ').css({					
							
							"background-color":" #C20E0E"
							
					})

					$('#header,#sidebar').css({
					"background-color":" #515153",
					   
					})
					$('#heading').css({
					"right":" -90px",
					"position":" absolute",
					"top":" -120px",
					"width":" 100%",
						})


						$('#heading h1').css({
							"font-family": 'AmericanTypewriterStd-Med',
							"font-style":" normal",
							"font-weight":" 400",
							"margin-right": "83px",
							"top": "40px",
							"right":" -200px",
							"width": "100%",
							"height":" 900px",
							"position":" absolute",
							"color": "white",
							"font-size": "105px"
						})
					
						}
						else
						{

						
						$('#heading, .event_type,.eventHeading').css({
						"font-family": "AvantGardeGothicITCW01Bk"})
						
						$('#heading').addClass('heading')
						$('#heading h1').css({
								
								"left":" 10px",
								"position":" absolute",
								"font-size": "85"})
						
						}
						
				
					
				
				
					
			
			})
  		},
	
	
	Sponsortemplate:  _.template(eventList),
	
			initializeView: function (querystring) {
  
				var self = this;
				self.getData(querystring)	

  		},
		
		getData: function(querystring){
						var self = this;
						this.options = querystring
					
						 self.collection = new EventsCollection({parse:true})	
						self.collection.url=self.settings.eventsAPI
				
						//self.listEventsFromLocalFile(querystring)	
					
						self.collection.fetch({
							data:  querystring ,
							processData: true,
							success : function(collection){	
							console.log('events from remote file' + self.collection.url)
							console.log('collection',collection)
							self.gotEvents(querystring,collection)		
						}, 
						error : function(error){
							self.listEventsFromLocalFile(querystring)				
						},				
						dataType: "json" });
					
						
		},
		
	listEventsFromLocalFile: function (querystring) {

				   var self = this;	
				   self.collection = new EventsCollection({parse:true})						   
				   self.collection.url="data/events.JSON"
				   console.log('vents from local file' + self.collection.url)
				   self.collection.fetch({
				   
					//data:  querystring ,
					//processData: true,
					success : function(collection){
					
					self.gotEvents(querystring,collection)				
						}, 
							
					dataType: "json" });
		
  		},
		
		

		
		
		
		gotEvents:function(querystring,collection){

								
								var self = this;
								
								self.collection.reset(collection.models[0].get('events'));
									
								
								if(self.options.date=="today"){								
									//self.collection=self.collection.dateISToday();
									}
									
								self.collection.sortByField('startDate') 
								
								
								self.collection=self.collection.byVenue(querystring.venue);								
								self.collection=self.collection.byEventType(self.options.type);
									
					
								self.collection=self.collection.removePosters();
							
								
								
								var i=0
								self.collection.each(function(event){ 
							
					
								if(event.get('images')==""){
										var images = []
										switch(event.get('venue')['SummaryData']) {
													case 'M Shed':
													images.irn=37416
													event.set('images',images)
													break;
													case 'Bristol Museum & Art Gallery':
												   images.irn=3543
												   event.set('images',images)
													break;
													default:
													images.irn=3543
												   event.set('images',images)				  
										}
								}; 
								i++	})
															
				
			  self.MergeWorkshopaAndEvents(self.collection)
		
		
			setTimeout(function() {									
				self.imageFader(self.collection)	
							}, 1* 700);

		},
		
			MergeWorkshopaAndEvents: function(events){	
				this.addWorkShops(events)	
		},
		
		addWorkShops: function(events){
		
		   var self = this;
		   self.WorkShopcollection = new WorkShopcollection({parse:true}) 
		
		  switch(self.options.venue.toUpperCase()) {
													case 'MSHED':
													self.WorkShopcollection.url=self.options.settings.MSHEDworkshopsAPI
													break;
													case 'M SHED':
													self.WorkShopcollection.url=self.options.settings.MSHEDworkshopsAPI
													break;
													case 'BRISTOL MUSEUM & ART GALLERY':
												
												   self.WorkShopcollection.url=self.options.settings.workshopsAPI
													break;
													case 'BMAG':
												   self.WorkShopcollection.url=self.options.settings.workshopsAPI
													break;
													default:
													self.WorkShopcollection.url=self.options.settings.workshopsAPI			  
										}
	
		
		 
		   
		   
		   self.WorkShopcollection.fetch({ success : function(data){
		
					self.WorkShopcollection.reset(data.models[0].get('events')) 
					self.WorkShopcollection.sortByField('startTime') 
					
					var toDay = new Date()
					var HOUR = toDay.getHours()-1
					var DAY = toDay.getDate()
					console.log(self.options.type)
					self.WorkShopcollection = self.WorkShopcollection.byEventType(self.options.type);
					var currentworkshops = self.WorkShopcollection.dateISToday()//var currentworkshopsX = new 
					currentworkshops.sortByField('startTime') 
					self.renderWorkShopsANDEVents(currentworkshops,events)
				

			},error : function(error){	
					
						self.listWorkshopsFromLocalFile(events)				
					},				
					dataType: "json" });
		
		},
		
		
						
	listWorkshopsFromLocalFile: function (events) {
	//n.b. cached JSON file can cause date issues if data has changed since

				   var self = this;	
			   
				   self.WorkShopcollection.url="data/workshops.JSON"
				   self.WorkShopcollection.fetch({
					processData: true,
					success : function(collection){
					
				
					self.WorkShopcollection.reset(collection.models[0].get('events')) 
					self.WorkShopcollection.sortByField('startTime') 			
				
					var currentworkshops = self.WorkShopcollection.dateISToday()//var currentworkshopsX = new 
					self.renderWorkShopsANDEVents(currentworkshops,events)
				
						}, 
							
					dataType: "json" });
		
  		},
		
				
		  imageFader: function (events) {

				   var self = this;				 
				   self.Imagecollection = new EventsCollection({parse:true})	
				   self.Imagecollection.url= this.options.url
				   self.Imagecollection.reset(events.models)
				   
				   self.Imagecollection=self.Imagecollection.byVenue(self.venue);
				   self.renderImages(self.Imagecollection)
				   self.cycleImages()
					setInterval(function(){ self.cycleImages() }, 1 * 20 * 1000);
			
  		},
		
			renderImages: function (response) { 

				var self = this; 

				if(	this.venue.toUpperCase()=="M SHED"){
						if($(window).width()>$(window).height()){
						
									//this.Imagestemplate = _.template(eventImagesMSHED_landscape)
						}
						else{
						
									//this.Imagestemplate = _.template(eventImagesMSHED)
						}

				}		
		
					// $("#eventsImages").html(this.Imagestemplate({events: response.models,TemplateVarialbes:Globals.Globals,GradientFilter:this.options.imageGradientFilter})); DEVDEV
				
  	},
	
		cycleImages: function() {

					var $active = $('#cycler .active');
					var $next = ($active.next().length > 0) ? $active.next() : $('#cycler img:first');
					 
					$active.fadeOut(3000,function(){//fade out the top image  
					$active.css('z-index',1).removeClass('active')//reset the z-index and unhide the image
					$next.css('z-index',3).fadeIn(3000,function(){}).addClass('active')//make the next image the top one
					$('#captionBox h2').html($next.attr('alt'))
					$('#captionBox').css('z-index',5)
		});
		
		},
		

		
	renderWorkShopsANDEVents: function (response,events) { 
				var self = this			 
				workShopRowNo=events.models.length			
				var rawCollection = events.toJSON().concat(response.toJSON());
			
				//self.newCollection = new Backbone.Collection(rawCollection);
				self.newCollection = new EventsCollection();			
				self.newCollection.reset(rawCollection)
				
				self.newCollection=self.newCollection.dateISToday('startDate')
				self.newCollection=self.newCollection.getUniqueByProperty('name')
				 //self.newCollection.sortByField('startDate') 
				 
				response=self.newCollection 
				this.getArrows(response)
				this.ChangeStyle()
				
			
				
				
	},
	
	render: function (response) { 
		
				var self=this
				this.totalLogos =response.models.length
				 if(self.eventOffset>response.length){
					self.eventOffset=0
				}				


				
							if(response.models.length==0){
								window.history.pushState('object or string', 'Title', '#fader/venue'+	self.venue + "/logo"+self.logoOffset+"/poster"+self.posterOffset+"/machine"+self.settings.machineName);
								window.location.reload();
							}
			
						//remove time from workshops
							var monthNames = [	"January", 
												"February", 
												"March", 
												"April", 
												"May", 
												"June",
												"July",
												"August", 
												"September", 
												"October", 
												"November", 
												"December"];
												var facilities = []
							response.each(function(log,i) {
							//process dates
											var workshopEnd = new Date(log.get('endDate')) //NB TIME VALUE INCLUDED							
											var WSdate = workshopEnd.getDate();
											var WSmonth =  monthNames[workshopEnd.getMonth()]
											var WSyear = workshopEnd.getFullYear();
											workshopEndMinusTime= WSmonth+ " " +WSdate + " " + WSyear 
											response.models[i].set('endDate',workshopEndMinusTime)
											
										
											
											var startDate = new Date(log.get('startDate')) //NB TIME VALUE INCLUDED
											var WSdate = startDate.getDate();
											var WSmonth =  startDate.getMonth();
											var WSyear = startDate.getFullYear();
											
											workshopStartMinusTime=new Date(WSyear,WSmonth,WSdate);
											var WSmonth =  monthNames[startDate.getMonth()]
											
										
												
												
											
										
											  
											  
					 var toDay = new Date()//NB TIME VALUE INCLUDED - STRIP OUT ALL TIME BECAUSE OTHERWISE DATE OF EVENT MAY BE GREATER THAN CURRENT DATTIME EVEN THOUGH THE DATE IS CURRENT 
											
											var toDaydate = toDay.getDate();
											var toDaymonth = toDay.getMonth();
											var toDayyear = toDay.getFullYear();
											toDayMinusTime=new Date(toDayyear,toDaymonth,toDaydate);
											
											startDateInwords= WSmonth+ " " +WSdate + " " + WSyear 
											response.models[i].set('startDate',startDateInwords)
											if(toDayyear==WSyear){WSyear=""}
											startDateInwords= WSmonth+ " " +WSdate + " " + WSyear 
											
											response.models[i].set('startDateInwords',startDateInwords)
											
											
											if(workshopStartMinusTime>toDayMinusTime){ response.models[i].set('comingSoon','Y')}
											
											toDayMinusTime= monthNames[toDay.getMonth()]+ " " +toDaydate + " " + toDayyear 
											response.models[i].set('toDayMinusTime',toDayMinusTime)
											
												
											
									//process arrows
									var currentCategory ="none";
									rowCounter=0
									var Direction = ['left', 'right', 'up','down','upstairs']; 
									var randDirection = Direction[Math.floor(Math.random() * Direction.length)];
									var randDirection = '';	
								
					
								
							
								 	self.ArrowCollection.each(function(arrow){ 
									
												if(	arrow.attributes['event_space']== log.get('event_space') ||	arrow.attributes['event_space']== log.get('room')){
													
													if(	arrow.attributes['direction']==1){ 
															randDirection='<img  class="arrow left" src="assets/arrows.png"/>'
													}  else if(	arrow.attributes['direction']==2){ 
														randDirection='<img  class="arrow right" src="assets/arrows.png"/>'
														}else  if(		arrow.attributes['direction']==3){ 
														randDirection='<img  class="arrow up" src="assets/arrows.png"/>'
													}  else if(		arrow.attributes['direction']==4){ 
														randDirection='<img  class="arrow down" src="assets/arrows.png"/>'
													}  else if(		arrow.attributes['direction']==5){ 
														randDirection='<img  class="arrow right upstairs" src="assets/arrowUp.png"/>'
													} else if(		arrow.attributes['direction']==6){ 
														randDirection='<img  class="arrow right upstairs" src="assets/downstairs.png"/>'
													} 
													
													}
													 response.models[i].set('arrowDirection',randDirection)
													 console.log(randDirection)
											})
											
											//process facilities
											
											if( log.get('type') =='Facilities'){
											
											facilities.push(response.models[i])
											
											}
											
						
									})
									
								
							
								this.numberOfFacilties  = facilities.length
							
							
							
							
							this.$el.html(this.Sponsortemplate({venue:self.venue,eventSandWorkshops: response.models,facilities:facilities},offset=self.eventOffset));
							this.justRenderedSponsors = response
							
							this.ChangeStyle()
			
								var sponsorsDisplayedInCurrentView = []
								var sponsrNo=0
								var numberOfSponsorsLoadedInView = 0
								var timeoutVariable	
											
								//increment the events
								self.eventOffset+=this.numberofLogosInview  									
								
								
								
								
									if(self.eventOffset>=response.models.length==false){
									
									//timeoutVariable=setTimeout(function(){
										
									var moveUpLength = 0									
									
									var numberOfIncrements = 0
									
						elementtoCheck =document.getElementById("sponsor_" + (parseInt(response.length-self.numberOfFacilties,10)-2))								
							sponsorTocheck=self.isElementInViewport(elementtoCheck)
										$('.more_events').show()				
							if(sponsorTocheck==true){ 
							
								}else{
										$('.more_events').show()
								}							
									
									
									
	this.scroller = setInterval(function(){
											
										moveUpLength+= $('.borderx').height()+38
										var moveUpTextLength =  "-" + moveUpLength + "px"
												
		$("#scrollerebox").animate( { top:moveUpTextLength }, { queue:false, duration:	
													1000 });
													

	elementtoCheck =document.getElementById("sponsor_" + (parseInt(response.length-self.numberOfFacilties,10)-2))								
			sponsorTocheck=self.isElementInViewport(elementtoCheck)
												
							if(sponsorTocheck==true){ //reached last bit	
							
							$('.more_events').hide()
								clearInterval(self.scroller)												
														clearTimeout(timeoutVariable)
														setTimeout(function(){
														self.goToNextView(self.venue,self.logoOffset,self.posterOffset,self.nextView,self.backupNextView,self.eventOffset)
														},settings.eventsListMode_time* 1000)	
													}
													else{
													$('.more_events').show()
													}
													numberOfIncrements++
												//}
												},self.eventscrollTIme* 1000)
												
														
									}		
									else{
									
									clearTimeout(timeoutVariable)
									setTimeout(function(){
									self.goToNextView(self.venue,self.logoOffset,self.posterOffset,self.nextView,self.backupNextView,self.eventOffset)
										},settings.eventsListMode_time* 1000)		
									
									}									
							
							$('#bmagLOGO, #eventsListTable, #sponsorCylcer,.aside').addClass('appear').removeClass('hidden')
							
										
										
				 
		},
		
		
				
		getArrows: function (response) { 
					var self = this
					self.ArrowCollection = new ArrowCollection()
					self.getArrowsFromLocalFile(response)
					/*
					self.ArrowCollection.fetch({ success : function(data){
							self.ArrowCollection.reset(data.models) 
							self.ArrowCollection=self.ArrowCollection.byMachine(self.options.machineId)
							console.log(self.options.machineId,self.ArrowCollection)
							self.render(response)
							//window.ArrowCollection=self.ArrowCollection
							localStorage.setItem('ArrowCollection', JSON.stringify(self.ArrowCollection));

					},error : function(data){
							self.getArrowsFromLocalFile()
						},

					
					})	
				*/					
		
		},
		
			
		getArrowsFromLocalFile: function (response) {

					   var self = this
					   self.ArrowCollection = new ArrowCollection()						   
					   self.collection.url="http://museums.bristol.gov.uk/sync/data/arrows.JSON"
					   
					   self.collection.fetch({				   
					   success : function(data){					
					   self.ArrowCollection.reset(data.models) 
								self.ArrowCollection=self.ArrowCollection.byMachine(self.options.machineId)
								//console.log(self.options.machineId,self.ArrowCollection)
								self.render(response)	
								localStorage.setItem('ArrowCollection', JSON.stringify(self.ArrowCollection));					
						}, 
								
						dataType: "json" });
			
			},
		
		
		addSponsorsFromLocaLFile: function(){ 
		
							var self = this;
							self.SponsorCollection = new SponsorCollection({parse:true}) 
							self.SponsorCollection.fetch({ success : function(data){
							
							
								  self.SponsorCollection.sortByField('name')
								if( self.SponsorCollection.length>0){
								  self.SponsorCollection.reset(data.models[0].get('sponsors'))
								  
								  self.SponsorCollection=self.SponsorCollection.notNull()
								  
	
										$( document ).ready(function() {
												if($(window).width()<$(window).height() ){	
										
										
											
											self.renderWorkShopsANDEVents(self.SponsorCollection)
									
									
									
									
																								
												}else{
														//console.log('next view')
														//NB NOT DISPLAYING SPONSOR MODE WHEN IN LANDSCAPE
														self.goToNextView(self.venue,self.logoOffset,self.posterOffset,self.nextView,self.backupNextView)
												}
										})
										
								}
								else{
								//failsafe in case no sponsors listed
								settings.sponsorMode_time =0
								//self.goToNextView(self.venue,self.logoOffset,self.posterOffset,self.nextView,self.backupNextView)
								
								
								}
										
							}, dataType: "json" });
		
		},
		
		
		isElementInViewport: function(el) {
try{
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
		}catch (er){}	
	
			
		},
	

  });

 
  
  return EventView;
  
});
