from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from app.config import settings
from app.api import auth, users, products, cart, orders

app = FastAPI(
    title=settings.APP_NAME,
    description="Quickdrip E-commerce API with secure authentication",
    version="1.0.0"
)

# Custom OpenAPI schema with security definitions
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title=settings.APP_NAME,
        version="1.0.0",
        description="Quickdrip E-commerce API with secure authentication",
        routes=app.routes,
    )
    
    # Add security scheme for Bearer token
    openapi_schema["components"]["securitySchemes"] = {
        "HTTPBearer": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": "Enter your JWT token obtained from /auth/login or /auth/verify-otp"
        }
    }
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(orders.router)


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Quickdrip API is running",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check for monitoring"""
    return {"status": "healthy"}
