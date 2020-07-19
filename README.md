# Project boiler plate

## Webpack tool chain

webpack complete using [`webpack-config-plugins`](https://webpack-config-plugins.js.org/) by [`namics`](https://webpack-config-plugins.js.org/)

webpack dev server with hot reload

[react-hot-loader](https://github.com/gaearon/react-hot-loader) vs [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)

    webpack_port=8080

## Client / Server Web Socket

`http://localhost:3000` request and `ws://` connection request on same host

what is `https://` and `wss://`

    port=3000

### NGROK tunnel

How does ngrok allow both `http://` request and `ws://` over it's public tunnel?

**note:** device orientation ( package used in project requires https on mobile ). possible lead: device orientation on mobile [`wss://`](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener)

[**ws:// client**](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications) and nodejs [**ws**](https://www.npmjs.com/package/ws) and tunnel via [**ngrok**](https://ngrok.com/docs#http-websockets)

[**device-orientation-manager**](https://github.com/deebloo/device-orientation/blob/master/device-orientation.js)
