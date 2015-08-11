// input: an array of guest objects, max number of guests per table
// only dealing with +1's for now

exports.makeDiningTables = function(guests, numPerTable) {

  // Helper method to find the index of a guests, searching by name
  var findFriendIndex = function(guests, friendName) {
    for (var i = 0; i < guests.length; i++) {
      if (guests[i].guestName === friendName) {
        return i;
      }
    }
  };

  var canAddFriend = function(diningTable, friend1, friend2) {
    var result = true;
    // friendName2 = friendName2 || friendName;

    // Optional TODO : optimize this function
    // loop within the table
    for(var seat = 0; seat<diningTable.length; seat++) {
      if(diningTable[seat].constraints.indexOf(friend1.guestName) !== -1 || friend1.constraints.indexOf(diningTable[seat].guestName) !== -1) {
        return false;
      }
      if(friend2) {
       if(diningTable[seat].constraints.indexOf(friend2.guestName) !== -1 || friend2.constraints.indexOf(diningTable[seat].guestName) !== -1) {
         return false;
       } 
      }
    }
    return result;
  };


  // this function takes an array of couples (as tuples) and a matrix of dining Tables (array of array). It modifies the diningTables array by pushing
  // guests (as guest objects) into the tables
  var addCouplesToTables = function(couples, diningTables) {

    var currTable;
    var currCouple;
    // sort couples into tables
    while(couples.length>0) {
      // take a couple out of the list of couples
      currCouple = couples.shift();
      // loop through tables
      for (var tableIndex = 0; tableIndex < diningTables.length; tableIndex++) {
        currTable = diningTables[tableIndex];

        // TODO: edge case where it's going to exceed guest by one
        // if we can add this guest, add it and also add the friend
        if(currTable.length < numPerTable && canAddFriend(currTable, currCouple[0].guestName, currCouple[1].guestName)) {
          currTable.push(currCouple[0]);
          currTable.push(currCouple[1]); 
          break;
        }
      }
      console.log('We cant add this couple -- remove more constraints');
      // TODO: surface error to the user
      break;
    }
  };

  // this function takes an array of indiviudal guests (guest objects) and a matrix of dining Tables (array of array). It modifies the diningTables array by pushing
  // individual guests into the tables
  var addIndividualsToTables = function(guests, diningTables) {

    var currTable;
    var currGuest;
    // sort guests into tables
    while(guests.length>0) {
      // take a guest out of the list of guests
      currGuest = guests.shift();
      // loop through tables
      for (var tableIndex = 0; tableIndex < diningTables.length; tableIndex++) {
        currTable = diningTables[tableIndex];

        // if we can add this guest, add it
        if(currTable.length < numPerTable && canAddFriend(currTable, currGuest.guestName)) {
          currTable.push(currGuest);
          break;
        }
      }
      console.log('We cant add this guest -- remove more constraints');
      // TODO: surface error to the user
      break;
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

      // add a tuple composed of a guest and their friend
      couplesWithoutConstraints.push([currGuest,guestList[currGuestFriendIndex]]);
      
      // update the grouped Guest tracker array
      groupedGuests[i] = true;
      groupedGuests[currGuestFriendIndex] = true;


    } else if(groupedGuests[i] ===false && currGuest.friendName.length===0 && currGuest.constraints.length>0) {

      singlesWithConstraints.push(currGuest);
      groupedGuests[i] = true;

    } else if(groupedGuests[i] ===false && currGuest.friendName.length===0 && currGuest.constraints.length===0) {
      
      singlesWithoutConstraints.push(currGuest);
      groupedGuests[i] = true;

    } else {
      console.log('Error: we have some guest that doesnt belong anywhere'); //we shouldn't get here
    }
  }

  // generate a matrix of tables that we'll need to fill
  var allTables = [];
  for (var k = 0; k < numTables; k++) {
    allTables.push([]);
  }

  // sort couples with constraints
  addCouplesToTables(couplesWithConstraints,allTables);

  // sort couples without constraints
  addCouplesToTables(couplesWithoutConstraints,allTables);

  // sort individuals with constraints
  addIndividualsToTables(singlesWithConstraints, allTables);

  // sort individuals without constraints
  addIndividualsToTables(singlesWithoutConstraints, allTables);

  return allTables;

  // // this variable is to keep a tracker of whether we still have guests with friends (aka couples) that need to be sorted
  // var anyFriends = true;

  // // go through the tables
  // // TODO: when there are too many couples, it will currently add them to the same table even if it exceeds the size
  // while (anyFriends && guestList.length > 0) {
  //   console.log('looping');
  //   for (var tableIndex = 0; tableIndex < allTables.length; tableIndex++) {
  //     // find guests with friends
  //     if (anyFriends) {
  //       for (var guestIndex = 0; guestIndex < guestList.length; guestIndex++) {
  //         console.log('index--->' + guestIndex);
  //         // check if guest has friend
  //         var friend = guestList[guestIndex].friendName;
  //         if (friend) {
  //           // adding guest and their friend
  //           var guestToAdd = guestList.splice(guestIndex, 1)[0];
  //           var friendIndexToAdd = findFriendIndex(guestList, friend);
  //           if (friendIndexToAdd >= 0) {
  //             var friendToAdd = guestList.splice(friendIndexToAdd, 1)[0];
  //           } else {
  //             throw new Error('Friend names do not match');
  //           }

  //           allTables[tableIndex].push(guestToAdd);
  //           allTables[tableIndex].push(friendToAdd);

  //           console.log('breaking when we add a friend');
  //           break;
  //         }
  //         if (guestIndex === guestList.length - 1) {
  //           anyFriends = false;
  //         }
  //       }
  //     } else {
  //       console.log('breaking');
  //       break;
  //     }
  //   }
  // }

  // // once there are no more guests that have friends, go through the guestList array and push as many guests as the table will hold
  // for (var tableIndex = 0; tableIndex < allTables.length; tableIndex++) {
  //   var currentTable = allTables[tableIndex];
  //   while (currentTable.length < numPerTable && guestList.length > 0) {
  //     var rand = Math.floor(Math.random() * guestList.length);
  //     currentTable.push(guestList.splice(rand, 1)[0]);
  //   }
  // }

  // console.log(allTables);
  // // return an array of tables, and each table is an array of guests
  // return allTables;
};

/* possible edge cases:
   people sitting alone
*/

// var guests = [
//   {guestName: 'test', friendName: 'testFriend'},
//   {guestName: 'testFriend', friendName: 'test'},
//   {guestName: 'test1', friendName: 'testFriend1'},
//   {guestName: 'testFriend1', friendName: 'test1'},
//   {guestName: 'noFriend2', friendName: ''},
//   {guestName: 'test2', friendName: 'testFriend2'},
//   {guestName: 'testFriend2', friendName: 'test2'},
//   {guestName: 'test3', friendName: 'testFriend3'},
//   {guestName: 'testFriend3', friendName: 'test3'},
//   {guestName: 'noFriend', friendName: ''},
//   {guestName: 'test4', friendName: 'testFriend4'},
//   {guestName: 'testFriend4', friendName: 'test4'}
// ];

// var guests2 = [{"_id":"55c92b11358e98cc3c57ed0a","guestName":"marco","friendName":"lambert","__v":0,"constraints":[]},{"_id":"55c92b11358e98cc3c57ed0b","guestName":"lambert","friendName":"marco","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed10","guestName":"jenny","friendName":"kiri","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed11","guestName":"kiri","friendName":"jenny","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed12","guestName":"jennie","friendName":"taco","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed13","guestName":"taco","friendName":"jennie","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed14","guestName":"help","friendName":"please","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed15","guestName":"please","friendName":"help","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed16","guestName":"much","friendName":"faster","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed17","guestName":"faster","friendName":"much","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed18","guestName":"daft","friendName":"punk","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed19","guestName":"punk","friendName":"daft","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed1a","guestName":"rivers","friendName":"cuomo","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed1b","guestName":"cuomo","friendName":"rivers","__v":0,"constraints":[]}];

// var guests = [
//   {guestName: 'test', friendName: 'testFriend', constraints:['test1']},
//   {guestName: 'testFriend', friendName: 'test', constraints:[]},
//   {guestName: 'test1', friendName: 'testFriend1', constraints:[]},
//   {guestName: 'testFriend1', friendName: 'test1', constraints:['test']},
//   {guestName: 'noFriend2', friendName: '', constraints:[]},
//   {guestName: 'test2', friendName: 'testFriend2', constraints:[]},
//   {guestName: 'testFriend2', friendName: 'test2', constraints:[]},
//   {guestName: 'test3', friendName: 'testFriend3', constraints:[]},
//   {guestName: 'testFriend3', friendName: 'test3', constraints:[]},
//   {guestName: 'noFriend', friendName: '', constraints:[]},
//   {guestName: 'test4', friendName: 'testFriend4',constraints:['test3']},
//   {guestName: 'testFriend4', friendName: 'test4', constraints:[]}
// ];



// var guests = [
//   {guestName: 'test', friendName: 'testFriend'},
//   {guestName: 'testFriend', friendName: 'test'},
//   {guestName: 'test1', friendName: ''},
//   {guestName: 'testFriend1', friendName: ''},
//   {guestName: 'noFriend2', friendName: ''},
//   {guestName: 'test2', friendName: 'testFriend2'},
//   {guestName: 'testFriend2', friendName: 'test2'},
//   {guestName: 'test3', friendName: ''},
//   {guestName: 'testFriend3', friendName: ''},
//   {guestName: 'noFriend', friendName: ''},
//   {guestName: 'test4', friendName: ''},
//   {guestName: 'testFriend4', friendName: ''}
// ];

// console.log(exports.makeDiningTables(guests2, 4));











