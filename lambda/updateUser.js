const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    // TODO: AWS cognito check authentication here

    const requestBody = JSON.parse(event.body);
    
    const UserId = requestBody.UserId;
    const first = requestBody.first;
    const last = requestBody.last;
    
    const response = updateUser(UserId, first, last).then(data => {
        callback(null, {
            statusCode: 200,
            headers: {
             'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'x-requested-with',
             "Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true,
            },
            body: JSON.stringify({
                statusCode: '200',
                message: 'update success'
            }),
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.id, callback);
    });
    
    return response;
};

function updateUser(UserId, first, last) {
    return ddb.update({
        TableName: 'Users',
        Key: {
            UserId
        },
        UpdateExpression: "set #Name.#first=:f, #Name.#last=:l",
        ExpressionAttributeValues: {
            ":f": first,
            ":l": last
        },
        ExpressionAttributeNames:{
            "#Name": "Name",
            "#first": "first",
            "#last": "last"
        },
        ReturnValues:"UPDATED_NEW"
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
