describe("The invitation string suite", function(){
	// VARIABLES you want to use in it blocks should be out here loose in the
	// describe function. Only LOGICS should go inside a beforeEach wrapper.
	var formatterConfig = {
				pfxPrimary: true,
				pfxWith: false,
				snmWith: true,
				andChar: '&',
				withChar: 'with'
			},
	guest1 = {
		pfx: "Mr.",
		first: "Mitchell",
		last: "Stoutin",
		orderer: 1,
		plusOne: 0
	},
	guest2 = {
		pfx: "Mrs.",
		first: "Jaqueline",
		last: "Stoutin",
		orderer: 2,
		plusOne: 0
	},
	guest3 = {
		pfx: "Dr.",
		first: "Lyndal",
		last: "Stoutin",
		orderer: 1,
		plusOne: 0
	},
	guest4 = {
		pfx: "Dr.",
		first: "Sherry",
		last: "Stoutin",
		orderer: 2,
		plusOne: 0
	},
	guest5 = {
		pfx: "Dr.",
		first: "Marv",
		last: "Kym",
		orderer: 1,
		plusOne: 0
	},
	guest6 = {
		pfx: "Mrs.",
		first: "Cyndy",
		last: "Kym",
		orderer: 2,
		plusOne: 0
	},
	guest7 = {
		pfx: "Ms.",
		first: "Rachel",
		last: "Kym",
		orderer: 3,
		plusOne: 0
	},
	guest8 = {
		pfx: "Mr.",
		first: "Brian",
		last: "Kym",
		orderer: 4,
		plusOne: 0
	},
	guest9 = {
		pfx: "Mrs.",
		first: "Kyrsten",
		last: "Spurrier",
		orderer: 4,
		plusOne: 0
	},
	guest10 = {
		pfx: "Ms.",
		first: "Mariah",
		last: "Kym",
		orderer: 4,
		plusOne: 0
	},
	guest11 = {
		pfx: "Mr.",
		first: "David",
		last: "Collier",
		orderer: 4,
		plusOne: 1
	},
	guest12 = {
		pfx: "Mrs.",
		first: "Kyrsten",
		last: "Spurrier",
		orderer: 4,
		plusOne: 2
	};

	it("returns an empty string if it is not passed any guests.", function() {
		expect(getInvitationName(formatterConfig, []))
		.toBe('');
	});

	it("properly formats a single guest", function() {
		expect(getInvitationName(formatterConfig, [guest1,]))
		.toBe('Mr. Mitchell Stoutin');
	});

	it("properly formats a pair of primary guests", function(){
		expect(getInvitationName(formatterConfig, [guest1, guest2]))
		.toBe('Mr. & Mrs. Mitchell & Jaqueline Stoutin');
	});

	it("properly formats doctors with the same last name", function(){
		expect(getInvitationName(formatterConfig, [guest3, guest4]))
		.toBe('Drs. Lyndal & Sherry Stoutin');
	});

	it("will do the awkward traditional thing where it puts the man's name first.", function(){
		expect(getInvitationName(formatterConfig, [guest2, guest1]))
		.toBe('Mr. & Mrs. Mitchell & Jaqueline Stoutin');
	});

	it("properly formats a single parent and child", function(){
		expect(getInvitationName(formatterConfig, [guest5, guest7]))
		.toBe('Dr. Marv Kym with Rachel Kym');
	});

	it("properly formats two parents and child", function(){
		expect(getInvitationName(formatterConfig, [guest5, guest6, guest7]))
		.toBe('Dr. & Mrs. Marv & Cyndy Kym with Rachel Kym');
	});

	it("properly formats two parents and two children of same last name", function(){
		expect(getInvitationName(formatterConfig, [guest5, guest6, guest7, guest8]))
		.toBe('Dr. & Mrs. Marv & Cyndy Kym with Rachel & Brian Kym');
	});

	it("properly formats two parents and two children of different last names", function(){
		expect(getInvitationName(formatterConfig, [guest5, guest6, guest7, guest9]))
		.toBe('Dr. & Mrs. Marv & Cyndy Kym with Rachel Kym & Kyrsten Spurrier');
	});

	it("properly formats two parents and three children of same last names", function(){
		expect(getInvitationName(formatterConfig, [guest5, guest6, guest7, guest8, guest10]))
		.toBe('Dr. & Mrs. Marv & Cyndy Kym with Rachel, Brian & Mariah Kym');
	});

	it("properly formats two parents and four children of same last names", function(){
		expect(getInvitationName(formatterConfig, [guest5, guest6, guest7, guest8, guest8, guest10]))
		.toBe('Dr. & Mrs. Marv & Cyndy Kym with Rachel, Brian, Brian & Mariah Kym');
	});

it("properly formats two parents and four children of same last names", function(){
		expect(getInvitationName(formatterConfig, [guest5, guest6, guest7, guest8, guest8, guest10]))
		.toBe('Dr. & Mrs. Marv & Cyndy Kym with Rachel, Brian, Brian & Mariah Kym');
	});

	it("properly formats one parent with a list of children", function(){
		expect(getInvitationName(formatterConfig, [guest6, guest7, guest8, guest10]))
		.toBe('Mrs. Cyndy Kym with Rachel, Brian & Mariah Kym');
	});

	it("adds a guest with a lone primary guest with a plus one", function() {
		expect(getInvitationName(formatterConfig, [guest11,]))
		.toBe('Mr. David Collier and guest');
	});

	it("adds plural guests with a lone primary guest with two plus ones", function() {
		expect(getInvitationName(formatterConfig, [guest12,]))
		.toBe('Mrs. Kyrsten Spurrier and guests');
	});

	it("adds plural plus ones to 'with' guest", function() {
		expect(getInvitationName(formatterConfig, [guest5, guest6, guest12,]))
		.toBe('Dr. & Mrs. Marv & Cyndy Kym with Kyrsten Spurrier and guests');
	});

	it("adds single plus one to 'with' guests", function() {
		expect(getInvitationName(formatterConfig, [guest5, guest6, guest11,]))
		.toBe('Dr. & Mrs. Marv & Cyndy Kym with David Collier and guest');
	});

	it("adds plural plus one to 'with' guests who each have on plusOne", function() {
		expect(getInvitationName(formatterConfig, [guest5, guest6, guest11, guest11]))
		.toBe('Dr. & Mrs. Marv & Cyndy Kym with David & David Collier and guests');
	});

});