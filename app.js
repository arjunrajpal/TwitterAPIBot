var express = require('express');
var TwitterPackage = require('twitter');

var app=express();
var secret = {
	consumer_key:'',
	consumer_secret:'',
	access_token_key:'',
	access_token_secret:''
};

var twitter = new TwitterPackage(secret);

app.get('/*',function(req,res){
	res.send("Twitter streaming");
});

twitter.stream('statuses/filter',{track:'Space'},function(stream){
	stream.on('data',function(tweet){
		console.log(tweet);

		var myResponse = {status:"@"+tweet.user.screen_name+"thanks"};
		console.log(tweet.user.screen_name);
		twitter.post('statuses/update',myResponse,function(err,tweetReply,res){
			console.log("Tweet Reply :"+tweetReply);
		});
	});

	stream.on('error',function(err){
		console.log(err);
	});
});

app.set('port',3000);
app.listen(app.get('port'));

console.log("Connected");