
var moment = require('moment');
var _ = require('lodash');
var generatePassword = require('password-generator');
var nconf = require("nconf");

var cmdArgs = nconf.argv().stores.argv.store;

var coreParams = 
{
  name: "wayliutodo",
  env: "dev",
  location: "East US",
  sqlUser: "yaoguai",
  sqlPassword: generatePassword(15, false) + '!0',
  resourceGroup: "wayliutest",
  vaultName: "wayliukeyvault",
  clientId: "clientId",
  clientSecret: "clientSecret"
}

_.merge(coreParams, cmdArgs)

var appName = coreParams.name + coreParams.env;
var deploymentBaseName = appName + moment().format('YYMMDD_HHmmss');

var config =
  {
    appName: appName,
    deploymentBaseName: deploymentBaseName,
    location: coreParams.location,
    keyVault:
    {
      vaultName: coreParams.vaultName,
    },
    environment: coreParams.env,
    resourceGroup: coreParams.resourceGroup,
    webapp:
    {
      environment:
      {
        value: coreParams.env
      },
      siteName:
      {
        value: appName
      },
      hostingPlanName:
      {
        value: appName
      },
      siteLocation:
      {
        value: coreParams.location
      },
      sku:
      {
        value: "Free"
      },
      workerSize:
      {
        value: '0'
      },
      repoUrl:
      {
        value: "https://github.com/mkliu/ToDoApp"
      },
      project:
      {
        value: "ContosoUniversity\\ContosoUniversity\\ContosoUniversity.csproj"
      },
      branch:
      {
        value: "master"
      },
      clientId:
      {
        value: coreParams.clientId
      },
      clientSecret:
      {
        value: coreParams.clientSecret
      },
      secretUri:
      {
        value: "secretUri"
      },
      sqlConn:
      {
        value: ""
      }
    },
    sql:
    {
      environment:
      {
        value: coreParams.env
      },
      sqlDBEdition:
      {
        value: "Web"
      },
      sqlServerName:
      {
        value: appName
      },
      sqlDbName:
      {
        value: 'DemosDB'
      },
      sqlServerAdminLogin:
      {
        value: coreParams.sqlUser
      },
      sqlServerAdminPassword:
      {
        value: coreParams.sqlPassword
      },
      sqlServerLocation:
      {
        value: coreParams.location
      }
    }
  }

nconf.argv().defaults(config);

var conf = nconf.get();

// console.log(JSON.stringify(conf))
module.exports=conf