// Algorithm to sort guests into tables

// input: an array of guest objects, max number of guests per table
// Can deal with +1s and constraints
// Output: array of arrays where each subarray represents a diningtable populated by elements that are guest objects

/*
EDGE cases where our algorithm could be improved:
- if table has odd number of seats and there are more couples than we can fit, it's going to exceed number of seats per table
- if it doesn't find a solution immediately, it's going to drop constraints and not test a different sorting
- it should surface errors to the user (now it's logging to the console)
- it's always going to sort in the same way (there is no shuffling of seats)
*/

exports.makeDiningTables = function(guests, numPerTable) {

  // Helper method to find the index of a guests, searching by name
  var findFriendIndex = function(guests, friendName) {
    for (var i = 0; i < guests.length; i++) {
      if (guests[i].guestName === friendName) {
        return i;
      }
    }
  };

  // this functions testing to see if there are any constraints between guests friend1 (and optional friend2) 
  // and the guests already sitting at the diningtable
  // input: a dining table and a guest object (and an optional second guest object expected to be a friend of the first guest object)
  // output: true or false
  var canAddFriend = function(diningTable, friend1, friend2) {
    var result = true;

    // Optional TODO : optimize this function
    // loop within the table
    for(var seat = 0; seat<diningTable.length; seat++) {
      if(diningTable[seat].constraints.indexOf(friend1.guestName) !== -1 || friend1.constraints.indexOf(diningTable[seat].guestName) !== -1) {
        return false;
      }
      if(friend2 !== undefined) {
       if(diningTable[seat].constraints.indexOf(friend2.guestName) !== -1 || friend2.constraints.indexOf(diningTable[seat].guestName) !== -1) {
         return false;
       } 
      }
    }
    return result;
  };


  // this function takes an array of couples (as tuples) and a matrix of dining Tables (array of array). It modifies the diningTables array by pushing
  // guests (as guest objects) into the tables. 
  var addCouplesToTables = function(couples, diningTables, respectConstraints) {
    if(respectConstraints === undefined) respectConstraints = true; 

    var currTable;
    var currCouple;
    var addedCouple;
    // sort couples into tables
    while(couples.length>0) {
      addedCouple = false;
      // console.log('while loop', couples);
      // take a couple out of the list of couples
      currCouple = couples.shift();
      // loop through tables
      for (var tableIndex = 0; tableIndex < diningTables.length; tableIndex++) {
        currTable = diningTables[tableIndex];
        // console.log('dining Tables',diningTables);

        // TODO: edge case where it's going to exceed guest by one (odd number of seats per tables)
        // if we can add this guest, add it and also add the friend
        if(currTable.length < numPerTable && canAddFriend(currTable, currCouple[0], currCouple[1])) {
          currTable.push(currCouple[0]);
          currTable.push(currCouple[1]); 
          addedCouple = true;
          // console.log('couple added', currCouple);
          break;
        }
      }
      // If we get here and we haven't added any guests, we need to break out of the while loop
      if(addedCouple === false) {
        console.log('We cant add this couple -- remove constraints or change table size');
        // TODO: surface error to the user
        couples.unshift(currCouple);
        // try again adding couples without respecting constraints
        addCouplesToTables(couples, diningTables, false);
        break;
      }
    }
  };

  // this function takes an array of indiviudal guests (guest objects) and a matrix of dining Tables (array of array).
  // It modifies the diningTables array by pushing individual guests into the tables
  var addIndividualsToTables = function(guests, diningTables, respectConstraints) {
    if(respectConstraints === undefined) respectConstraints = true; 
    var currTable;
    var currGuest;
    var addedGuest;
    // sort guests into tables
    while(guests.length>0) {
      addedGuest = false;
      // take a guest out of the list of guests
      currGuest = guests.shift();
      // loop through tables
      for (var tableIndex = 0; tableIndex < diningTables.length; tableIndex++) {
        currTable = diningTables[tableIndex];

        // if we can add this guest, add it
        if(currTable.length < numPerTable) {
          if(canAddFriend(currTable, currGuest) || !respectConstraints) {
            currTable.push(currGuest);
            addedGuest = true;
            break;
          }
        }
      }
      // If we get here and we haven't added any guests, we need to break out of the while loop
      if(addedGuest === false) {

        console.log('We cant add this guest -- remove more constraints');

        // add back the guest to the array of guests
        guests.unshift(currGuest);
        // TODO: surface error to the user

        // try adding guests again without respecting constraints
        addIndividualsToTables(guests, diningTables, false);
        break;
      }
    }
  };

  // define number of tables
  var numTables = Math.ceil(guests.length / numPerTable);

  // copy guestlist
  var guestList = guests.slice();

  // This array is to keep track of which guests we have added to the groups and which ones we haven't
  var groupedGuests = [];
  for(var j =0;j<guestList.length; j++){
    groupedGuests.push(false);
  }

  // splitting people into different groups depending on whether they have friends, constrainst, both or neither
  var couplesWithConstraints =[];
  var couplesWithoutConstraints =[];

  var singlesWithConstraints = [];
  var singlesWithoutConstraints = [];
  var currGuest;
  var currGuestFriendIndex;

  // this loop will sort guests into different groups depending on their preferences (who they want to sit with) and constraints (who they don-t want to sit with)
  for(var i=0;i<guestList.length;i++) {
    currGuest = guestList[i];

    if(groupedGuests[i] ===false && currGuest.friendName.length>0 && currGuest.constraints.length>0) {

      currGuestFriendIndex = findFriendIndex(guestList,currGuest.friendName);

      // add a tuple composed of a guest and their friend
      couplesWithConstraints.push([currGuest,guestList[currGuestFriendIndex]]);
      
      // update the grouped Guest tracker array
      groupedGuests[i] = true;
      groupedGuests[currGuestFriendIndex] = true;


    } else if (groupedGuests[i] ===false && currGuest.friendName.length>0 && currGuest.constraints.length===0) {

      currGuestFriendIndex = findFriendIndex(guestList,currGuest.friendName);

      // make sure the other friend has no constraints
      if(guestList[currGuestFriendIndex].constraints.length ===0) {
        // add a tuple composed of a guest and their friend
        couplesWithoutConstraints.push([currGuest,guestList[currGuestFriendIndex]]);
        
        // update the grouped Guest tracker array
        groupedGuests[i] = true;
        groupedGuests[currGuestFriendIndex] = true; 
      }
    } else if(groupedGuests[i] ===false && currGuest.friendName.length===0 && currGuest.constraints.length>0) {

      singlesWithConstraints.push(currGuest);
      groupedGuests[i] = true;

    } else if(groupedGuests[i] ===false && currGuest.friendName.length===0 && currGuest.constraints.length===0) {
      
      singlesWithoutConstraints.push(currGuest);
      groupedGuests[i] = true;

    } else if(groupedGuests[i] === true) {
      console.log('we have already added this guest');
    } else {
      console.log('Error: we have a guest who doesnt belong anywhere'); //we shouldn't get here
    }
  }

  // generate a matrix of tables that we'll need to fill
  var allTables = [];
  for (var k = 0; k < numTables; k++) {
    allTables.push([]);
  }

  // sort couples with constraints
  addCouplesToTables(couplesWithConstraints,allTables, true);

  // sort couples without constraints
  addCouplesToTables(couplesWithoutConstraints,allTables, false);

  // sort individuals with constraints
  addIndividualsToTables(singlesWithConstraints, allTables, true);

  // sort individuals without constraints
  addIndividualsToTables(singlesWithoutConstraints, allTables, false);

  return allTables;
};
