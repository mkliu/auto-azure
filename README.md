AutoAzure 
==============
 Your Azure Automation   

# Install

```
npm install -g git+https://github.com/mkliu/auto-azure
```

# Usage
  ```
    Usage: AutoAzure -n samplewebsite --anyOtherParameter.supported newValueSuchAs --webapp.sku.value Premium
    
    Options:
      --name           Application name to create, used for website and sqlServer, make sure to avoid dup otherwise creation will fail  [required]
      --env            Environment, used for tagging and naming resources                                                               [default: "dev"]
      --resourceGroup  Resource Group                                                                                                   [default: "wayliutest"]
      --vaultName      key vault name                                                                                                   [default: "wayliukeyvault"]
      --location       Resource location                                                                                                [default: "East US"]
      --sqlUser        Password for sql server. Will generate one if not specified                                                      [default: "yaoguai"]
      --sqlPassword    Password for sql server. Will generate one if not specified
      --clientId       clientId to access Keyvault
      --clientSecret   clientSecret to access Keyvault
    
    Missing required arguments: name
    
  ```
  For example:
  ```
    autoazure --name newapp --resourceGroup testapp
  ```
  
  In addition to the parameters above, you could override ALL params defined in the config.js. For exampple, to override which repo to deploy, you could do:
  ```
    autoazure --name newapp --resourceGroup testapp --webapp.repoUrl.value=http://newlocation
  ```
  
  Here's a typical log, it finds out the resource group isn't created, go ahead and create one. Then proceed with the rest.
  ```
    ~/git/arm/auto-azure$ autoazure --name newapp --resourceGroup testapp
    Executing ==>  azure config mode arm
    Checking if resourceGroup testapp exists
    Executing ==>  azure group show testapp
    { [Error: Command failed: /bin/sh -c node /Users/wayliu/git/arm/azure-scripty/node_modules/azure-cli/bin/azure.js group show testapp --json
    Resource group 'testapp' could not be found.
    Error information has been recorded to /Users/wayliu/.azure/azure.err
    group show command failed
    
    ]
      killed: false,
      code: 1,
      signal: null,
      cmd: '/bin/sh -c node /Users/wayliu/git/arm/azure-scripty/node_modules/azure-cli/bin/azure.js group show testapp --json' }
    testapp  does not exists. Creating one
    Executing ==>  azure group create  --name testapp --location "East US"
    ResourceGroup creation succeeded.
    Creating sql
    Executing ==>  azure group deployment create  -g testapp -f "/Users/wayliu/git/arm/auto-azure/arm/sql/azuredeploy.json" --name newappdev150821_034425sql --parameters '{"environment":{"value":"dev"},"sqlDBEdition":{"value":"Web"},"sqlServerName":{"value":"newappdev"},"sqlDbName":{"value":"DemosDB"},"sqlServerAdminLogin":{"value":"yaoguai"},"sqlServerAdminPassword":{"value":"UdBlkQJWZXuBvyA"},"sqlServerLocation":{"value":"East US"}}'
   ```
   
   If ARM deployment fails, normally you see the following, it just tells you it failed without giving you the reason. And you need to open up Azure portal to figure out why:
   
   ```
    info:    Executing command group deployment create
    verbose: Initializing template configurations and parameters
    verbose: Creating a deployment
    info:    Created template deployment "test21"
    verbose: Waiting for deployment to complete
    error:   Deployment provisioning state was not successful
    data:    DeploymentName     : test21
    data:    ResourceGroupName  : wayliutest
    **data:    ProvisioningState  : Failed**
    data:    Timestamp          : 2015-08-19T07:14:13.4334547Z
    data:    Mode               : Incremental
    data:    Name                    Type          Value
    data:    ----------------------  ------------  ------------------------------------------------------------
    data:    environment             String        dev
    data:    siteName                String        wayliutodu
    data:    hostingPlanName         String        wayliusite
    data:    siteLocation            String        East US
    data:    sku                     String        Free
    data:    workerSize              String        0
    data:    repoUrl                 String        https://github.com/mkliu/ToDoApp
    data:    branch                  String        master
    data:    project                 String        ContosoUniversity\ContosoUniversity\ContosoUniversity.csproj
    data:    sqlServerName           String        wayliusql
    data:    sqlServerLocation       String        East US
    data:    sqlServerAdminLogin     String        wayliu
    data:    sqlServerAdminPassword  SecureString  undefined
    data:    sqlDbName               String        DemosDB
    data:    sqlDbCollation          String        SQL_Latin1_General_CP1_CI_AS
    data:    sqlDbEdition            String        Web
    data:    sqlDbMaxSizeBytes       String        1073741824
    info:    group deployment create command OK
   ```
   
   But here we would automatically get ARM log when it fails, parse it and extract the key information to let you understand quickly why it fails, for example:
   ```
      time:       2015-08-21T10:25:04.237024Z
      level:      Error
      operation:  Update SQL server
      status:     Failed
      properties:
        statusCode:    BadRequest
        statusMessage: {"code":"BadRequest","message":"The property 'administratorLogin' is read-only and cannot be modified.","target":null,"details":[],"innererror":[]}
  ``` 
