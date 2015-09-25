// WeddingNames.js
// Tool for a wedding RSVP application. Turns guest data into strings of the sort
// that would be printed on an invitation.

// Function takes an array of person objects and a formatting object.

function getInvitationName (config, ga){
	//ga is an array of guests. config is formatting object.
	
	function individualGuestString(guest, is_Primary){
		var guestArr = [guest.first, guest.last];
		if (config.pfxPrimary && is_Primary || config.pfxWith && !is_Primary){
			guestArr.unshift(guest.pfx);
		}
		if (!config.snmWith && !is_Primary){
			guestArr.pop();
		}
		return guestArr;
	}

	function formatPrimaryPair(f, s){
		// Weddings are traditional || code gets sexist.
		// Deciding whose name will be first by guessing sex from prefixes.
		var first, second, fpfx = f[0].toLowerCase(), spfx = s[0].toLowerCase();
		if(fpfx.indexOf('ms') > -1 || fpfx.indexOf('mrs') > -1 || fpfx.indexOf('mdm') > -1){
			second = f; first = s;
		} else {
			first = f; second = s;
		}
		if (first[2] !== second[2]){ // They don't have the same last name.
			return first.concat([config.andChar,]).concat(second);
		} else if (first[0] == second [0] && first[0] == "Dr."){ // The Drs. exception.
			return ['Drs.', first[1], config.andChar].concat(second.slice(1));
		} else {
			return [first[0],].concat([config.andChar, second[0]], first[1], config.andChar).concat(second.slice(1));
		}
	}

	function affixGuests(arr, out) {
		var guestCount = _.reduce(arr, function(memo, val){return memo + val.plusOne;}, 0);
		if (guestCount > 0){
			var adding = "and guest";
			if (guestCount > 1){ adding += 's'; }
			out.push(adding);
		}
		return out;
	}

	if (ga.length < 1){return '';} // edge case annoyance.
	
	//Initialize output array and fill first guest name.
	var withStart = 2; //Usually formatting for couples, so child guests start at index 2 in ga.
	var output = individualGuestString(ga[0], true);
	output = affixGuests([ga[0],], output);
	if (ga.length > 1){
		//Format the other half of the couple.
		if(ga[1].orderer < 3){
			var second = individualGuestString(ga[1], true);
			output = formatPrimaryPair(output, second);
		}
		else { withStart = 1;}
		// Move on to children.
		if(ga.length > withStart){
			output.push(config.withChar);
			// Do the kids / accompanying guests all have the same last name?
			var samelast = _.every(ga.slice(withStart), function(val){return val.last == ga[withStart].last})
			for (var j = 0; j < ga.slice(withStart).length-1; j++) {
				var wguest = individualGuestString(ga.slice(withStart)[j]);
				if (samelast && config.snmWith) {
					wguest.pop(); // only the last kid shows last name.
				}
				wguest[wguest.length-1] = wguest[wguest.length-1] + ',';
				output = output.concat(wguest);
			}
			if (ga.length > withStart+1){ // "if that last loop added anything"
				output[output.length-1] = output[output.length-1].slice(0, output[output.length-1].length-1); //trim the oxford coma.
				output.push(config.andChar);
			}
			// add the last one
			output = output.concat(individualGuestString(ga[ga.length-1]));
		}
		// add plus Ones.
		output = affixGuests(ga.slice(1), output);
	}
	return output.join(' ');
}
