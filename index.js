var scripty = require('azure-scripty');
var console = require('better-console');
var _ = require('lodash');
var util = require('./util');
var async = require('async');
var path = require('path')
var Q = require('q');
var config = require('./config');
var os = require('os');

var qAzureInvoke = Q.denodeify(scripty.invoke)
// New-AzureKeyVault -VaultName 'WayliuContosoKeyVault' -ResourceGroupName 'ContosoResourceGroup' -Location 'East Asia'
// $key = Add-AzureKeyVaultKey -VaultName 'WayliuContosoKeyVault' -Name 'ContosoFirstKey' -Destination 'Software'

// $secretvalue = ConvertTo-SecureString 'Pa$$w0rd' -AsPlainText -Force
// $secret = Set-AzureKeyVaultSecret -VaultName 'wayliuContosoKeyVault' -Name 'SQLPassword' -SecretValue $secretvalue 
// Get-AzureKeyVaultSecret -VaultName 'wayliuContosoKeyVault' 

// azure login -u xxx--service-principal --tenant xxx
 
function nodeTest(a, b, callback) {
  callback(a, b);
}

function test() {
  var qtest = Q.denodeify(nodeTest);

  qtest(null, 'b')
    .then(function (response) {
      return qtest(null, 'b2')
        .then(function () {
          console.log('rethrow error error')
          throw Error('throwing an error')
        })
        .catch(function (error) {
          console.log('inside error')
          // throw new Error('new error')
        })
    })
    .then(function (response) {
      console.log('outside then')
    })
    .catch(function (error) {
      console.log('outside error', error)
    })
    .done(function (response) {
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
        .then(function (response) {
          if (_.isString(response) && response.indexOf('"Succeeded"')) {
            console.log('ResourceGroup creation succeeded.');
          }
          else {
            throw Error('ResourceGroup failed.')
          }
        }
          )
        .catch(function (err, response) {
          console.log('ResourceGroup creation completed with', response);
          // parsing error could happen even when creation is successful
          if (response && response.indexOf('"Succeeded"')) {
            console.log('ResourceGroup creation succeeded.');
          }
          else {
            throw Error('ResourceGroup failed.')
          }
        })

    })
}

function escapeParamsString(paramString)
{
  if(os.platform() === 'win32' )
  {
      return '"' + paramString.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }
  else
  {
    // use single quotes on mac otherwise mac bash would expand things like !
    return "'" + paramString.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  }
}

function invokeAzureDeployment(templatePath, params, name, config) {
  console.log('Creating ' + name);
  templatePath
  var currentdeploymentName = config.deploymentBaseName + name;

  var cmd = {
    command: 'group deployment create',
    name: currentdeploymentName,
    parameters: escapeParamsString(JSON.stringify(params)),
    // parameters: "'" + JSON.stringify(params) + "'",
    short:
    {
      g: config.resourceGroup,
      f: '"' + templatePath + '"'
    }
  };

  return qAzureInvoke(cmd)
    .then(function (response) {
      console.log(name + 'deployed successfully', response);
      return response;
    })
    .catch(function (err, response) {
      var timeout = 10000;
      console.error('Deploy failed with', err, response, 'Wait for', timeout, 'ms to retrieve deployment log (Azure needs some time):');
      setTimeout(function () {
        util.showDeploymentLog(config.resourceGroup, currentdeploymentName)
      }, timeout);
    });
}

function deploySql(config, params) {
  return invokeAzureDeployment(
    path.resolve('arm', 'sql', 'azuredeploy.json'),
    params,
    'sql',
    config
    )
}

function deployWebapp(config, params) {
  return invokeAzureDeployment(
    path.resolve('arm', 'webapp', 'azuredeploy.json'),
    params,
    'webapp',
    config
    )
}

function setKeyVault(vaultName, keyName, value) {
  return qAzureInvoke(
    {
      command: "keyvault secret set",
      short:
      {
        u: vaultName,
        s: keyName
      },
      value: escapeParamsString(value)
    }
    )
}

// will remove once website is loading from secrete store
var sqlConn;

function start() {
  qAzureInvoke(
    "config mode arm"
    ).then(function (response) {
      return ensureCreateResourceGroupExists(config.resourceGroup, config.location)
    })
    .then(function (response) {
      return deploySql(config, config.sql)
    }
      )
    .then(function (response) {
      // FQDN should come from azure cli output, but it has problem returnning valid json output, https://github.com/Azure/azure-xplat-cli/issues/2049
      // So let's concat ourselves first wayliutododev.database.windows.net
      var sqlFQDN = config.sql.sqlServerName.value + '.database.windows.net';
      
      // now the sql connection
      sqlConn = 'Data Source=tcp:' + sqlFQDN
        + ',1433;Initial Catalog=' + config.sql.sqlDbName.value
        + ';User Id=' + config.sql.sqlServerAdminLogin.value
        + '@' + config.sql.sqlServerName.value
        + ';Password=' + config.sql.sqlServerAdminPassword.value + ';';

      console.log('Setting sqlConnection to Keyvault:', config.keyVault.vaultName, config.appName, sqlConn);
      return setKeyVault(config.keyVault.vaultName, config.appName, sqlConn)
    })
    .then(function (response) {
      console.log('Setting keyVault uri to webapp. Previous response', response);
      config.webapp.secretUri.value = response.id
      // reuse the external sqlConn for now
      config.webapp.sqlConn.value = sqlConn;
      return deployWebapp(config, config.webapp)
    })
    .catch(function (err) {
      console.error(err)
    })
    .done(function (response) {
      console.log('Completed', response)
    })
}

// deployWebapp(config, config.webapp)

// sqlConn = 'Data Source=tcp:' + 'xxx'
//         + ',1433;Initial Catalog=' + config.sql.sqlDbName.value
//         + ';User Id=' + config.sql.sqlServerAdminLogin.value
//         + '@' + config.sql.sqlServerName.value
//         + ';Password=' + config.sql.sqlServerAdminPassword.value + ';';
// setKeyVault(config.keyVault.vaultName, config.appName, sqlConn)
// .then(function(response)
//   {
//     console.log(response)
//   })
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

