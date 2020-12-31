## Node.js 10 ChangeLog

| Current |
| :------ |
| 10.0.0  |

** 2018-04-24, Version 10.0.0 (Current), @jasnell **

### Notable Changes

- Assert
  - Calling assert.fail() with more than one argument is deprecated. [70dcacd710]
  - Calling assert.ok() with no arguments will now throw. [3cd7977a42]
  - Calling assert.ifError() will now throw with any argument other than undefined or null. Previously the method would throw with any truthy value. [e65a6e81ef]
  - The assert.rejects() and assert.doesNotReject() methods have been added for working with async functions. [599337f43e]
- Async_hooks
  - Older experimental async_hooks APIs have been removed. [1cc6b993b9]
- Buffer
  - Uses of new Buffer() and Buffer() outside of the node_modules directory will now emit a runtime deprecation warning. [9d4ab90117]
  - Buffer.isEncoding() now returns undefined for falsy values, including an empty string. [452eed956e]
  - Buffer.fill() will throw if an attempt is made to fill with an empty Buffer. [1e802539b2]
- Child Process
  - Undefined properties of env are ignored. [38ee25e2e2], [85739b6c5b]
- Console
  - The console.table() method has been added. [97ace04492]
- Crypto
  - The crypto.createCipher() and crypto.createDecipher() methods have been deprecated. Please use crypto.createCipheriv() and crypto.createDecipheriv() instead. [81f88e30dd]
  - The decipher.finaltol() method has been deprecated. [19f3927d92]
  - The crypto.DEFAULT_ENCODING property has been deprecated. [6035beea93]
  - The ECDH.convertKey() method has been added. [f2e02883e7]
  - The crypto.fips property has been deprecated. [6e7992e8b8]
- Dependencies
  - V8 has been updated to 6.6. [9daebb48d6]
  - OpenSSL has been updated to 1.1.0h. [66cb29e646]
- EventEmitter
  - The EventEmitter.prototype.off() method has been added as an alias for EventEmitter.prototype.removeListener(). [3bb6f07d52]
- File System
  - The fs/promises API provides experimental promisified versions of the fs functions. [329fc78e49]
  - Invalid path errors are now thrown synchronously. [d8f73385e2]
  - The fs.readFile() method now partitions reads to avoid thread pool exhaustion. [67a4ce1c6e]
- HTTP
  - Processing of HTTP Status codes 100, 102-199 has been improved. [baf8495078]
  - Multi-byte characters in URL paths are now forbidden. [b961d9fd83]
- N-API
  - The n-api is no longer experimental. [cd7d7b15c1]
- Net
  - The 'close' event will be emitted after 'end'. [9b7a6914a7]
- Perf_hooks
  - The PerformanceObserver class is now an AsyncResource and can be monitored using async_hooks. [009e41826f]
  - Trace events are now emitted for performance events. [9e509b622b]
  - The performance API has been simplified. [2ec6995555]
  - Performance milestone marks will be emitted as trace events. [96cb4fb795]
- Process
  - Using non-string values for process.env is deprecated. [5826fe4e79]
  - The process.assert() method is deprecated. [703e37cf3f]
- REPL
  - REPL now experimentally supports top-level await when using the --experimental-repl-await flag. [eeab7bc068]
  - The previously deprecated "magic mode" has been removed. [4893f70d12]
  - The previously deprecated NODE_REPL_HISTORY_FILE environment variable has been removed. [60c9ad7979]
  - Proxy objects are shown as Proxy objects when inspected. [90a43906ab]
- Streams
  - The 'readable' event is now always deferred with nextTick. [1e0f3315c7]
  - A new pipeline() method has been provided for building end-to-data stream pipelines. [a5cf3feaf1]
  - Experimental support for async for-await has been added to stream.Readable. [61b4d60c5d]
- Timers
  - The enroll() and unenroll() methods have been deprecated. [68783ae0b8]
- TLS
  - The tls.convertNPNProtocols() method has been deprecated. [9204a0db6e]
  - Support for NPN (next protocol negotiation) has been dropped. [5bfbe5ceae]
  - The ecdhCurve default is now 'auto'. [af78840b19]
- Trace Events
  - A new trace_events top-level module allows trace event categories to be enabled/disabled at runtime. [da5d818a54]
- URL
  - The WHATWG URL API is now a global. [312414662b]
- Util
  - util.types.is[…] type checks have been added. [b20af8088a]
  - Support for bigint formatting has been added to util.inspect(). [39dc947409]

### Deprecations:

The following APIs have been deprecated in Node.js 10.0.0

- Passing more than one argument to assert.fail() will emit a runtime deprecation warning. [70dcacd710]
- Previously deprecated legacy async_hooks APIs have reached end-of-life and have been removed. [1cc6b993b9]
- Using require() to access several of Node.js' own internal dependencies will emit a runtime deprecation. [0e10717e43]
- The crypto.createCipher() and crypto.createDecipher() methods have been deprecated in documentation.[81f88e30dd]
- Using the Decipher.finaltol() method will emit a runtime deprecation warning. [19f3927d92]
- Using the crypto.DEFAULT_ENCODING property will emit a runtime deprecation warning. [6035beea93]
- Use by native addons of the MakeCallback() variant that passes a Domain will emit a runtime deprecation warning. [14bc3e22f3], [efb32592e1]
- Previously deprecated internal getters/setters on net.Server has reached end-of-life and have been removed. [3701b02309]
- Use of non-string values for process.env has been deprecated in documentation. [5826fe4e79]
- Use of process.assert() will emit a runtime deprecation warning. [703e37cf3f]
- Previously deprecated NODE_REPL_HISTORY_FILE environment variable has reached end-of-life and has been removed. [60c9ad7979]
- Use of the timers.enroll() and timers.unenroll() methods will emit a runtime deprecation warning. [68783ae0b8]
- Use of the tls.convertNPNProtocols() method will emit a runtime deprecation warning. Support for NPN has been removed from Node.js. [9204a0db6e]
- The crypto.fips property has been deprecated in documentation. [6e7992e8b8]
