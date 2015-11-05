describe("The live search controller initializer", function(){
  //The magic words to get inside the Angular controller.
  beforeEach(module('rsvpLiveSearch'));
  var mySearchController, scope;
  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    mySearchController = $controller('mySearchController', {
      $scope: scope
    });

    scope.guests = guests; //load some test data
    scope.init();
  }));

  it("creates an invitations array on the scope.", function(){
    console.log('scope.invitations: ' + scope.invitations);
    expect(Object.keys(scope.invitations).length > 0).toBeTruthy();
  });

  it("has the same number of guests inside invitation objects that it was passed", function(){
    var numGuests = _.reduce(scope.invitations, function(memo, invite){return memo + invite.guests.length;}, 0);
    expect(numGuests).toEqual(guests.length);
  });

});

describe("The live search function", function(){

  //The magic words to get inside the Angular controller.
  beforeEach(module('rsvpLiveSearch'));
  var mySearchController, scope;
  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    mySearchController = $controller('mySearchController', {
      $scope: scope
    });

    scope.guests = guests; //load some test data
    scope.init();
  }));

  it("doesn't filter results if search term is too short.", function(){
    scope.liveSearch('me', 'm');
    expect(scope.filtered.length).toEqual(0);
  });


});
