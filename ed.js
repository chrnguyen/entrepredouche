

if (Meteor.isClient) {
	
	Template.preorder.shirtmonth= function(){
		var monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
		clienttime = new Date(Date.now());
		clientyear = clienttime.getUTCFullYear();
		lastmonth = clienttime.getUTCMonth()-1;
		var lastmonth = new Date(clientyear,lastmonth, 1);
		console.log(lastmonth);
		return(monthNames[clienttime.getMonth()-1]);
	};
	
	Template.preorder.recentshirt= function(){
		clienttime = new Date(Date.now());
		clientyear = clienttime.getUTCFullYear();
		clientmonth = clienttime.getUTCMonth()+1;
		lastmonth = new Date(clientyear,clientmonth-2,1);
		currentmonth = new Date(clientyear, clientmonth-1,1);
		console.log(lastmonth);
		console.log(currentmonth);
		shirt = Symptoms.findOne({"createdAt" : {$gt:Date.parse(lastmonth), $lt:Date.parse(currentmonth)}},{sort:{numvote:-1}});
		console.log(shirt);
		if(shirt == undefined){
			return "uh oh"
		}
		else return shirt.name;
	};
}

if (Meteor.isServer) {
	
	Meteor.methods({
		/*calcwinner: function(){
			//calculate winners
			
			var monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
			servertime = new Date(Date.now());
			serveryear = servertime.getUTCFullYear();
			servermonth = servertime.getUTCMonth()+1;
			lastmonth = new Date(serveryear,servermonth-1,1);
			currentmonth = new Date(serveryear, servermonth,1);
			console.log('test');
			console.log(Symptoms.findOne({"createdAt" : {$gt:Date.parse(lastmonth), $lt:Date.parse(currentmonth)}},{sort:{vote_true:-1,vote_funny:-1}}));
			return Symptoms.findOne({"createdAt" : {$gt:Date.parse(lastmonth), $lt:Date.parse(currentmonth)}},{sort:{vote_true:-1,vote_funny:-1}});
			
		},*/
		lastmonth: function(){
			
			var servertime = new Date(Date.now());
			return(monthNames[servertime.getMonth()-1]);
		}
	});
	
}