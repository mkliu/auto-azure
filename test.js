var scripty = require('azure-scripty');

// New-AzureKeyVault -VaultName 'WayliuContosoKeyVault' -ResourceGroupName 'ContosoResourceGroup' -Location 'East Asia'
// $key = Add-AzureKeyVaultKey -VaultName 'WayliuContosoKeyVault' -Name 'ContosoFirstKey' -Destination 'Software'

// $secretvalue = ConvertTo-SecureString 'Pa$$w0rd' -AsPlainText -Force
// $secret = Set-AzureKeyVaultSecret -VaultName 'wayliuContosoKeyVault' -Name 'SQLPassword' -SecretValue $secretvalue 
// Get-AzureKeyVaultSecret -VaultName 'wayliuContosoKeyVault' 

// azure login -u 28952766-ac96-43eb-900d-d896c54860c9 --service-principal --tenant 72f988bf-86f1-41af-91ab-2d7cd011db47
 
 var environmentType = "dev";
 var deployName = "wayliutodo" + environmentType;
 var path = require('path')
 
var location = "East US";

 var config = 
 {
   deployName: deployName,
   keyVaultName: "wayliukeyvault",
   environment: environmentType,
   siteName: deployName,
   siteLocation: location,
   sku: "Free",
   workerSize: 0,
   repoUrl: "https://github.com/mkliu/ToDoApp",
   project: "ContosoUniversity\\ContosoUniversity\\ContosoUniversity.csproj",
   resourceGroup: "wayliu",
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
       value: deployName
     },
     sqlDbName:
     {
       value: 'DemosDB'
     },
     sqlServerAdminLogin:
     {
       value:"wayliu"
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

function deploySql(config, params, callback) {
  var sqlArmPath = path.resolve('arm', 'sql', 'azuredeploy.json')
  var cmd = {
    command: 'group deployment create',
    name: config.deployName,
    // parameters: '"' + JSON.stringify(params).replace(/"/g, '\\"') + '"',
    parameters: "'" + JSON.stringify(params) + "'",
    short:
    {
      g: config.resourceGroup,
      f: '"' + sqlArmPath + '"'
    }
  };
  
  scripty.invoke(cmd, callback)
}

deploySql(config, config.sql, function(err, response)
  {
    console.log(err, response)
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