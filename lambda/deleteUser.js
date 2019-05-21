const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    // TODO: AWS cognito check authentication here
    // if (!event.requestContext.authorizer) {
    //   errorResponse('Authorization not configured', context.awsRequestId, callback);
    //   return;
    // }

    const requestBody = JSON.parse(event.body);
    
    const UserId = requestBody.UserId;
    
    const response = deleteUser(UserId).then(data => {
        callback(null, {
            statusCode: 200,
            headers: {
             'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'x-requested-with',
             "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true,
            },
            body: JSON.stringify({
                statusCode: '200',
                message: 'delete success'
            }),
        })
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.id, callback)
    })
    
    return response;
};

function deleteUser(UserId) {
    return ddb.delete({
        TableName: 'Users',
        Key: {
            UserId: UserId
        }
    }).promise();
}

function errorResponse(errorMessage, id, callback) {
  callback(null, {
    statusCode: 500,
    headers: {
        'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'x-requested-with',
        "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true,
    },
    body: JSON.stringify({
      Error: errorMessage,
      Reference: id,
    })
  });
}
