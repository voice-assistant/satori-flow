[![Build Status](https://travis-ci.org/voice-assistant/satori.svg?branch=master)](https://travis-ci.org/voice-assistant/satori)

# Satori

An intent detector.

# Overview

Satori is a tiny library to detect intent of input sentence.
Specifically Ssatori gets the input JSON (containing sentence, device type and user id) and then returns the intention
and the arguments, which are needed to process the selected tasks.

# Install

Run the following command in your repository. 

```
npm install git+ssh://git@github.com/voice-assistant/satori --save
```

# Sample

The following is a sample code to detect intent from user by Satori.

```javascript
import { ConfigurationBuilder } from 'satori'
import { IntentDetector } from 'satori'



const config = new ConfigurationBuilder()
      .addIntent("repeat", { "type" : "verbatim", "patterns" : [ "repeat", "please repeat" ]})
      .addRunner("repeat", {"type" : "random", "list" : ["sure"]} )
      .build();

const detector = new IntentDetector(config);
const result = detector.match({"text" : "I would like to repeat again.", "userId" : 985499 });
console.log(result)
```

For detailed usage. Please read [doc/main.adoc](https://github.com/voice-assistant/satori/blob/master/doc/main.adoc).

# License

Apache 2.0
