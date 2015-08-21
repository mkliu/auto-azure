var scripty = require('azure-scripty');
var moment = require('moment');
var _ = require('lodash');
var prettyjson = require('prettyjson');
var console = require('better-console');

module.exports.showDeploymentLog = function (resourceGroup, deploymentName) {
    scripty.invoke(
        {
            command: 'group log show',
            name: resourceGroup,
            deployment: deploymentName
        }, function (err, response) {
            if (!err) {
                // response = loadTestData();
                formatAndDisplayLog(response);
            }
            else {
                console.error("Can't retrieve deployment log.")
            }
        }
        )
}

function formatAndDisplayLog(response) {
    var messages = _.map(response, function (obj) {
        return {
            time: obj.eventTimestamp,
            // time: moment(obj.eventTimestamp).fromNow(),
            level: obj.level,
            operation: obj.operationName.localizedValue,
            status: obj.status.localizedValue,
            properties: obj.properties
        }
    })
    var sortedMsg = _.sortBy(messages, 'time')
    console.log(prettyjson.render(sortedMsg));
}
function logMock() {
    return [
        {
            "claims": {
                "aud": "https://management.core.windows.net/",
                "iss": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "iat": "1440136024",
                "nbf": "1440136024",
                "exp": "1440139924",
                "ver": "1.0",
                "http://schemas.microsoft.com/identity/claims/tenantid": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                "http://schemas.microsoft.com/identity/claims/objectidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.microsoft.com/identity/claims/identityprovider": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "appid": "28952766-ac96-43eb-900d-d896c54860c9",
                "appidacr": "1"
            },
            "properties": {},
            "authorization": {
                "action": "Microsoft.Resources/subscriptions/resourcegroups/deployments/write",
                "role": "Subscription Admin",
                "scope": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/deployments/wayliutododev150820_225154sql"
            },
            "eventChannels": "Operation",
            "eventDataId": "94641803-fc89-41a3-8c15-979b75dccc68",
            "correlationId": "3e0038df-c63f-4074-899d-f6905b769343",
            "eventName": {
                "value": "EndRequest",
                "localizedValue": "End request"
            },
            "eventSource": {
                "value": "Administrative",
                "localizedValue": "Administrative"
            },
            "level": "Error",
            "resourceGroupName": "wayliu",
            "resourceProviderName": {
                "value": "Microsoft.Resources",
                "localizedValue": "Microsoft Resources"
            },
            "resourceUri": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/deployments/wayliutododev150820_225154sql",
            "operationId": "0f9ccbba-78d0-4df8-ae63-647d59611544",
            "operationName": {
                "value": "Microsoft.Resources/subscriptions/resourcegroups/deployments/write",
                "localizedValue": "Update deployment"
            },
            "status": {
                "value": "Failed",
                "localizedValue": "Failed"
            },
            "subStatus": {},
            "eventTimestamp": "2015-08-21T05:53:14.2723951Z",
            "submissionTimestamp": "2015-08-21T05:53:30.4683047Z",
            "subscriptionId": "c2ffbbeb-af6c-484e-a00b-873d3582b8a0"
        },
        {
            "claims": {
                "aud": "https://management.core.windows.net/",
                "iss": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "iat": "1440136024",
                "nbf": "1440136024",
                "exp": "1440139924",
                "ver": "1.0",
                "http://schemas.microsoft.com/identity/claims/tenantid": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                "http://schemas.microsoft.com/identity/claims/objectidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.microsoft.com/identity/claims/identityprovider": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "appid": "28952766-ac96-43eb-900d-d896c54860c9",
                "appidacr": "1"
            },
            "properties": {
                "statusCode": "Conflict",
                "statusMessage": "{\"code\":\"40652\",\"message\":\"Cannot move or create server. Subscription 'c2ffbbeb-af6c-484e-a00b-873d3582b8a0' will exceed server quota.\",\"target\":null,\"details\":[{\"code\":\"40652\",\"message\":\"Cannot move or create server. Subscription 'c2ffbbeb-af6c-484e-a00b-873d3582b8a0' will exceed server quota.\",\"target\":null,\"severity\":\"16\"}],\"innererror\":[]}"
            },
            "authorization": {
                "action": "Microsoft.Sql/servers/write",
                "role": "Subscription Admin",
                "scope": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/providers/Microsoft.Sql/servers/wayliutododev"
            },
            "eventChannels": "Operation",
            "eventDataId": "99261718-00f1-4675-8bca-8f7e78be1a33",
            "correlationId": "3e0038df-c63f-4074-899d-f6905b769343",
            "eventName": {
                "value": "EndRequest",
                "localizedValue": "End request"
            },
            "eventSource": {
                "value": "Administrative",
                "localizedValue": "Administrative"
            },
            "level": "Error",
            "resourceGroupName": "wayliu",
            "resourceProviderName": {
                "value": "Microsoft.Sql",
                "localizedValue": "Microsoft SQL"
            },
            "resourceUri": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/providers/Microsoft.Sql/servers/wayliutododev",
            "operationId": "c2c8e309-fe57-4b33-a7cb-d6534b4e420d",
            "operationName": {
                "value": "Microsoft.Sql/servers/write",
                "localizedValue": "Update SQL server"
            },
            "status": {
                "value": "Failed",
                "localizedValue": "Failed"
            },
            "subStatus": {},
            "eventTimestamp": "2015-08-21T05:53:12.2370698Z",
            "submissionTimestamp": "2015-08-21T05:53:30.4683047Z",
            "subscriptionId": "c2ffbbeb-af6c-484e-a00b-873d3582b8a0"
        },
        {
            "claims": {
                "aud": "https://management.core.windows.net/",
                "iss": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "iat": "1440136024",
                "nbf": "1440136024",
                "exp": "1440139924",
                "ver": "1.0",
                "http://schemas.microsoft.com/identity/claims/tenantid": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                "http://schemas.microsoft.com/identity/claims/objectidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.microsoft.com/identity/claims/identityprovider": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "appid": "28952766-ac96-43eb-900d-d896c54860c9",
                "appidacr": "1"
            },
            "properties": {
                "statusCode": "Conflict",
                "serviceRequestId": "c642a1be-0bc1-41cb-925b-58fb686ca4d8",
                "statusMessage": "{\"code\":\"40652\",\"message\":\"Cannot move or create server. Subscription 'c2ffbbeb-af6c-484e-a00b-873d3582b8a0' will exceed server quota.\",\"target\":null,\"details\":[{\"code\":\"40652\",\"message\":\"Cannot move or create server. Subscription 'c2ffbbeb-af6c-484e-a00b-873d3582b8a0' will exceed server quota.\",\"target\":null,\"severity\":\"16\"}],\"innererror\":[]}"
            },
            "authorization": {
                "action": "Microsoft.Sql/servers/write",
                "role": "Subscription Admin",
                "scope": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/providers/Microsoft.Sql/servers/wayliutododev"
            },
            "eventChannels": "Operation",
            "eventDataId": "dd54cdc6-3bfb-402f-9ec4-e12e047e1e92",
            "correlationId": "3e0038df-c63f-4074-899d-f6905b769343",
            "eventName": {
                "value": "EndRequest",
                "localizedValue": "End request"
            },
            "eventSource": {
                "value": "Administrative",
                "localizedValue": "Administrative"
            },
            "httpRequest": {
                "clientRequestId": "8ec90bc9-55db-41e3-a2e2-e8bae4044d3f",
                "clientIpAddress": "50.149.110.143",
                "method": "PUT"
            },
            "level": "Error",
            "resourceGroupName": "wayliu",
            "resourceProviderName": {
                "value": "Microsoft.Sql",
                "localizedValue": "Microsoft SQL"
            },
            "resourceUri": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/providers/Microsoft.Sql/servers/wayliutododev",
            "operationId": "a1da4202-a632-486a-877a-c38299c2519e",
            "operationName": {
                "value": "Microsoft.Sql/servers/write",
                "localizedValue": "Update SQL server"
            },
            "status": {
                "value": "Failed",
                "localizedValue": "Failed"
            },
            "subStatus": {
                "value": "Conflict",
                "localizedValue": "Conflict (HTTP Status Code: 409)"
            },
            "eventTimestamp": "2015-08-21T05:53:12.1745698Z",
            "submissionTimestamp": "2015-08-21T05:53:30.4683047Z",
            "subscriptionId": "c2ffbbeb-af6c-484e-a00b-873d3582b8a0"
        },
        {
            "claims": {
                "aud": "https://management.core.windows.net/",
                "iss": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "iat": "1440136024",
                "nbf": "1440136024",
                "exp": "1440139924",
                "ver": "1.0",
                "http://schemas.microsoft.com/identity/claims/tenantid": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                "http://schemas.microsoft.com/identity/claims/objectidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.microsoft.com/identity/claims/identityprovider": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "appid": "28952766-ac96-43eb-900d-d896c54860c9",
                "appidacr": "1"
            },
            "properties": {},
            "authorization": {
                "action": "Microsoft.Sql/servers/write",
                "role": "Subscription Admin",
                "scope": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/providers/Microsoft.Sql/servers/wayliutododev"
            },
            "eventChannels": "Operation",
            "eventDataId": "586c930c-6627-4380-b23d-71d842191fab",
            "correlationId": "3e0038df-c63f-4074-899d-f6905b769343",
            "eventName": {
                "value": "BeginRequest",
                "localizedValue": "Begin request"
            },
            "eventSource": {
                "value": "Administrative",
                "localizedValue": "Administrative"
            },
            "httpRequest": {
                "clientRequestId": "8ec90bc9-55db-41e3-a2e2-e8bae4044d3f",
                "clientIpAddress": "50.149.110.143",
                "method": "PUT"
            },
            "level": "Informational",
            "resourceGroupName": "wayliu",
            "resourceProviderName": {
                "value": "Microsoft.Sql",
                "localizedValue": "Microsoft SQL"
            },
            "resourceUri": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/providers/Microsoft.Sql/servers/wayliutododev",
            "operationId": "a1da4202-a632-486a-877a-c38299c2519e",
            "operationName": {
                "value": "Microsoft.Sql/servers/write",
                "localizedValue": "Update SQL server"
            },
            "status": {
                "value": "Started",
                "localizedValue": "Started"
            },
            "subStatus": {},
            "eventTimestamp": "2015-08-21T05:53:10.2682385Z",
            "submissionTimestamp": "2015-08-21T05:53:30.4683047Z",
            "subscriptionId": "c2ffbbeb-af6c-484e-a00b-873d3582b8a0"
        },
        {
            "claims": {
                "aud": "https://management.core.windows.net/",
                "iss": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "iat": "1440136024",
                "nbf": "1440136024",
                "exp": "1440139924",
                "ver": "1.0",
                "http://schemas.microsoft.com/identity/claims/tenantid": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                "http://schemas.microsoft.com/identity/claims/objectidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.microsoft.com/identity/claims/identityprovider": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "appid": "28952766-ac96-43eb-900d-d896c54860c9",
                "appidacr": "1"
            },
            "properties": {
                "statusCode": "ServiceUnavailable",
                "serviceRequestId": "a0d45c54-0cd0-4d71-b94c-c708b8c52021",
                "statusMessage": "{\"code\":\"ServiceUnavailable\",\"message\":\"The server is currently too busy.  Please try again later.\",\"target\":null,\"details\":[],\"innererror\":[]}"
            },
            "authorization": {
                "action": "Microsoft.Sql/servers/write",
                "role": "Subscription Admin",
                "scope": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/providers/Microsoft.Sql/servers/wayliutododev"
            },
            "eventChannels": "Operation",
            "eventDataId": "f1efa541-f055-49e8-b826-a19187c866b6",
            "correlationId": "3e0038df-c63f-4074-899d-f6905b769343",
            "eventName": {
                "value": "EndRequest",
                "localizedValue": "End request"
            },
            "eventSource": {
                "value": "Administrative",
                "localizedValue": "Administrative"
            },
            "httpRequest": {
                "clientRequestId": "ebda71af-a572-4acd-8626-c14ffb7a8579",
                "clientIpAddress": "50.149.110.143",
                "method": "PUT"
            },
            "level": "Error",
            "resourceGroupName": "wayliu",
            "resourceProviderName": {
                "value": "Microsoft.Sql",
                "localizedValue": "Microsoft SQL"
            },
            "resourceUri": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/providers/Microsoft.Sql/servers/wayliutododev",
            "operationId": "dcc58fe2-5843-44be-8a7a-ae9770906acb",
            "operationName": {
                "value": "Microsoft.Sql/servers/write",
                "localizedValue": "Update SQL server"
            },
            "status": {
                "value": "Failed",
                "localizedValue": "Failed"
            },
            "subStatus": {
                "value": "ServiceUnavailable",
                "localizedValue": "Service Unavailable (HTTP Status Code:503)"
            },
            "eventTimestamp": "2015-08-21T05:52:09.6947559Z",
            "submissionTimestamp": "2015-08-21T05:52:30.5106257Z",
            "subscriptionId": "c2ffbbeb-af6c-484e-a00b-873d3582b8a0"
        },
        {
            "claims": {
                "aud": "https://management.core.windows.net/",
                "iss": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "iat": "1440136024",
                "nbf": "1440136024",
                "exp": "1440139924",
                "ver": "1.0",
                "http://schemas.microsoft.com/identity/claims/tenantid": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                "http://schemas.microsoft.com/identity/claims/objectidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.microsoft.com/identity/claims/identityprovider": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "appid": "28952766-ac96-43eb-900d-d896c54860c9",
                "appidacr": "1"
            },
            "properties": {},
            "authorization": {
                "action": "Microsoft.Sql/servers/write",
                "role": "Subscription Admin",
                "scope": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/providers/Microsoft.Sql/servers/wayliutododev"
            },
            "eventChannels": "Operation",
            "eventDataId": "a393c58f-ec09-41b3-8c21-695f325c7492",
            "correlationId": "3e0038df-c63f-4074-899d-f6905b769343",
            "eventName": {
                "value": "BeginRequest",
                "localizedValue": "Begin request"
            },
            "eventSource": {
                "value": "Administrative",
                "localizedValue": "Administrative"
            },
            "httpRequest": {
                "clientRequestId": "ebda71af-a572-4acd-8626-c14ffb7a8579",
                "clientIpAddress": "50.149.110.143",
                "method": "PUT"
            },
            "level": "Informational",
            "resourceGroupName": "wayliu",
            "resourceProviderName": {
                "value": "Microsoft.Sql",
                "localizedValue": "Microsoft SQL"
            },
            "resourceUri": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/providers/Microsoft.Sql/servers/wayliutododev",
            "operationId": "dcc58fe2-5843-44be-8a7a-ae9770906acb",
            "operationName": {
                "value": "Microsoft.Sql/servers/write",
                "localizedValue": "Update SQL server"
            },
            "status": {
                "value": "Started",
                "localizedValue": "Started"
            },
            "subStatus": {},
            "eventTimestamp": "2015-08-21T05:52:08.7938731Z",
            "submissionTimestamp": "2015-08-21T05:52:30.5106257Z",
            "subscriptionId": "c2ffbbeb-af6c-484e-a00b-873d3582b8a0"
        },
        {
            "claims": {
                "aud": "https://management.core.windows.net/",
                "iss": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "iat": "1440136024",
                "nbf": "1440136024",
                "exp": "1440139924",
                "ver": "1.0",
                "http://schemas.microsoft.com/identity/claims/tenantid": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                "http://schemas.microsoft.com/identity/claims/objectidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.microsoft.com/identity/claims/identityprovider": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "appid": "28952766-ac96-43eb-900d-d896c54860c9",
                "appidacr": "1"
            },
            "properties": {
                "statusCode": "Created",
                "serviceRequestId": null
            },
            "authorization": {
                "action": "Microsoft.Resources/subscriptions/resourcegroups/deployments/write",
                "role": "Subscription Admin",
                "scope": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/deployments/wayliutododev150820_225154sql"
            },
            "eventChannels": "Operation",
            "eventDataId": "dc79fd55-b920-49ac-9e79-ec78118eb2ed",
            "correlationId": "3e0038df-c63f-4074-899d-f6905b769343",
            "eventName": {
                "value": "EndRequest",
                "localizedValue": "End request"
            },
            "eventSource": {
                "value": "Administrative",
                "localizedValue": "Administrative"
            },
            "httpRequest": {
                "clientIpAddress": "50.149.110.143",
                "method": "PUT"
            },
            "level": "Informational",
            "resourceGroupName": "wayliu",
            "resourceProviderName": {
                "value": "Microsoft.Resources",
                "localizedValue": "Microsoft Resources"
            },
            "resourceUri": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/deployments/wayliutododev150820_225154sql",
            "operationId": "3e0038df-c63f-4074-899d-f6905b769343",
            "operationName": {
                "value": "Microsoft.Resources/subscriptions/resourcegroups/deployments/write",
                "localizedValue": "Update deployment"
            },
            "status": {
                "value": "Succeeded",
                "localizedValue": "Succeeded"
            },
            "subStatus": {
                "value": "Created",
                "localizedValue": "Created (HTTP Status Code: 201)"
            },
            "eventTimestamp": "2015-08-21T05:52:05.6190997Z",
            "submissionTimestamp": "2015-08-21T05:52:21.2444061Z",
            "subscriptionId": "c2ffbbeb-af6c-484e-a00b-873d3582b8a0"
        },
        {
            "claims": {
                "aud": "https://management.core.windows.net/",
                "iss": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "iat": "1440136024",
                "nbf": "1440136024",
                "exp": "1440139924",
                "ver": "1.0",
                "http://schemas.microsoft.com/identity/claims/tenantid": "72f988bf-86f1-41af-91ab-2d7cd011db47",
                "http://schemas.microsoft.com/identity/claims/objectidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "95c9c95f-4adb-4ae9-a79c-625fbde6cbe4",
                "http://schemas.microsoft.com/identity/claims/identityprovider": "https://sts.windows.net/72f988bf-86f1-41af-91ab-2d7cd011db47/",
                "appid": "28952766-ac96-43eb-900d-d896c54860c9",
                "appidacr": "1"
            },
            "properties": {},
            "authorization": {
                "action": "Microsoft.Resources/subscriptions/resourcegroups/deployments/write",
                "role": "Subscription Admin",
                "scope": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/deployments/wayliutododev150820_225154sql"
            },
            "eventChannels": "Operation",
            "eventDataId": "860ede36-cd97-4732-ada1-ef4ed57c19ab",
            "correlationId": "3e0038df-c63f-4074-899d-f6905b769343",
            "eventName": {
                "value": "BeginRequest",
                "localizedValue": "Begin request"
            },
            "eventSource": {
                "value": "Administrative",
                "localizedValue": "Administrative"
            },
            "httpRequest": {
                "clientIpAddress": "50.149.110.143",
                "method": "PUT"
            },
            "level": "Informational",
            "resourceGroupName": "wayliu",
            "resourceProviderName": {
                "value": "Microsoft.Resources",
                "localizedValue": "Microsoft Resources"
            },
            "resourceUri": "/subscriptions/c2ffbbeb-af6c-484e-a00b-873d3582b8a0/resourcegroups/wayliu/deployments/wayliutododev150820_225154sql",
            "operationId": "3e0038df-c63f-4074-899d-f6905b769343",
            "operationName": {
                "value": "Microsoft.Resources/subscriptions/resourcegroups/deployments/write",
                "localizedValue": "Update deployment"
            },
            "status": {
                "value": "Started",
                "localizedValue": "Started"
            },
            "subStatus": {},
            "eventTimestamp": "2015-08-21T05:52:04.3083227Z",
            "submissionTimestamp": "2015-08-21T05:52:21.2444061Z",
            "subscriptionId": "c2ffbbeb-af6c-484e-a00b-873d3582b8a0"
        }
    ]
}