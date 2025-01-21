const sse = new EventSource('http://localhost:3001/sse');

sse.onmessage = (event) => {
    const data = JSON.parse(event.data);
}

sse.addEventListener("my-event", (event) => {
    ...
})

//

/**
 * HTTP/1.1 200 OK
 * Content-Type: text/html
 * ...
 * <html>...
 * 
 * 
 * HTTP/1.1 200 OK
 * Content-Type: text/event-stream
 * Keep-Alive: timeout=15
 * {message}
 * 
 * id: 1
 * event: message
 * data: {message}
 * data: {message}
 * : ok
 * 
 * id: 2
 * 
 */

