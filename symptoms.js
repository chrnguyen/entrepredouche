Symptoms = new Meteor.Collection("symptoms");
Sort = new Meteor.Collection("sort");
Winners = new Meteor.Collection("winners");
Votes = new Meteor.Collection("votes");

//write symptoms.allow and symptoms.deny here

if (Meteor.isClient) {
	
	Meteor.startup(function () {
		Session.set("selectedSort", "sortirl");
	});
	
  Template.leaderboard.symptoms = function(){
		var sortname = Session.get("selectedSort");
		if (Sort.findOne({shortname:sortname}) == undefined){
			return Symptoms.find({}, {sort:[["numvoteTrue","desc"],["numvoteFunny", "desc"],["name"]]});
			//return Symptoms.find({},{sort:[["vote_true","desc"], ["vote_funny", "desc"],["name"]]});
		}
		else {
			return Symptoms.find({},{sort:Sort.findOne({shortname:sortname}).theorder});
			//return Symptoms.find({},{sort:Sort.findOne({shortname:sortname}).theorder});
		}
  };

	Template.sort_symptoms.sort = function(){
		return Sort.find({});
	}
	
	Template.sort_symptoms.selected = function(){
		return Session.equals("selectedSort", this.shortname) ? '' : 'potential';
	}
	
	Template.sort_symptoms.nameifselected = function(){
		return Session.equals("selectedSort", this.shortname) ? this.name : '';
	}
	
	Template.sort_symptoms.events ={
		'click': function(e){
			Session.set("selectedSort",e.target.parentElement.id);
		}
	}
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  // code to run on server at startup

  //create stuffs!
	
	//if there aren't sorts in the database
	if(Sort.find().count() == 0){
		Sort.insert({shortname:"sortirl", name:"happens irl", smiley:":)", theorder:[["numvoteTrue","desc"], ["numvoteFunny", "desc"],["name"]]});
		Sort.insert({shortname:"sortlol", name:"roflcopter", smiley:":D",theorder:[["numvoteFunny","desc"], ["numvoteTrue", "desc"],["name"]]});
		Sort.insert({shortname:"sortnew", name:"what's new", smiley:":O",theorder:[["createdAt","desc"], ["numvoteTrue", "desc"],["numvoteFunny", "desc"],["name"]]});
	}
    
	//if there aren't symptoms in the database
  if(Symptoms.find().count() == 0){
		var names= [
			"just needs a programmer",
			"constantly pivoting",
			"pitching ____ for _____",
			"wearing a blazer over a t-shirt and designer jeans",
			"chasing valuations",
			"reading tech blogs more than creating",
			"asking to join shitty startup",
			"dropping investor names",
			"competitive advantage is the cloud"
		];
			
		oct = new Date(2012,10,2);
		nov = new Date(2012,11,3);
		dec = new Date(2012,12,4);
		oct = Date.parse(oct);
		nov = Date.parse(nov);
		dec = Date.parse(dec);
		
		var numvotetrue=  [0,1,0,1,2,1,2,1,0];
		var numvotefunny= [1,2,1,1,2,0,2,1,1];
		
		
			
		for (var i = 0; i < names.length; i++){
			Symptoms.insert({
				name:names[i],
				numvoteTrue:numvotetrue[i], 
				numvoteFunny:numvotefunny[i],
				numvotes:[
				],
				createdAt:times[i],
				author:'christina'
			});
			for (var j = 0; j<numvotetrue[i]; j++){
				//Symptoms.update({name:names[i], $push: })
			}
		}
		
		for (var j = 0; j < numvotetrue.length; j++){
			Votes.insert({})
		}
	}

  });
}