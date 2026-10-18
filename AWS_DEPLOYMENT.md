# AWS deployment

This repository uses AWS SAM for the Rust API and an Amplify build specification
for the React frontend. The deployment is configured for account `857196482054`
in Singapore (`ap-southeast-1`).

## Resources

The SAM stack creates:

- an API Gateway HTTP API and `$default` stage;
- the Rust Lambda function;
- an S3 gateway VPC endpoint on the existing VPC route table;
- CloudWatch access and function log groups.

It reuses these existing resources rather than replacing them:

- RDS PostgreSQL instance `database-1`;
- private S3 bucket `msds-857196482054-ap-southeast-1-an`;
- the RDS VPC subnets and security group;
- pre-provisioned Lambda and CloudFormation execution roles.

Deleting the SAM stack does not delete the existing RDS instance or S3 bucket.
It does delete the stack-managed S3 gateway endpoint. The endpoint keeps S3
traffic private and does not require a NAT gateway; its policy is limited to
the configured assets bucket.

## Prerequisites

- AWS CLI v2 signed in as the scoped `edtracker-deployer` IAM user;
- AWS SAM CLI;
- Rust and Cargo Lambda;
- Zig on `PATH` for the ARM64 Rust Lambda build.

The checked-in `samconfig.toml` contains the development resource identifiers.
Use a separate configuration for another account, region, or environment.

## Deploy the backend

From the repository root:

```powershell
$env:Path = 'C:\Program Files\Zig;' + $env:Path
sam validate --lint
sam build
sam deploy --profile edtracker-dev
```

Get and test the API URL:

```powershell
$apiUrl = aws cloudformation describe-stacks `
  --stack-name edtracker-dev `
  --region ap-southeast-1 `
  --profile edtracker-dev `
  --query "Stacks[0].Outputs[?OutputKey=='ApiUrl'].OutputValue" `
  --output text

Invoke-RestMethod "$apiUrl/health"
```

`AllowedOrigin=*` is suitable only for the initial setup. After Amplify assigns
the frontend domain, set `AllowedOrigin` to that exact HTTPS origin and redeploy.

## Frontend hosting

The frontend is live at:

```text
https://main.d1fob4i4hsu1oz.amplifyapp.com
```

It is a manually deployed Amplify app. It does not require a GitHub access
token. A dedicated `edtracker-amplify-deployer` role can manage only this app,
its `main` branch, and that branch's deployment jobs.

To publish a new frontend build:

```powershell
aws login --profile edtracker-dev

Set-Location frontend
$env:VITE_API_BASE_URL = 'https://0cu1jmf5r7.execute-api.ap-southeast-1.amazonaws.com'
npm ci
npm run build
Set-Location ..

Remove-Item -LiteralPath '.amplify-deploy.zip' -Force -ErrorAction SilentlyContinue
tar.exe -a -c -f .amplify-deploy.zip -C frontend\dist assets favicon.svg icons.svg index.html

$deployment = aws amplify create-deployment `
  --app-id d1fob4i4hsu1oz `
  --branch-name main `
  --region ap-southeast-1 `
  --profile edtracker-amplify `
  --output json | ConvertFrom-Json

curl.exe --fail --upload-file .amplify-deploy.zip $deployment.zipUploadUrl

aws amplify start-deployment `
  --app-id d1fob4i4hsu1oz `
  --branch-name main `
  --job-id $deployment.jobId `
  --region ap-southeast-1 `
  --profile edtracker-amplify
```

Use `tar.exe` as shown so ZIP entries use forward slashes. Windows
`Compress-Archive` stores nested paths with backslashes, which causes Amplify
to publish root files but miss nested `assets/` files.

The Amplify SPA rewrite in `infrastructure/amplify/custom-rules.json` excludes
static file extensions so JavaScript and CSS are served with their correct MIME
types. The API CORS configuration allows only the exact Amplify HTTPS origin.

`VITE_API_BASE_URL` is browser-visible configuration. Never place passwords or
AWS credentials in a `VITE_` variable.

## Current backend scope

The Rust Lambda currently implements `/` and `/health`. The RDS and S3 resource
details are supplied as environment variables, but application database and
object-storage operations have not yet been implemented.

The existing RDS master password was not read, changed, or copied into this
repository. Before adding database queries, store application credentials in
AWS Secrets Manager and grant the Lambda access only to that exact secret.

CloudWatch retains Lambda and API access logs for 14 days. The Lambda runs in
the existing VPC subnets, uses the existing RDS security group, and reaches the
assets bucket through S3 gateway endpoint `vpce-00afa790b964b7c70`.

Account-specific, non-secret operational values are recorded in the git-ignored
`deployment-inventory.local.env`. AWS passwords, access keys, session tokens,
and database passwords must never be added to it. CLI sessions are obtained
interactively with `aws login`; application database credentials should be
stored in AWS Secrets Manager.
