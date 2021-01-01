const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');

/***********************************************************  
* worker only communicate with redis: 
* 1) watch redis for new new indices, pulls each new indice
* 2) calculate new value then puts it back into redis 
* workflow: react -> api -> redis -> worker 
***********************************************************/
