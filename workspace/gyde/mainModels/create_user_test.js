const assert = require('assert');
const User = require('../main/user');

const bruin = new User({
	firstName: "Jack",
	lastName: "Li",
	userName: "dumptrump",
	password: "abc12345$",
	DOB: {
		day: 24,
		month: 2,
		year: 1998
	},
	address: {
        buildingNum: 119,
        streetName: "N. Menlo Park St",
        city: "Mountain House",
        region: "California",
        country: "USA",
        zipCode: 95391
	},
	email: "jackli2014@gmail.com",
	linkedin: "http://www.linkedin.com/jackli"
});

bruin.save();
assert(!bruin.isNew);
/*
   .then(() => {
   	assert(!bruin.isNew);
   });
  */
