[![Build Status](https://travis-ci.org/voice-assistant/satori-flow.svg?branch=master)](https://travis-ci.org/voice-assistant/satori-flow)

# Satori

An intent detector.

# Overview

Satori is a tiny library to detect intent of input sentence.
Specifically Ssatori gets the input JSON (containing sentence, device type and user id) and then returns the intention
and the arguments, which are needed to process the selected tasks.

# Install

Run the following command in your repository. 

```
npm install satori-flow
```

# Sample

After you install the Satori, you can use satori as a library. a [sample](https://github.com/voice-assistant/satori-flow/blob/master/sample/satori-sample.js)
is bundled in this repository. The following is a sample code to detect intent from user by Satori.

```javascript
import { ConfigurationBuilder } from 'satori-flow'
import { IntentDetector } from 'satori-flow'

const config = new ConfigurationBuilder()
      .addIntent("repeat", { "type" : "verbatim", "patterns" : [ "repeat", "please repeat" ]})
      .addRunner("repeat", {"type" : "random", "list" : ["sure"]} )
      .build();

const detector = new IntentDetector(config);
const result = detector.match({"text" : "I would like to repeat again.", "userId" : 985499 });
console.log(result)
```

You can run the above script (saved as `sample/satori-sample.js`) with the following command.

```bash
$ babel-node sample/satori-sample.js
{ text: 'I would like to repeat again.',
  userId: 985499,
  state: {},
  match: 'repeat' }
  satori git:(master)
```

# CLI command

Satori provides a cli command tool, after the installation of the package, we can run `satori` command with configuration file.

```
satori -c test/fixtures/sample_conf.json
please repeat
{ text: 'please repeat',
  userId: 985499,
  state: {},
  match: 'Repeat' }
```

# Usage

For detailed usage. Please read [doc/main.adoc](https://github.com/voice-assistant/satori/blob/master/doc/main.adoc).

# License

Apache 2.0

# Contribution

See [CONTRIBUTING.md](https://github.com/voice-assistant/satori/blob/master/CONTRIBUTING.md).
