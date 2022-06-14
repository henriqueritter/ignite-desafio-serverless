import { v4 as uuidV4 } from 'uuid';
import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from '../utils/dynamodbClient';

interface IRequestTodo {
  title: string;
  deadline: Date;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  //recupera user_id,title e deadline
  const body = JSON.parse(event.body);
  const { user_id } = event.pathParameters;
  const { title, deadline } = body as IRequestTodo;

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
      message: "Todo Created"
    })
  }
}