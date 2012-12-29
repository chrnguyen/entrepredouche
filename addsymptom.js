//write symptoms.allow and symptoms.deny here

addingSymptom ={
  clear: function(){
    return Session.set("addingsymptom", false);
  },
  set_true: function(){
    return Session.set("addingsymptom", true);
  }
};

Validation = {
  clear: function(){
    return Session.set("validationerror", undefined);
  },
  set_error: function (message){
    return Session.set("validationerror", message);
  },
  valid_name: function(name){
    this.clear();
    if (name.length == 0){
      this.set_error("please enter something");
      return false;
    } else if (this.symptom_exists(name)){
      this.set_error("symptom already exists! try entering something new");
      return false;
    } else{
      return true;
    }
  },
 symptom_exists: function(name){
   return Symptoms.findOne({name:name});
 }
};

if (Meteor.isClient) {
  Template.add_symptom.validationerror = function(){
    return Session.get("validationerror");
  };

  Template.add_symptom.addingsymptom = function(){
    return Session.get("addingsymptom");
  };

  Template.add_symptom.events ={
    'click #add-symptom-text': function(){
      addingSymptom.set_true();
      Meteor.flush();
      document.getElementById('new-symptom-name').focus();
    },
    'click input.close-button': function(){
      addingSymptom.clear();
    },
    'click input.add-button, keydown': function(e){
      if(e.keyIdentifier=='Enter'||e.keyIdentifier==undefined){
        var entered_symptom = document.getElementById('new-symptom-name').value;
        if (Validation.valid_name(entered_symptom)){
          Meteor.call('addSymptom',{name:entered_symptom,numvote_true:0, numvote_funny:0});
          document.getElementById('new-symptom-name').value='';
        }
      }
      else{
      }
    }
  };
}

if (Meteor.isServer) {
	Meteor.methods({
		addSymptom: function (doc) {
			//timestamp
			now = new Date(Date.now()); // ms since epoch
			doc.createdAt = now;
			doc.month= now.getUTCMonth();
			doc.year = now.getUTCFullYear();
		  return Symptoms.insert(doc);
		}
	});
	
  Meteor.startup(function () {
  // code to run on server at startup
  });

}