// input: an array of guest objects, max number of guests per table
// only dealing with +1's for now

exports.makeDiningTables = function(guests, numPerTable) {

  var findFriendIndex = function(guests, friendName) {
    for (var i = 0; i < guests.length; i++) {
      if (guests[i].guestName === friendName) {
        return i;
      }
    }
  };

  // define number of tables
  var numTables = Math.ceil(guests.length / numPerTable);

  // copy guestlist
  var guestList = guests.slice();

  // generate matrix of tables
  var allTables = [];
  for (var i = 0; i < numTables; i++) {
    allTables.push([]);
  }

  var anyFriends = true;

  // go through the tables
  // TODO: when there are too many couples, it will currently add them to the same table even if it exceeds the size
  while (anyFriends && guestList.length > 0) {
    console.log('looping');
    for (var tableIndex = 0; tableIndex < allTables.length; tableIndex++) {
      // find guests with friends
      if (anyFriends) {
        for (var guestIndex = 0; guestIndex < guestList.length; guestIndex++) {
          console.log('index--->' + guestIndex);
          // check if guest has friend
          var friend = guestList[guestIndex].friendName;
          if (friend) {
            // adding guest and their friend
            var guestToAdd = guestList.splice(guestIndex, 1)[0];
            var friendIndexToAdd = findFriendIndex(guestList, friend);
            if (friendIndexToAdd >= 0) {
              var friendToAdd = guestList.splice(friendIndexToAdd, 1)[0];
            } else {
              throw new Error('Friend names do not match');
            }

            allTables[tableIndex].push(guestToAdd);
            allTables[tableIndex].push(friendToAdd);

            console.log('breaking when we add a friend');
            break;
          }
          if (guestIndex === guestList.length - 1) {
            anyFriends = false;
          }
        }
      } else {
        console.log('breaking');
        break;
      }
    }
  }

  // once there are no more guests that have friends, go through the guestList array and push as many guests as the table will hold
  for (var tableIndex = 0; tableIndex < allTables.length; tableIndex++) {
    var currentTable = allTables[tableIndex];
    while (currentTable.length < numPerTable && guestList.length > 0) {
      var rand = Math.floor(Math.random() * guestList.length);
      currentTable.push(guestList.splice(rand, 1)[0]);
    }
  }

  console.log(allTables);
  // return an array of tables, and each table is an array of guests
  return allTables;
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

var guests2 = [{"_id":"55c92b11358e98cc3c57ed0a","guestName":"marco","friendName":"lambert","__v":0,"constraints":[]},{"_id":"55c92b11358e98cc3c57ed0b","guestName":"lambert","friendName":"marco","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed10","guestName":"jenny","friendName":"kiri","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed11","guestName":"kiri","friendName":"jenny","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed12","guestName":"jennie","friendName":"taco","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed13","guestName":"taco","friendName":"jennie","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed14","guestName":"help","friendName":"please","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed15","guestName":"please","friendName":"help","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed16","guestName":"much","friendName":"faster","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed17","guestName":"faster","friendName":"much","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed18","guestName":"daft","friendName":"punk","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed19","guestName":"punk","friendName":"daft","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed1a","guestName":"rivers","friendName":"cuomo","__v":0,"constraints":[]},{"_id":"55c92b40358e98cc3c57ed1b","guestName":"cuomo","friendName":"rivers","__v":0,"constraints":[]}];
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

console.log(exports.makeDiningTables(guests2, 4));











