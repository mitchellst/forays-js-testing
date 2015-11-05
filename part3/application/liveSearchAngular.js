//polyfill.
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}
//angular app.
(function(){
	var app = angular.module("rsvpLiveSearch", []);

	app.controller("mySearchController", ['$http', '$scope', function($http, $scope){

		$scope.searchTerm = '';
		$scope.oldTerm = '';
		$scope.csrf = "";
		$scope.guests = [];
		$scope.invitations = {};
		$scope.filtered = [];
		$scope.showHallo = false;
		$scope.reservationChosen = false;
		$scope.reservation = {
			inviteId: 0,
			inviteName: '',
			inviteGuestsAllowed: 0,
			guestsAttending: false,
			people: [],
			guests: [],
			wishes: '',
		};
		$scope.submitted = false;

		$scope.liveSearch = function(term, oldTerm){
			if (term.length < 3) {//input too short.
				$scope.filtered = []; return; }
			function scoreInvitation(invitation, searchterms){
				var score = 0;
				for (var i = 0; i < invitation.guest.length; i++) {
					for (var j = 0; j < searchterms.length; j++) {
						if (invitation.guest[i].first.startsWith(searchterms[j])){
							searchterms.splice(j,1);
							score++;
						}
					}
				}
				return score;
			}
			var searchterms = term.trim().split(' '),
			topscore = _.max($scope.invitations, scoreInvitation(invitation, searchterms));
			$scope.filtered = _.filter($scope.invitations, function(invitation){
				return scoreInvitation(invitation, searchterms) === topscore;
			});
		};


		$scope.init = function(){
			//Set up the $scope.invitations object, which allows us to sort by
			//group rather than by individual.
			var keys = _.uniq(_.map($scope.guests, function(person){return person.invitation;}));
			_.each(keys, function(key){
				$scope.invitations[key] = {name: "", guests: _.where($scope.guests, {invitation: key})};
			});
		};
		$scope.init();
	}]);

})();
window.ctLiveAppReady = true;
