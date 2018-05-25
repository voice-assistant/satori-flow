#! /usr/bin/env node

import { Configuration } from 'satori-flow'
import { IntentDetector } from 'satori-flow'
const Command = require("commander").Command;
const fs = require("fs");
const program = new Command()

program
    .version('0.1.1')
    .option('-c, --config [file_path]', 'Add configuration file')
    .parse(process.argv);

console.log('config path %s', program.config);
fs.readFile(program.config, 'utf-8', function (err, data) {
    const configuration = new Configuration(data);
    const detector = new IntentDetector(configuration);
    const result = detector.match({"text" : "I would like to repeat again.", "userId" : 985499 });
    console.log(result);
});
