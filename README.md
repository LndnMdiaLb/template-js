# Project boiler plate

## Webpack tool chain

webpack complete using [`webpack-config-plugins`](https://webpack-config-plugins.js.org/) by [`namics`](https://webpack-config-plugins.js.org/)

webpack dev server with hot reload

[react-hot-loader](https://github.com/gaearon/react-hot-loader) vs [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)

    webpack_port=8080

## Client / Server Web Socket

`http://localhost:3001` request and `ws://` connection request on same host

what is `https://` and `wss://`

    port=3001

### NGROK tunnel

How does ngrok allow both `http://` request and `ws://` over it's public tunnel?

**note:** device orientation ( package used in project requires https on mobile ). possible lead: device orientation on mobile [`wss://`](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener)

[**ws:// client**](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications) and nodejs [**ws**](https://www.npmjs.com/package/ws) and tunnel via [**ngrok**](https://ngrok.com/docs#http-websockets)

### [inspiration](https://www.youtube.com/watch?v=aPk1BqK8zzI)

GET http://localhost:3001/events net::ERR_CONNECTION_REFUSED

Console: {"lineNumber":5,"message":"PWA enabled","message_level":1,"sourceIdentifier":3,"sourceURL":"https://www.rferl.org/OneSignalSDKWorker.js?pwa=true"}

something is hitting http://localhost:3001/events
