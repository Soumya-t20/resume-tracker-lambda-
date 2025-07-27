# resume-tracker-lambda-
# 🎯 Resume Tracker – Serverless Job Application Logger

A simple, serverless resume/job application tracker built with AWS services. It allows users to submit job applications via API, stores them in DynamoDB, and sends confirmation emails using SES.

## 🚀 Features

- ✅ Submit job applications via REST API
- ✅ Store application data in DynamoDB
- ✅ Trigger email confirmation via AWS SES
- ✅ Built entirely using AWS Lambda, API Gateway, and SES
- 🛠️ Easily extendable with a frontend or analytics dashboard

---

## 🧰 Tech Stack

- **AWS Lambda** – Serverless function for handling logic
- **Amazon API Gateway** – HTTP endpoint for Lambda
- **DynamoDB** – NoSQL database for storing job application entries
- **Amazon SES** – Sends confirmation emails on job entry
- **Node.js** – Runtime for Lambda function

---

## 🧑‍💻 How It Works

1. A `POST` request is sent to the API Gateway endpoint with job data
2. Lambda validates the input
3. Stores the data in DynamoDB (`JobApplications` table)
4. Sends a confirmation email to the applicant via SES

---

🧑‍💻 How It Works

##**📬 SES Sandbox Note**
If you're using SES in sandbox mode:

You must verify the sender and recipient email addresses in SES

Alternatively, request production access in AWS support center

**✅ To-Do / Next Steps**
 Add a React or HTML frontend

 Add analytics dashboard (e.g., # of applications, status chart)

 Add login (AWS Cognito)

 Export data as CSV

 Deploy frontend with S3 or Netlify

👨‍💻 Author
Anthony Mary Thalapaneni
LinkedIn • GitHub
Built with ❤️ for learning and career growth
## 📝 Sample Request (Postman / curl)

**POST** to:  
https://03mkrkv4m7.execute-api.us-east-1.amazonaws.com/default/ResumeTrackerFunction

**Headers**:
```http
Content-Type: application/json
body:
{
  "userEmail": "soumya.thalapaneni@gmail.com",
  "company": "Amazon",
  "role": "SDE Intern",
  "status": "Applied",
  "notes": "Referred by Jane"
}


