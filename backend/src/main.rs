use lambda_http::{Body, Error, Request, Response, http::StatusCode, run, service_fn, tracing};
use serde_json::json;

fn json_response(status: StatusCode, body: serde_json::Value) -> Result<Response<Body>, Error> {
    Ok(Response::builder()
        .status(status)
        .header("content-type", "application/json")
        .body(body.to_string().into())?)
}

async fn handler(request: Request) -> Result<Response<Body>, Error> {
    match (request.method().as_str(), request.uri().path()) {
        ("OPTIONS", _) => Ok(Response::builder()
            .status(StatusCode::NO_CONTENT)
            .body(Body::Empty)?),
        ("GET", "/") => json_response(
            StatusCode::OK,
            json!({
                "name": "EdTracker API",
                "status": "ok",
                "health": "/health"
            }),
        ),
        ("GET", "/health") => json_response(
            StatusCode::OK,
            json!({
                "status": "healthy",
                "environment": std::env::var("APP_ENV").unwrap_or_else(|_| "local".into()),
                "database_configured": std::env::var_os("DATABASE_HOST").is_some(),
                "storage_configured": std::env::var_os("ASSETS_BUCKET").is_some()
            }),
        ),
        _ => json_response(StatusCode::NOT_FOUND, json!({ "error": "not_found" })),
    }
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();
    run(service_fn(handler)).await
}
