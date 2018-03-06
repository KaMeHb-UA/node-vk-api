# node-vk-api

Native-like vk API module

## Getting Started

Get to your project deirectory

Install module using npm
```
npm install node-vk-api
```
or using yarn
```
yarn add node-vk-api
```
### Simple usage

```javascript
const API = require('node-vk-api'),
    vkAPI = new API({
        token: 'your_secret_token',
        version: '5.73' //actual version
    });
```
### Proxy

```javascript
const API = require('node-vk-api'),
    vkAPI = new API({
        token: 'your_secret_token',
        version: '5.73',
        proxy: 'http://someproxy.com:80',
    });
```
### HTTPS Proxy
You can use not only http proxy. For example, use https proxy
```javascript
const API = require('node-vk-api'),
    vkAPI = new API({
        token: 'your_secret_token',
        version: '5.73',
        proxy: 'https://someproxy.com:443',
    });
```
Some servers need to be used in non-strict TLS mode. For now, there are no instumentary to do following. Temporary fix:
```javascript
const API = require('node-vk-api'),
    vkAPI = new API({
        token: 'your_secret_token',
        version: '5.73',
        proxy: 'https://someproxy.com:443',
    });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
```

### Some additionals
You can use own user-agent

```javascript
const API = require('node-vk-api'),
    vkAPI = new API({
        token: 'your_secret_token',
        version: '5.73',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ArchLinux Chromium/64.0.3282.167 Chrome/64.0.3282.167 Safari/537.36'
    });
```
## Methods

Supported all the method in native-like way with promises. (You can use it in await/async mode)

```javascript
var vkAPI = new API({
    token: 'your_secret_token',
    version: '5.73'
});
vkAPI.messages.getHistory({
    peer_id: 2000000002,
    count: 200,
    rev: 1
}).then(data => {
    console.log(data)
}).catch(err => {
    console.log('Got error:');
    console.error(err)
})
```
