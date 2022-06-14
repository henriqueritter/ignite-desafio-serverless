import { APIGatewayProxyHandler } from "aws-lambda";

const todos = [];

export const handler: APIGatewayProxyHandler = async (event) => {
  todos.push('1');
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo Created",
      todos
    })
  }
}