// by Mark Pajak (Bristol Museums Galleries and Archives)
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/instagra/instatemplate.html',
    'collections/instagram/insagramCollection'
], function($, _, Backbone, InstagramTemplate,
    insagramCollection) {

    var PosterView = Backbone.View.extend({

        el: $("#eventsList"),
        templateX: _.template(InstagramTemplate),

        initializeView: function(options) {
            var self = this
            this.logoOffset = (options.logoOffset)
            this.posterOffset = (options.posterOffset)
            this.stick = (options.stick)
            this.venue = (options.venue)
            this.orientationSpecific = settings.posterOrientationSpecific
            this.settings = (options.settings)
            this.instagram = options.instagram
            this.counter = 0
                //search by tags
            url = "https://api.instagram.com/v1/tags/" + options.instagram + "/media/recent?client_id=" + options.instaID,
                //search by user
                //url= "https://api.instagram.com/v1/users/1288528798/media/recent/?client_id="+options.instaID
                
                
                   //search by user likes
                //url= "https://api.instagram.com/v1/users/1288528798/media/liked/?client_id="+options.instaID
                
                
             
                
                this.instagramData = []
            this.getData(url)


        },

        goNext: function(options) {
            var self = this
            this.goToNextView(self.venue, self.logoOffset, self.posterOffset, 'fader', self.backupNextView, self.eventOffset)

        },

        getData: function(url) {
            var self = this;
            self.collection = new insagramCollection({
                parse: true
            })
            self.collection.url = url
            self.collection.fetch({
                success: function(collection) {
                    //console.log('instagram from remote file' + self.collection.url)
					
                    self.loadinstagamsw(collection)
                },
                error: function(error) {
				
                     this.goToNextView(self.venue, self.logoOffset, self.posterOffset, self.nextView, self.backupNextView, self.eventOffset)
					
                },
                dataType: "jsonp"
            });

        },
        loadinstagamsw: function(collection) {
		
            var self = this
            pagination = collection.models[0].get('pagination')
            var instagramData = (collection.models[0].get('data'))
           
		   _.each(instagramData, function(insta) {
                var publish = false

                likes = (insta.likes)
                tags = (insta.tags)
                
				/*
                _.each(tags, function(tag) {
                    if (tag== self.instagram) {
                        
                        //publish = true
                    }
                })
                */
                
                

                _.each(likes['data'], function(likex) {
                    if (likex.username == "bristolmuseums") {
                        console.log("bristolmuseums likes " + insta.user.username)
                        publish = true
						return;
                    }
					return;
                })

                if (insta.user.username == "bristolmuseums") {
                    publish = true
					 return;
                }
                if (publish == false || self.instagramData.length > 20) {
                    return;
                }

                self.instagramData.push(insta)
            })
			
			if(!pagination){
			self.goNext()
			}
            if (pagination.next_url && self.counter < 40 && self.instagramData.length <=20) {

                self.getData(pagination.next_url)
                self.counter++

            } else {
                this.collection.reset(this.instagramData)
                this.collection.shuffle(collection.models)

                self.$el.html(self.templateX({
                    instagrams: collection.models,
                    tag: this.instagram
                }));
            }
        },
        goToNextView: function(venue, logoOffset, posterOffset, nextView, backupNextView) {
            var self = this
            //window.history.pushState('object or string', 'Title', '#' + nextView + '/venue' + venue + "/logo" + logoOffset + "/poster" + self.posterOffset + "/machine" + machineName);
            //window.location.reload();
			
				Backbone.history.navigate(nextView + '/venue' + venue + "/logo" + logoOffset + "/poster" + self.posterOffset + "/machine" + machineName, {trigger: true});
			
			
        },

    });

    return PosterView;
});