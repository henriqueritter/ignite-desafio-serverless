import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const response = await document.scan({
    TableName: "todos"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items)
  }
}