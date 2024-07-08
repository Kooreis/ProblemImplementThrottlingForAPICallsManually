Here is a simple console application in TypeScript that implements throttling for API calls manually. This application uses a simple queue to manage the API calls and a timer to control the rate of the calls.

```typescript
class Throttler {
    private queue: Array<() => void> = [];
    private timer: NodeJS.Timeout | null = null;

    constructor(private limit: number) {}

    callAPI(apiCall: () => void) {
        this.queue.push(apiCall);
        this.processQueue();
    }

    private processQueue() {
        if (this.timer) {
            return;
        }

        const startTime = Date.now();
        const apiCall = this.queue.shift();

        if (apiCall) {
            apiCall();
        }

        const endTime = Date.now();
        const elapsedTime = endTime - startTime;

        if (elapsedTime < this.limit) {
            this.timer = setTimeout(() => {
                this.timer = null;
                this.processQueue();
            }, this.limit - elapsedTime);
        } else {
            this.processQueue();
        }
    }
}

// Usage
const throttler = new Throttler(1000); // Limit API calls to 1 per second

// Simulate API calls
for (let i = 0; i < 10; i++) {
    throttler.callAPI(() => console.log(`API call ${i + 1} at ${new Date().toISOString()}`));
}
```

This application creates a `Throttler` class that manages the API calls. The `callAPI` method is used to add an API call to the queue. The `processQueue` method is used to process the queue and control the rate of the API calls. The `Throttler` class is then used to simulate 10 API calls with a limit of 1 call per second.