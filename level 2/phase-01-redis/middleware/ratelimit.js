import { redis } from "../index.js";

const ratelimiter = async (req, res, next) => {
  // Race conditon bug:  if the server crashes right after incr but before expire, the key will live forever, blocking the user indefinitely.
  /*  const ip = req.ip
    const key = `rate_limit:${ip}`
    // console.log("key: ", key);
    
    const requests = await redis.incr(key)
    // console.log("request: ", requests);
    

    if(requests === 1) {
        await redis.expire(key,60)
    }

    if(requests>5) {
        res.status(429).json({message: "Too many requests"})
    } */

  // To fix this, use MULTI (a transaction) or redis.eval (Lua script) to ensure atomic execution.

  const ip = req.ip;
  const key = `rate_limit:${ip}`;

  const results = await redis
    .multi()
    .incr(key)
    .expire(key, 60, "NX") // NX only sets expiry if the key exist
    .exec();

  const incrementResult = results[0];       // result from incr(key): [null, 1]
  const requests = incrementResult[1];      //actual number returned by incr(key): 1

  if (requests > 5) {
    return res.status(429).json({ message: "Too many requests...." });
  }

  next();
};

export default ratelimiter;
