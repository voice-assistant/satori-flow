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
fs.readFile(program.config, 'utf-8', (err, data) => {
    const configuration = new Configuration(data);
    const detector = new IntentDetector(configuration);
    const stdin = process.openStdin();
    stdin.addListener("data", function(d) {
        const result = detector.match({"text" : d.toString().trim(), "userId" : 985499 });
        console.log(result);
    });
});
