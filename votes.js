
if (Meteor.isClient) {
  Template.symptom.events = {
	'click .vote_funny': function(){
		Symptoms.update(this._id,{$inc:{numvote_funny:1}});
	},
    'click .vote_true': function(){
		Symptoms.update(this._id, {$inc:{numvote_true:1}});
    }
  };
}

if (Meteor.isServer) {
	
  Meteor.startup(function () {
  // code to run on server at startup

	//compute existing winners
		
		//compute latest month
		serverTime = new Date(Date.now());
		serverYear = serverTime.getUTCFullYear();
		serverMonth = serverTime.getUTCMonth();
		latestMonth = new Date(serverYear, serverMonth,1);
		console.log(latestMonth);
		console.log(Date.parse(latestMonth));
		
		//go through months
		sortedSymptoms = Symptoms.find({"createdAt":{$lt:Date.parse(latestMonth)}},{sort:{createdAt:-1, numvote:-1, numvote_funny:-1}});
		beginningMonth = new Date(serverYear,serverMonth-1,1);
		numBeginningMonth = Date.parse(beginningMonth);
		sortedSymptoms.forEach(function (s){
			if(s.createdAt < numBeginningMonth){
				//Winner.insert({symptomID: s._id, createdAt: });
				year = beginningMonth.getUTCFullYear();
				month = beginningMonth.getUTCMonth();
				beginningMonth = new Date(year, month-1, 1);
				numBeginningMonth = Date.parse(beginningMonth);
				console.log(beginningMonth);
			}
			console.log(s.createdAt);
			console.log(s.numvote);
		});
		
		//shirt = Symptoms.findOne({"createdAt" : {$gt:Date.parse(lastmonth), $lt:Date.parse(currentmonth)}},{sort:{numvote:-1}});
		
  });
}