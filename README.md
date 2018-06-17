# ForgetMeMaeby
A very basic data cache featuring expiration times.

### Version 0.0.1

### Basic Usage: 

#### Import and Create a Cache.
```
  import Cache from 'forget-me-maeby';
  
  const cache = new Cache("cacheNameIsOptional");

```

#### Set an Expiration Time in Milliseconds to the Cache for all values.
```
  cache.expiresIn(10000); // returns the cache for continuation.
  cache.expiresIn(); // returns 10000;
 

```

**Set the cache to have NO expiration**
``` cache.expiresIn(-1) ```

**If you do NOT set an expiration time, the default value is 1 hour.**

#### Set a Value: 
```
  cache.set("blue", 2435); // sets value with key of blue to 2435.
  // returns the cache again for continuations.

```

**With a unique expiration time**
```
  cache.set("orange", 111, 1000 * 60 * 60); 
  // expiration time for data under key "orange" is now 1 hour
  // ALL Other Cache expirations remain the default value.
   
```

#### Get a Value: 
```
  cache.get("blue"); // returns 2435
  // wait for 20 seconds
  cache.get("blue"); // returns null; 
```

**With a Default Fallback**
```
  cache.get("blue", 76); // returns 2435
  // wait for 20 seconds;
  cache.get("blue", 76); // returns 76
  cache.get("mauve", true); // returns true because there is no "mauve" value

```

#### Get all values in the cache at once: 
```
  cache.set("blue", 1976).set("green", 2001);
  cache.get(); // returns { blue: 1976, green: 2001 };
  // wait for 20 seconds: 
  cache.get(); // returns { blue: null, green: null };
```

#### Delete a value in the cache. 
```
  cache.delete("blue"); // removes the "blue" key from the cache.
  // returns cache for continuation
  
  cache.delete("Greg Brady"); // throws an error because there is 
  // no data under the key "Greg Brady"
```
