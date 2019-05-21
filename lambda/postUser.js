const randomBytes = require('crypto').randomBytes;
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();;

exports.handler = (event, context, callback) => {
    // TODO: AWS cognito check authentication here
    // if (!event.requestContext.authorizer) {
    //   errorResponse('Authorization not configured', context.awsRequestId, callback);
    //   return;
    // }

    const uuid = toUrlString(randomBytes(16));
    console.log('Received event (', uuid, '): ', event);
    
    const requestBody = JSON.parse(event.body);
    
    let user;
    if(requestBody) {
      user = requestBody;
    } else {
      user = {}
    }

    postUser(uuid, user).then(() => {
        callback(null, {
            statusCode: 201,
            body: JSON.stringify({
                statusCode: '201',
                message: 'success'
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);
        errorResponse(err.message, context.awsRequestId, callback)
    });
};

function postUser(uuid, user) {
    return ddb.put({
        TableName: 'Users',
        Item: {
            UserId: uuid,
            Gender: user.gender,
            Name: user.name,
            Location: user.location,
            Email: user.email, 
            User: user.username,
            Login: user.login,
            DOB: user.dob,
            Registered: user.registered,
            Phone: user.phone,
            Cell: user.cell,
            Id: user.id,
            Picture: user.picture,
            Nat: user.nat,
            RequestTime: new Date().toISOString(),
        },
    }).promise();
}

// function from aws example
function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
