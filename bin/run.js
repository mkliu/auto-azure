#!/usr/bin/env node

var path = require('path');

var argv = require('optimist')
// .description('AutoAzure - Automate everything for Azure. You need to login to azure cli before using this tool.')
    .usage('Usage: AutoAzure -n samplewebsite --anyOtherParameter.supported newValueSuchAs --webapp.sku.value Premium')
    .options('name',
        {
            describe: 'Application name to create, used for website and sqlServer, make sure to avoid dup otherwise creation will fail',
            demand: true
        })
    .options('env',
        {
            describe: 'Environment, used for tagging and naming resources',
            default: 'dev'
        })

    .options('resourceGroup',
        {
            describe: 'Resource Group',
            default: 'wayliutest'
        })

    .options('vaultName',
        {
            describe: 'key vault name',
            default: 'wayliukeyvault'
        })

    .options('location',
        {
            describe: 'Resource location',
            default: 'East US'
        })
    .options('sqlUser',
        {
            describe: 'Password for sql server. Will generate one if not specified',
            default: 'yaoguai'
        })
    .options('sqlPassword',
        {
            describe: 'Password for sql server. Will generate one if not specified',
        })
    .options('clientId',
        {
            describe: 'clientId to access Keyvault',
        })
    .options('clientSecret',
        {
            describe: 'clientSecret to access Keyvault',
        })
    .argv;

delete argv.p
delete argv.$0
delete argv._

var autoazure = require(path.resolve(__dirname, '../index'));
autoazure.start(argv)
