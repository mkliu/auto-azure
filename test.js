var scripty = require('azure-scripty');
var console = require('better-console');
var _ = require('lodash');
var util = require('./util');
var async = require('async');
var path = require('path')
var Q = require('q');
var config = require('./config')

var qAzureInvoke = Q.denodeify(scripty.invoke)
// New-AzureKeyVault -VaultName 'WayliuContosoKeyVault' -ResourceGroupName 'ContosoResourceGroup' -Location 'East Asia'
// $key = Add-AzureKeyVaultKey -VaultName 'WayliuContosoKeyVault' -Name 'ContosoFirstKey' -Destination 'Software'

// $secretvalue = ConvertTo-SecureString 'Pa$$w0rd' -AsPlainText -Force
// $secret = Set-AzureKeyVaultSecret -VaultName 'wayliuContosoKeyVault' -Name 'SQLPassword' -SecretValue $secretvalue 
// Get-AzureKeyVaultSecret -VaultName 'wayliuContosoKeyVault' 

// azure login -u xxx--service-principal --tenant xxx
 
 
function ensureCreateResourceGroupExists(resourceGroupName, location) {
  console.info('Checking if resourceGroup', resourceGroupName, 'exists')
  var showCmd = {
    command: 'group show',
    positional: [resourceGroupName],
  };

  var createCmd = {
    command: 'group create',
    name: resourceGroupName,
    location: '"' + location + '"'
  };

  return qAzureInvoke(showCmd)
    .then(function (response) {
      console.info(resourceGroupName, ' exists')
    })
    .catch(function (err) {
      console.error(err);
      console.info(resourceGroupName, ' does not exists. Creating one')
      return qAzureInvoke(createCmd)
    })
}

function deploySql(config, params) {
  console.info('Creating SQL server');
  var sqlArmPath = path.resolve('arm', 'sql', 'azuredeploy.json')
  var currentdeploymentName = config.deploymentBaseName + "sql";

  var cmd = {
    command: 'group deployment create',
    name: currentdeploymentName,
    // parameters: '"' + JSON.stringify(params).replace(/"/g, '\\"') + '"',
    parameters: "'" + JSON.stringify(params) + "'",
    short:
    {
      g: config.resourceGroup,
      f: '"' + sqlArmPath + '"'
    }
  };

  return qAzureInvoke(cmd)
  .then(function(response)
    {
      console.info('SQL server created successfully');
      return response;
    })
  .catch(function(err)
    {
      var timeout = 10000;
      console.error('Deploy failed. Wait for', timeout, 'ms and retrieving deployment log (Azure needs some time):');
      setTimeout(function() {
        util.showDeploymentLog(config.resourceGroup, currentdeploymentName)
      }, timeout);
    });
}

ensureCreateResourceGroupExists(config.resourceGroup, config.location)
  .then(function (response) {
       return deploySql(config, config.sql)
      }
    )
  .catch(function (err) {
    console.error(err)
  })
  .done(function (response) {
    console.info('Completed', response)
  })
    

// console.log(armPath)

// var sqlConn = 'Data Source=tcp:', reference(concat('Microsoft.Resources/deployments/', parameters('sqlServerName'))).outputs.fullyQualifiedDomainName.value, ',1433;Initial Catalog=', parameters('sqlDbName'), ';User Id=', parameters('sqlServerAdminLogin'), '@', parameters('sqlServerName'),Password=', parameters('sqlServerAdminPassword'), ';')]"

// var steps={
//   passthrough:function(callback,result, nextCommand) {
//     console.log(nextCommand)
//     if(nextCommand)
//       nextCommand.positional = [result.length]
//     console.log(nextCommand)
//     callback(undefined, result);
//   },
//   complete:function(err, result) {
//       console.log('Completed', err, result.length)
//   }
// };
// var cmds=[
//   {cmd:'group list'},
//   {cmd:'group list'}
// ];

//     scripty.invoke(cmds, steps.complete)

    
// scripty.invoke('site list', function(err, results) {
//   console.log("my groups\n" + JSON.stringify(results));
// });

