import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";
import { errorResponse } from '../utils/errorResponse';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { todo_id } = event.pathParameters;

  //recupera o todo
  const todo = await document.query({
    TableName: "todos",
    KeyConditionExpression: "id=:todo_id",
    ExpressionAttributeValues: {
      ":todo_id": todo_id
    }
  }).promise();

  //verifica se ele é valido
  if (!todo.Items[0]) {
    return errorResponse(400, "Todo not Found.")
  }

  //atualiza o todo para done true
  await document.put({
    TableName: "todos",
    Item: {
      id: todo.Items[0].id,
      user_id: todo.Items[0].user_id,
      title: todo.Items[0].title,
      done: true,
      deadline: todo.Items[0].deadline
    }
  }).promise();


  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Todo checked."
    })
  }
}