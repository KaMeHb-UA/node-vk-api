const qs = require('querystring'),
    urlprep = inlineStr => {
        return qs.stringify({q:inlineStr}).slice(2)
    },
    request = require('request');
/**
 * @typedef {Object} APIOptions
 * @property {String} token API token
 * @property {String} version API version
 * @property {String=} userAgent userAgent header for request lib
 * @property {String=} proxy Proxy address (like https://some.com:443)
 */
class API extends (a=>{a.prototype=Proxy;return a})(Proxy){ // safe wrapper for built-in class
    /**
     * VK main API
     * @param {APIOptions} options Parameters for creating an instance
     * @return {Void}
     */
    constructor(options){
        if(!(
            options.token &&
            options.version
        )) throw new TypeError('Cannot create API object without required data');
        var defaults = {
            extends: (() => {
                var def = {};
                options.userAgent ? def.headers = {'User-Agent': options.userAgent} : null;
                options.proxy ? def.proxy = options.proxy : null;
                return obj => {
                    var tmp = def, i;
                    for(i in obj){
                        tmp[i] = obj[i]
                    }
                    return tmp
                }
            })()
        };
        super(new Object(), {
            get(target, iface){
                return new Proxy(new Object(), {
                    get(target2, method){
                        function realFunc(data, counter = 0){
                            console.log(defaults.extends({
                                url: `https://api.vk.com/method/${urlprep(iface)}.${urlprep(method)}?${qs.stringify({
                                    access_token: options.token,
                                    v: options.version
                                })}`,
                                form: data
                            }))
                            return new Promise((resolve, reject) => {
                                request.post(defaults.extends({
                                    url: `https://api.vk.com/method/${urlprep(iface)}.${urlprep(method)}?${qs.stringify({
                                        access_token: options.token,
                                        v: options.version
                                    })}`,
                                    form: data
                                }), (err, httpResponse, body) => {
                                    if (err){
                                        if (counter < 3) realFunc(data, ++counter).then(resolve, reject); else reject(new Error('Cannot establish connection on 3rd retry'))
                                    } else {
                                        try{
                                            body = JSON.parse(body)
                                        } catch(e){
                                            reject(new SyntaxError('Cannot parse response as JSON:\n' + body))
                                        }
                                        if (body.error) reject(new Error('Error got: '+ JSON.stringify(body.error))); else resolve(body.response)
                                    }
                                })
                            })
                        };
                        return data => {return realFunc(data)}
                    },
                    set(target2, method, value){
                        return false
                    }
                })
            },
            set(target, prop, value){
                return false
            }
        })
    }
}
module.exports = API
