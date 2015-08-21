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
 
 function nodeTest(a,b, callback)
 {
   callback(a,b);
 }
 
 function test()
 {
   var qtest = Q.denodeify(nodeTest);
 
 qtest(null, 'b')
 .then(function(response)
   {
     return qtest(null, 'b2')
     .then(function()
       {
         console.log('rethrow error error')
         throw Error('throwing an error')
       })
     .catch(function(error)
       {
         console.log('inside error')
         // throw new Error('new error')
       })
   })
   .then(function(response)
     {
       console.log('outside then')
     })
 .catch(function(error)
   {
     console.log('outside error', error)
   })
   .done(function(response)
     {
       console.log('outside done', response)
     })
 }
 
 // test();
   
function ensureCreateResourceGroupExists(resourceGroupName, location) {
  console.log('Checking if resourceGroup', resourceGroupName, 'exists')
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
      console.log(resourceGroupName, ' exists')
    })
    .catch(function (err) {
      console.error(err);
      console.log(resourceGroupName, ' does not exists. Creating one')
      return qAzureInvoke(createCmd)
      .then(function(response)
        {
          if(_.isString(response) && response.indexOf('"Succeeded"'))
          {
            console.log('ResourceGroup creation succeeded.');
          }
          else
          {
            throw Error('ResourceGroup failed.')
          }
        }
      )
      .catch(function(err, response)
        {
          console.log('ResourceGroup creation completed with', response);
          // parsing error could happen even when creation is successful
          if(response && response.indexOf('"Succeeded"'))
          {
            console.log('ResourceGroup creation succeeded.');
          }
          else
          {
            throw Error('ResourceGroup failed.')
          }
        })
      
    })
}

function deploySql(config, params) {
  console.log('Creating SQL server');
  var sqlArmPath = path.resolve('arm', 'sql', 'azuredeploy.json')
  var currentdeploymentName = config.deploymentBaseName + "sql";

  var cmd = {
    command: 'group deployment create',
    name: currentdeploymentName,
    parameters: '"' + JSON.stringify(params).replace(/"/g, '\\"') + '"',
    // parameters: "'" + JSON.stringify(params) + "'",
    short:
    {
      g: config.resourceGroup,
      f: '"' + sqlArmPath + '"'
    }
  };

  return qAzureInvoke(cmd)
  .then(function(response)
    {
      console.log('SQL server created successfully');
      return response;
    })
  .catch(function(err, response)
    {
      var timeout = 10000;
      console.error('Deploy failed with', err, response, 'Wait for', timeout, 'ms and retrieving deployment log (Azure needs some time):');
      setTimeout(function() {
        util.showDeploymentLog(config.resourceGroup, currentdeploymentName)
      }, timeout);
    });
}

function start() {
  ensureCreateResourceGroupExists(config.resourceGroup, config.location)
  .then(function (response) {
       return deploySql(config, config.sql)
      }
    )
  .catch(function (err) {
    console.error(err)
  })
  .done(function (response) {
    console.log('Completed', response)
  })
}

start();
    

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

