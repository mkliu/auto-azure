#!/usr/bin/env node

var path = require('path');
var singleboxExecuteJs = require(path.resolve(__dirname, '../test'));
var argv    = require('optimist')
    .description('AutoAzure - Automate everything for Azure. You need to login to azure cli before using this tool.')
    .usage('Usage: AutoAzure -n samplewebsite -anyOtherParameter.supported newValue')
    .options('n',
    {
        alias: 'name',
        describe: 'Application name to create, this will determin the website name and sqlServer name, make sure to avoid dup names with other websites or sql servers',
        demand: true
    })
    .options('u',
    {
        alias: 'sqlPassword',
        describe: 'Password for sql server. Will generate one if not specified',
        default: 'yaoguai'
    })
    .options('p',
    {
        alias: 'sqlPassword',
        describe: 'Password for sql server. Will generate one if not specified',
    })
    .options('i',
    {
        alias: 'clientId',
        describe: 'clientId to access Keyvault',
    })
    .options('s',
    {
        alias: 'clientSecret',
        describe: 'clientSecret to access Keyvault',
    })
    .argv;


delete argv.p
delete argv.$0
delete argv._
singleboxExecuteJs(argv)
