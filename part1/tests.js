describe("The invitation string suite", function(){
	beforeEach(function(){
		var formatterConfig = {
				pfxPrimary: true,
				pfxWith: false,
				snmWith: true,
				andChar: '&',
				withChar: 'with'
			};
	});

	it("returns an empty string if it is not passed any guests.", function() {
		expect(getInvitationName(formatterConfig, [])).toBe('');
	});
});