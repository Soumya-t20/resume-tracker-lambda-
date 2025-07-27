import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const uuidv4 = () => crypto.randomUUID();
const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(ddbClient);
const sesClient = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const requiredFields = ["userEmail", "company", "role", "status"];
    for (let field of requiredFields) {
      if (!body[field]) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: `${field} is required` }),
        };
      }
    }

    const item = {
      userEmail: body.userEmail,
      applicationId: uuidv4(),
      company: body.company,
      role: body.role,
      status: body.status,
      appliedDate: body.appliedDate || new Date().toISOString().split("T")[0],
      notes: body.notes || "",
    };

    await docClient.send(
      new PutCommand({
        TableName: "JobApplications",
        Item: item,
      })
    );

    const emailParams = {
      Destination: {
        ToAddresses: [body.userEmail],
      },
      Message: {
        Subject: { Data: "✅ Job Application Logged!" },
        Body: {
          Text: {
            Data: `You applied to ${body.company} for ${body.role}.\nStatus: ${body.status}`,
          },
        },
      },
      Source: "anthonymarythalapaneni@gmail.com", // Change this to your verified SES email
    };

    await sesClient.send(new SendEmailCommand(emailParams));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success! Application logged and email sent." }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: err.message }),
    };
  }
};
