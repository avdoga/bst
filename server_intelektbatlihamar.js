var io = require('socket.io')(process.env.PORT || 3000);
var shortid = require('shortId');


var players = [];

var playerCount = 0;

console.log('server started');


io.on('connection', function(socket){
    
    playerCount++;
    var thisPlayerId = shortid.generate();
    
    console.log('client connected', playerCount, ' - ', thisPlayerId);
    
    var player = {
      id: thisPlayerId,
      number: playerCount,
      //y: 100

    };
    
    //players.push(thisPlayerId);
    players[thisPlayerId] = player;
    

    socket.emit('playernumber', {number: playerCount});
    
    socket.emit('register', {id: thisPlayerId, number: playerCount});
    
    socket.broadcast.emit('register', {id: thisPlayerId, number: playerCount});
    
    for(var playerId in players){
        if(playerId == thisPlayerId)
            continue;
                
        socket.emit('register', players[playerId]);
    };
    
    

    
    //socket.emit('sendid', {id: thisPlayerId, number: playerCount});
    
    //for(i = 0; i < playerCount; i++)
    //{
        //socket.emit('spawn');
        //console.log('sending spawn to new player');
    //}
    
    socket.on('register', function(data){
        //data.id = thisPlayerId;
        //data.number = players[thisPlayerId].number;
        //console.log('client moved', JSON.stringify(data));
    
    });
    
    socket.on('opshikarter', function(data){
        data.id = thisPlayerId;
        data.number = players[thisPlayerId].number;
        
        if (playerCount == 1){
            myJSONcards = data;
        }
        else{
            data = myJSONcards;
        }
        
        socket.emit('opshikarter', data);
        //socket.broadcast.emit('opshikarter', data);
        console.log('opshikarter ', JSON.stringify(myJSONcards));
    
    });
    
    socket.on('move', function(data){
        data.id = thisPlayerId;
        data.number = players[thisPlayerId].number;
        console.log('client moved', JSON.stringify(data));
        socket.broadcast.emit('move', data);
    });
    
    socket.on('sendid', function(data){
        data.id = thisPlayerId;
        data.number = players[thisPlayerId].number;
        console.log('sending massage', JSON.stringify(data));
        
        

        //socket.broadcast.emit('message', data);
        //socket.emit('message');
    });
    
    
    socket.on('disconnect', function(){
        console.log('client disconnected ', players[thisPlayerId].number, ' - ', thisPlayerId);
        delete players[thisPlayerId];
        socket.broadcast.emit('disconnected', {id:thisPlayerId});
        playerCount--;

    });
    
    
    
    
    
})

