```cpp
#include <iostream>
#include <chrono>
#include <queue>
#include <thread>

class Throttler {
private:
    std::queue<std::chrono::steady_clock::time_point> timestamps;
    int max_requests;
    std::chrono::seconds time_period;

public:
    Throttler(int max_requests, std::chrono::seconds time_period)
        : max_requests(max_requests), time_period(time_period) {}

    bool allow() {
        auto now = std::chrono::steady_clock::now();
        while(!timestamps.empty() && now - timestamps.front() > time_period) {
            timestamps.pop();
        }
        if(timestamps.size() < max_requests) {
            timestamps.push(now);
            return true;
        } else {
            return false;
        }
    }
};

int main() {
    Throttler throttler(5, std::chrono::seconds(1));
    for(int i = 0; i < 10; i++) {
        if(throttler.allow()) {
            std::cout << "API call " << i << " allowed.\n";
        } else {
            std::cout << "API call " << i << " not allowed.\n";
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
    return 0;
}
```