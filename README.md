# Test description
Create simple server application of reels spin emulator.

Emulator should have next functionality:
- Create players.
It must be simple way to initialize new users by GET request parameter 
for example "/?playerId=casino_player001". Player create with some default parameters.
If client haven`t to send GET parameter use some default player.
- Display balance. 
Balance update during each spin by server response data. 
Balance cannot be less than 0.
- Display bet value and ability to set.
Bet can be set in next range 0 < BET <= BALANCE. 
In case out of it server should send previous spin state.
- Display win value.
On each spin player can win randomly.    
- Ability to spin.
Client send GET/POST request to server with playerId and bet value 
for example "/?playerId=casino_player001&betValue=5". Server should to calculate spin 
result by next formula BALANCE = BALANCE - BET + WIN, WIN = random(0...10) * BET and send
response to client with balance value and win value.

Can be use any java and databases technologies.
For example see demo page emulator.html. How to start it look next.   

# How to start demo

- Open command terminal and go to server-mock root.
- start server.js by next command "node server.js"
- open emulator.html in browser.