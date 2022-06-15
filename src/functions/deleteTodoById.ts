import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";
import { errorResponse } from "src/utils/errorResponse";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { todo_id } = event.pathParameters;

  const response = await document.query({
    TableName: "todos",
    KeyConditionExpression: "id=:todo_id",
    ExpressionAttributeValues: {
      ":todo_id": todo_id
    }
  }).promise();

  if (!response.Items[0]) {
    return errorResponse(400, "Todo not Found!");
  }

  await document.delete({
    TableName: "todos",
    Key: {
      id: todo_id
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Todo deleted."
    })
  }
}