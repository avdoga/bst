var io = require('socket.io')(process.env.PORT || 3000);
var shortid = require('shortid');


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
        
        //if (playerCount == 1){
        if (data.number == 1){
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
        socket.emit('whomustplay');
        socket.broadcast.emit('move', data);
        socket.emit('move', data);
        //socket.emit('whomustplay', {gnacacCard: data.gnacacCard});

        //socket.broadcast.emit('whomustplay', {gnacacCard: data.gnacacCard});
        //socket.broadcast.emit('whomustplay', data);
    });
    
    socket.on('xosal', function(data){
        data.number = players[thisPlayerId].number;
        //console.log('whomustplay', JSON.stringify(data));

        //socket.broadcast.emit('message', data);
        //socket.emit('message');
        console.log('xosym em ', JSON.stringify(data));
        socket.broadcast.emit('xosal', data);
        socket.emit('xosal', data);
    });
    
    
    socket.on('haytararel', function(data){
    data.number = players[thisPlayerId].number;
        console.log('dsic inch ka ', JSON.stringify(data));
        socket.broadcast.emit('haytararel', data);
        socket.emit('haytararel', data);
    });
    
    socket.on('cuyctal', function(data){
    data.number = players[thisPlayerId].number;
        console.log('cuyctal ', JSON.stringify(data));
        socket.broadcast.emit('cuyctal', data);
        socket.emit('cuyctal', data);
    });
    
    socket.on('whomustplay', function(data){
        //console.log('whomustplay', JSON.stringify(data));

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

