import { v4 as uuidV4 } from 'uuid';
import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from '../utils/dynamodbClient';
import { errorResponse } from '../utils/errorResponse';

interface IRequestTodo {
  title: string;
  deadline: Date;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  //valida os parametros
  if (!event.body || !JSON.parse(event.body).title || !JSON.parse(event.body).deadline) {
    return errorResponse(400, "Body must contain a title and a deadline properties.");
  }

  //recupera user_id,title e deadline
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as IRequestTodo;

  //cria no dynamodb
  await document.put({
    TableName: "todos",
    Item: {
      id: uuidV4(),
      user_id,
      title,
      done: false,
      deadline
    }
  }).promise();


  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo Created."
    })
  }
}