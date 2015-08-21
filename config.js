
var moment = require('moment');

var environmentType = "dev";
var appName = "wayliutodo" + environmentType;
var deploymentBaseName = appName + moment().format('YYMMDD_HHmmss');

var location = "East US";

var config =
  {
    appName: appName,
    deploymentBaseName: deploymentBaseName,
    location: location,
    keyVault:
    {
      vaultName: "wayliukeyvault",
    },
    environment: environmentType,
    resourceGroup: "wayliutest5",
    webapp:
    {
      environment:
      {
        value: environmentType
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
        value: location
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
        value: "clientId"
      },
      clientSecret:
      {
        value: "clientSecret"
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
        value: environmentType
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
        value: "wayliu"
      },
      sqlServerAdminPassword:
      {
        value: "!Microsoftxxx1"
      },
      sqlServerLocation:
      {
        value: location
      }
    }
  }

module.exports = config;