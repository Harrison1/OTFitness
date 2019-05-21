const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    const response = scanUsers().then(data => {
        callback(null, {
            statusCode: 200,
            headers: {
             'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'x-requested-with',
             "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true,
            },
            body: JSON.stringify(data),
        })
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.id, callback)
    })
    
    return response;
};

function scanUsers() {
    return ddb.scan({
        TableName: 'Users',
        Limit: 50
    }).promise();
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    headers: {
        'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'x-requested-with',
        "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true,
    },
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    })
  });
}
