Here is a simple implementation of throttling for API calls in JavaScript using Node.js and Express.js:

```javascript
const express = require('express');
const app = express();
const port = 3000;

let requestCounter = 0;
const requestLimit = 100;
const requestTimeLimit = 10000; // in milliseconds

app.use((req, res, next) => {
    requestCounter++;

    if (requestCounter > requestLimit) {
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }

    setTimeout(() => {
        requestCounter--;
    }, requestTimeLimit);

    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

This is a simple Express.js server that throttles incoming requests. It uses a middleware function that increments a request counter every time a request is made. If the request counter exceeds a specified limit, the server responds with a 429 status code (Too Many Requests) and a message. The request counter is decremented after a specified time limit, allowing for more requests to be made.