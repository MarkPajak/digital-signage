define([
	'jquery',
	'underscore',
	'backbone',
	'views/instagram/InstagramView',
	'views/events/EventsViewRoller',
	'views/sponsors/SponsorFullScreenView',
	'views/posters/PosterFullScreenFaderView',
	'views/private-events/PrivateEventsView',		
	'helpers/Globals',
	'text!../data/settings2.JSON'
	
	], function($, _, Backbone, 
	
	InstagramView,
	EventsViewSERVER,
	SponsorView,
	PosterFaderView,
	PrivateEventsView,
	Globals,
	Settings) {

	var initialize = function(){
		
				if(!Globals) location.reload()					
				var date = date || "today";	
				var app_router = new AppRouter;
				var self=this
				this.app_router=app_router
				
				 app_router.on('route:sponsors', function(venue,stick,logoOffset,posterOffset,machine,date,instagram){

						this.LoadView('sponsors',SponsorView,'fader',venue,stick,logoOffset,posterOffset,machine,date,instagram)
				}),
				
				 app_router.on('route:fader', function(venue,stick,logoOffset,posterOffset,machine,date,instagram){			
						
						this.LoadView('fader',PosterFaderView,'instagram',venue,stick,logoOffset,posterOffset,machine,date,instagram)
				}),
				
				app_router.on('route:instagram', function(venue,stick,logoOffset,posterOffset,machine,date,instagram){							
									
						this.LoadView('instagram',InstagramView,'events',venue,stick,logoOffset,posterOffset,machine,date,instagram)
				}),
						
			   app_router.on('route:events', function(venue,stick,logoOffset,posterOffset,machine,date,instagram){			
					
						this.LoadView('events',EventsViewSERVER,'sponsors',venue,stick,logoOffset,posterOffset,machine,date,instagram)
				}),
				
				 app_router.on('route:videos', function(venue,stick,logoOffset,posterOffset,machine,date,videoOffset,instagram){			
						
						this.LoadView('videos',VideoView,'sponsors',venue,stick,logoOffset,posterOffset,machine,date,instagram)		
				}),
							  
				Backbone.history.start();
		};
		
  
	var AppRouter = Backbone.Router.extend({
   
	   routes: {
		'instagram(/venue:venue)(/stick:stick)(/logo:page)(/poster:page)(/machine:machine)(/date:all)(/instagram:instagram)': 'instagram',  
		'sponsors(/venue:venue)(/stick:stick)(/logo:page)(/poster:page)(/machine:machine)(/date:all)(/instagram:instagram)': 'sponsors',  
		'events(/venue:venue)(/stick:stick)(/logo:page)(/poster:page)(/machine:machine)(/date:all)(/instagram:instagram)':'events',
		'videos(/venue:venue)(/stick:stick)(/logo:page)(/poster:page)(/machine:machine)(/date:all)(/videoOffset:videoOffset)(/instagram:instagram)':'videos',
		'fader(/venue:venue)(/stick:stick)(/logo:page)(/poster:page)(/machine:machine)(/date:all)(/videoOffset:videoOffset)(/instagram:instagram)':'fader',
		'*path':'events'
		},
	
	
	normal_mode_if_not_private: function(viewName,nextView,ViewToLoad,no_internet,options,venue,stick,logoOffset,posterOffset,machine,settings,type){
	
								if(Globals.curentView){
									Globals.curentView.close()
								}	
								var sponsorView = new ViewToLoad({no_internet:no_internet,options:options,venue:venue,stick: stick,logoOffset:logoOffset,posterOffset:posterOffset,machine:machine,settings:settings,type: type});
								
								sponsorView.initializeView(options);
								
								Globals.curentView=sponsorView					
								
								if(viewName=="fader" || viewName=="instagram"){
									this.viewSwitcher(	venue,
														logoOffset,
														Globals.curentView,
														stick,
														nextView,
														settings.eventsListMode_time,
														'events',
														settings.instagram_time||0,//timeOut,
														settings.posterMode_time,
														posterOffset
									)		
								}
	},
	
	
	 private_event_mode: function(viewName,nextView,ViewToLoad,no_internet,options,venue,stick,logoOffset,posterOffset,machine,settings,type){
	
		
						google_drive_public_dir= "https://script.google.com/macros/s/AKfycbwM0s-BIV9oOHtyV-wAoNirZHaf1eWXph8klsh8seYp3VdVE_JA/exec"
						
						var isprivateevent=false
						var self=this
						var fileextension = ".jpg";
						var number_ofFiles = 0
						var number_of_new_Files = 0
						$.ajax({
							url: google_drive_public_dir,
							success: function (data) {
								number_ofFiles=data.length
								_.each(data, function ( val) {
									pictures_in_machine_name_folder = val.folder.replace(" ","").toLowerCase()
									testmachine=options.machine.replace(" ","").toLowerCase()
									pictures_in_venue_folder = val.folder.replace(" ","").toLowerCase()
									testvenue=options.venue.replace(" ","").toLowerCase()
									if( val.file.match(/.(jpe?g|png|JPEG|mov|MOV|JPG|mp?4|gif)$/)&& 
									  (pictures_in_machine_name_folder==testmachine||pictures_in_venue_folder==testvenue)) {	
									   isprivateevent=true	
									} 
								})
								if(isprivateevent==true	){
									var privateEventView = new PrivateEventsView({dir:google_drive_public_dir,data:data,no_internet:no_internet,options,venue:venue,stick: stick,logoOffset:logoOffset,posterOffset:posterOffset,machine:machine,settings:settings,type: type});
									Globals.curentView=privateEventView		
									setInterval(function() {
										 dont_reload=false
										 $.ajax({
											url: google_drive_public_dir,
											success: function (data) {
												number_of_new_Files=data.length
												_.each(data, function ( val) {
														pictures_in_machine_name_folder = val.folder.replace(" ","").toLowerCase()
														testmachine=options.machine.replace(" ","").toLowerCase()
														pictures_in_venue_folder = val.folder.replace(" ","").toLowerCase()
														testvenue=options.venue.replace(" ","").toLowerCase()
														 if( val.file.match(/.(jpe?g|png|JPEG|mov|MOV|JPG|mp?4|gif)$/)&&
														 (pictures_in_machine_name_folder==testmachine
																||pictures_in_venue_folder==testvenue)) {	
																dont_reload=true	
														}
												})
												 var videoElement = $("video").get(0)
												if (number_of_new_Files!=number_ofFiles || dont_reload==false && (!videoElement || videoElement.paused)) {
													window.location.reload();
												}
												else
												{
													console.log('not going to relaod - video playing or still private event takeover')
												}								
											}
										})			
									}, 1* 60  * 1000); 
								}
								else
								{
								self.normal_mode_if_not_private(viewName,nextView,ViewToLoad,no_internet,options,venue,stick,logoOffset,posterOffset,machine,settings,type)
								}
							},
							 error: function (data) {
									self.normal_mode_if_not_private(viewName,nextView,ViewToLoad,no_internet,options,venue,stick,logoOffset,posterOffset,machine,settings,type)
							 }
						});
	
	
	},

	 doesConnectionExist: function() {
	
						var xhr = new XMLHttpRequest();
						var file = "http://museums.bristol.gov.uk/sync/data/events.JSON";
						var randomNum = Math.round(Math.random() * 10000);	 
						xhr.open('HEAD', file + "?rand=" + randomNum, false);
						 
						try {
							xhr.send();
							if (xhr.status >= 200 && xhr.status < 304) {
							console.log('internet connection')
							   return true;
							} else {
							console.log('no internet connection')
							$('.spinner').css({'background-image': "url('assets/no-wifi.jpg')",
							"background-size": "41px",
							"border-radius": "30px" 
							})
								return false;
							}
						} catch (e) {
						console.log('no internet connection')
							$('.spinner').css({'background-image': "url('assets/no-wifi.jpg')",
							"background-size": "41px",
							"border-radius": "30px"
							})
							return false;
						}
		},
	
	
	viewSwitcher: function( venue,logoOffset,currentView,stick,	nextView,nextViewTime,	backupNextview,	backupNextviewTime,	timeOut,posterOffset){
									
					setTimeout(function() {	
							if(stick=="stick" && timeOut>0){
								console.log('view switcher cancelled')	
								console.log('stick:' +stick )
								console.log('timeOut:' +stick )
								return;	
							}
							else if(stick=="move" && nextViewTime>0){			
								nextView=nextView										
							} else if(stick=="move"&& backupNextviewTime>0){			
								nextView=backupNextview	
							}
							
							currentView.goToNextView(venue,logoOffset,posterOffset,nextView,backupNextview)
					}, timeOut * 1000);
		},
	
		LoadView:  function(viewName,ViewToLoad,nextView,venue,stick,logoOffset,posterOffset,machine,date,instagram){

					var self=this;
					var stick = stick || "move"
					var logoOffset=logoOffset||0
					var posterOffset=posterOffset||0;
					
					machineName=machine||'Mcafe'
					Allsettings=(JSON.parse(Settings))
					settings="null"
					settingsGroup=('Allsettings',Allsettings[machineName])
					
					var d = new Date();
					var n = d.getHours();	


					if(settingsGroup['before_9']){	
						if(		n<9){	
							////console.log('SPECIAL TIME MODE')
							settings=('Allsettings',settingsGroup['before_9'])
						}
					}

					if(settingsGroup['before_10']){	
						if(		n<10){	
							//console.log('SPECIAL TIME MODE')
							settings=('Allsettings',settingsGroup['before_10'])
						}
					}
					
					if(settingsGroup['before_11']){	
						if(		n<11){	
							//console.log('SPECIAL TIME MODE')
							settings=('Allsettings',settingsGroup['before_11'])
						}
					}
					
					if(settingsGroup['after_5']){	
						if(		n>=17){	
							console.log('SPECIAL TIME MODE')
							settings=('Allsettings',settingsGroup['after_5'])
						}
					}
					
					if(settingsGroup['after_6']){	
						if(		n<6){	
							//console.log('SPECIAL TIME MODE')
							settings=('Allsettings',settingsGroup['after_6'])
						}
					}
					
					if(settingsGroup['LUNCH_12-2']){	
						if(		n==1 ||n==1){	
							//console.log('SPECIAL TIME MODE')
							settings=('Allsettings',settingsGroup['LUNCH_12-2'])
						}
					}
					
					if(settings=="null" ||!settings)	{
					console.log('settings not found - using default')
						settings=('Allsettings',settingsGroup['normal'])
					}
					console.log('settings',settings)
				
					
					//issue when settings is not defined
					if(!settings){						
						Backbone.history.navigate('fader'  + '/venue'+	EventsParameters.venue+"/logo"+ EventsParameters.logoOffset +"/poster"+EventsParameters.posterOffset+"/machine"+machineName, {trigger: true});
					}
					switch(viewName) {
									case 'fader':
									currentModeTime=settings.posterMode_time
									break;
									case 'events':
									currentModeTime=settings.eventsListMode_time
									break;
									case 'sponsors':
									currentModeTime=settings.sponsorMode_time	
									break;
									case 'instagram':
									currentModeTime=settings.instagram_time||10													
									break;
									default:
									currentModeTime=60
														  
					}	
					
					var venue = venue || "ALL"
					venue=settings.location
					instagram=settings.instagramTag||"bristolmuseum"
					instaID=settings.instaID||"bristolmuseum"
					var no_internet=false
					var EventsParameters = {logoOffset:logoOffset,
											posterOffset:posterOffset,
											timeout: 300000,
											date:date,																	
											venue:venue,
											machine:machine,
											machineId:settings.id,
											type: settings.eventTypes ,
											imageFilter:'digital signage',
											imageGradientFilter:'gradient',
											settings:settings,
											machine:machineName,
											nextView:nextView,instagram:instagram,instaID:instaID																
					}			
					if(EventsParameters.logoOffset==null){EventsParameters.logoOffset=0}
					if(currentModeTime==0){
						window.history.pushState('object or string', 'Title', '#' + EventsParameters.nextView + '/venue'+	EventsParameters.venue+"/logo"+ EventsParameters.logoOffset +"/poster"+EventsParameters.posterOffset+"/machine"+machineName);
						Backbone.history.navigate(EventsParameters.nextView  + '/venue'+	EventsParameters.venue+"/logo"+ EventsParameters.logoOffset +"/poster"+EventsParameters.posterOffset+"/machine"+machineName, {trigger: true});
					}
					else
					{
						if(this.doesConnectionExist()==false){	
							no_internet=true					
							ViewToLoad=PosterFaderView
							setInterval(function() {
								window.location.reload();
							}, 10* 60  * 1000); 
					}	
					self.private_event_mode(viewName,nextView,ViewToLoad,no_internet,EventsParameters,venue,stick,logoOffset,posterOffset,machine,settings, settings.eventTypes)
					}
					
				},	
		
	});

  return {
  
    initialize: initialize
	
  };
});