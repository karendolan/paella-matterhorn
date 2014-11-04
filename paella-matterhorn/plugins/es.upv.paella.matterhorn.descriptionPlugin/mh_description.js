paella.plugins.MHDescriptionPlugin  = Class.create(paella.TabBarPlugin,{
	domElement:null,
	desc: { date:'-', contributor:'-', language:'-', views:'-', serie:'-', serieId:'', presenter:'-', description:'-', title:'-', subject:'-' },
	
	
	getSubclass:function() { return "showMHDescriptionTabBar"; },
	getName:function() { return "es.upv.paella.matterhorn.descriptionPlugin"; },
	getTabName:function() { return paella.dictionary.translate("Description"); },
	getIndex:function() { return 10; },
	getDefaultToolTip:function() { return paella.dictionary.translate("Description"); },	
	

	buildContent:function(domElement) {
		this.domElement = domElement;
		this.loadContent();
	},
			
	action:function(tab) {},
			
	loadContent:function() {
		var thisClass = this;

		if (paella.matterhorn.episode.dcTitle) { this.desc.title = paella.matterhorn.episode.dcTitle; }
		if (paella.matterhorn.episode.dcCreator) { this.desc.presenter = paella.matterhorn.episode.dcCreator; }
		if (paella.matterhorn.episode.dcContributor) { this.desc.contributor = paella.matterhorn.episode.dcContributor; }
		if (paella.matterhorn.episode.dcDescription) { this.desc.description = paella.matterhorn.episode.dcDescription; }
		if (paella.matterhorn.episode.dcLanguage) { this.desc.language = paella.matterhorn.episode.dcLanguage; }
		if (paella.matterhorn.episode.dcSubject) { this.desc.subject = paella.matterhorn.episode.dcSubject; }
		if (paella.matterhorn.serie) {
			// paella.matterhorn.serie['http://purl.org/dc/terms/'];
			if (paella.matterhorn.serie) {
				var serie = paella.matterhorn.serie['http://purl.org/dc/terms/'];
				if (serie) { 
					this.desc.serie = serie.title[0].value; 
					this.desc.serieId = serie.identifier[0].value; 
				}
			}
		}
		this.desc.date = "n.a.";
		var dcCreated = paella.matterhorn.episode.dcCreated;
		if (dcCreated) {			
			var sd = new Date();
			sd.setFullYear(parseInt(dcCreated.substring(0, 4), 10));
			sd.setMonth(parseInt(dcCreated.substring(5, 7), 10) - 1);
			sd.setDate(parseInt(dcCreated.substring(8, 10), 10));
			sd.setHours(parseInt(dcCreated.substring(11, 13), 10));
			sd.setMinutes(parseInt(dcCreated.substring(14, 16), 10));
			sd.setSeconds(parseInt(dcCreated.substring(17, 19), 10));
			this.desc.date = sd.toLocaleString();
		}

		// TODO!
		// #DCE orig, uncomment when stats endpoint is back in DCE MH repo
		// paella.ajax.get({url:'/usertracking/stats.json', params:{id:paella.matterhorn.episode.id}},
		//	function(data, contentType, returnCode) {
		//		thisClass.desc.views = data.stats.views;
		//		thisClass.insertDescription();
		//	},
		//	function(data, contentType, returnCode) {
		//	}
		//);
		// #DCE delete following when stats endpoint is back
		thisClass.desc.views = "";
		thisClass.insertDescription();
		// #DCE end
	},

	insertDescription:function() {
		var divDate = document.createElement('div'); divDate.className = 'showMHDescriptionTabBarElement';
		var divContributor = document.createElement('div'); divContributor.className = 'showMHDescriptionTabBarElement';
		var divLanguage = document.createElement('div'); divLanguage.className = 'showMHDescriptionTabBarElement';
		var divViews = document.createElement('div'); divViews.className = 'showMHDescriptionTabBarElement';
		var divTitle = document.createElement('div'); divTitle.className = 'showMHDescriptionTabBarElement';
		var divSubject = document.createElement('div'); divSubject.className = 'showMHDescriptionTabBarElement';
		var divSeries = document.createElement('div'); divSeries.className = 'showMHDescriptionTabBarElement';
		var divPresenter = document.createElement('div'); divPresenter.className = 'showMHDescriptionTabBarElement';
		var divDescription = document.createElement('div'); divDescription.className = 'showMHDescriptionTabBarElement';

		divDate.innerHTML = paella.dictionary.translate("Date:")+'<span class="showMHDescriptionTabBarValue">'+this.desc.date+'</span>';
		divContributor.innerHTML = paella.dictionary.translate("Contributor:")+'<span class="showMHDescriptionTabBarValue">'+this.desc.contributor+'</span>';
		divLanguage.innerHTML = paella.dictionary.translate("Language:")+'<span class="showMHDescriptionTabBarValue">'+this.desc.language+'</span>';
		divViews.innerHTML = paella.dictionary.translate("Views:")+'<span class="showMHDescriptionTabBarValue">'+this.desc.views+'</span>';			
		divTitle.innerHTML = paella.dictionary.translate("Title:")+'<span class="showMHDescriptionTabBarValue">'+this.desc.title+'</span>';
		divSubject.innerHTML = paella.dictionary.translate("Subject:")+'<span class="showMHDescriptionTabBarValue">'+this.desc.subject+'</span>';
		// #DCE MATT-374, link to DCE MH publication listing, no link for presenter offerings (student cannot cross access)
		divPresenter.innerHTML = paella.dictionary.translate("Presenter:")+'<span class="showMHDescriptionTabBarValue">'+this.desc.presenter+'</span>';
		divSeries.innerHTML = paella.dictionary.translate("Series:")+'<span class="showMHDescriptionTabBarValue"><a tabindex="4002" href="' + paella.player.config.restServer.url + 'engage/ui/publicationListing.shtml?seriesId='+this.desc.serieId+'">'+this.desc.serie+'</a></span>';
		//divPresenter.innerHTML = paella.dictionary.translate("Presenter:")+'<span class="showMHDescriptionTabBarValue"><a tabindex="4001" href="index.html?q='+this.desc.presenter+'">'+this.desc.presenter+'</a></span>';
		//divSeries.innerHTML = paella.dictionary.translate("Series:")+'<span class="showMHDescriptionTabBarValue"><a tabindex="4002" href="index.html?series='+this.desc.serieId+'">'+this.desc.serie+'</a></span>';
		divDescription.innerHTML = paella.dictionary.translate("Description:")+'<span class="showMHDescriptionTabBarValue">'+this.desc.description+'</span>';

		//---------------------------//			
		var divLeft = document.createElement('div'); 			
		divLeft.className = 'showMHDescriptionTabBarLeft';
		
		divLeft.appendChild(divTitle);
		divLeft.appendChild(divPresenter);
		divLeft.appendChild(divSeries);
		divLeft.appendChild(divDate);		
		divLeft.appendChild(divViews);
		
		//---------------------------//
		var divRight = document.createElement('div');
		divRight.className = 'showMHDescriptionTabBarRight';

		divRight.appendChild(divContributor);
		divRight.appendChild(divSubject);
		divRight.appendChild(divLanguage);
		divRight.appendChild(divDescription);

		this.domElement.appendChild(divLeft);
		// #DCE comment out contributor (producer), language (epsidode lang), subject (episode), description (keywords?)
		// this.domElement.appendChild(divRight);

	}
	
});



paella.plugins.mhDescriptionPlugin = new paella.plugins.MHDescriptionPlugin();

