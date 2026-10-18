# Hosting Architecture

This project will be hosted on AWS using a simple serverless-oriented architecture.

## Architecture

```text
Users
  |
  v
AWS Amplify Hosting
- Hosts React frontend
- Provides HTTPS
- Can use CloudFront CDN
  |
  v
Amazon API Gateway
- Exposes backend API endpoints
  |
  v
AWS Lambda
- Runs Rust backend
- Handles API requests and business logic
  |
  +--------------------+
  |                    |
  v                    v
Amazon RDS          Amazon S3
- PostgreSQL        - File/image storage
- Application data - Uploaded assets/files
```

## AWS Services Used

| Service | Purpose |
|---|---|
| AWS Amplify Hosting | Host the React frontend |
| Amazon API Gateway | Route frontend API requests to the backend |
| AWS Lambda | Run the Rust backend |
| Amazon RDS | Store relational application data |
| Amazon S3 | Store uploaded files, images, or other objects |
| Amazon CloudWatch | View backend logs and monitor Lambda/API errors |

## Request Flow

1. User opens the React application hosted on AWS Amplify.
2. React sends HTTPS requests to Amazon API Gateway.
3. API Gateway forwards requests to the Rust backend running on AWS Lambda.
4. The backend reads or writes application data in Amazon RDS.
5. Files and images are stored in Amazon S3.
6. Logs and errors can be viewed through Amazon CloudWatch.

## Proposed Stack

- **Frontend:** React
- **Backend:** Rust
- **Database:** PostgreSQL on Amazon RDS
- **File Storage:** Amazon S3
- **Backend Hosting:** AWS Lambda
- **Frontend Hosting:** AWS Amplify Hosting
- **API:** Amazon API Gateway
- **Monitoring:** Amazon CloudWatch

## Summary

The architecture is designed to keep hosting simple and inexpensive for an MVP.

```text
React
  |
Amplify
  |
API Gateway
  |
Rust Lambda
  |
  +--> RDS PostgreSQL
  |
  +--> S3
```
