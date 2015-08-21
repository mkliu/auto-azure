
var moment = require('moment');

var environmentType = "dev";
var appName = "wayliutodo" + environmentType;
var deploymentBaseName = appName + moment().format('YYMMDD_HHmmss');

var location = "East US";

var config =
  {
    deploymentBaseName: deploymentBaseName,
    location: location,
    keyVaultName: "wayliukeyvault",
    environment: environmentType,
    siteName: appName,
    siteLocation: location,
    sku: "Free",
    workerSize: 0,
    repoUrl: "https://github.com/mkliu/ToDoApp",
    project: "ContosoUniversity\\ContosoUniversity\\ContosoUniversity.csproj",
    resourceGroup: "wayliutest5",
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