# Todo Now Fullstack

A full-stack todo application built with Angular (frontend) and ASP.NET Core (backend), deployed to Azure App Service.

## 🌐 Live Application

**Frontend:** https://todo-now-gveva8cbaqffe9gr.canadacentral-01.azurewebsites.net/

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download)
- **Node.js 18.x or higher** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Azure Cosmos DB account** (for database)

## 🔒 Security Note: Why No Connection String in Repository

**Important:** The Cosmos DB connection string is intentionally **not included** in this repository for security reasons:

- Connection strings contain sensitive credentials (AccountKey) that provide full access to your Cosmos DB account
- Following the assignment requirement: **"no secrets in Git"**
- Security best practice: Never commit secrets, API keys, or credentials to version control
- Each developer must configure their own connection string using user secrets or environment variables

The `appsettings.json` file contains an empty connection string placeholder - you must configure it locally.

## 🎯 First Run Flow

Follow these steps to get the application running on a fresh machine:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-now-fullstack
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   dotnet restore src/TodoApi.csproj
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Configure environment variables / secrets**
   ```bash
   cd ../backend
   # Initialize user secrets (first time only)
   dotnet user-secrets init --project src/TodoApi.csproj
   
   # Set your Cosmos DB connection string
   dotnet user-secrets set "CosmosDb:ConnectionString" "AccountEndpoint=...;AccountKey=...;" --project src/TodoApi.csproj
   ```

4. **Run the backend**
   ```bash
   dotnet run --project src/TodoApi.csproj
   # Backend will be available at http://localhost:5000
   ```

5. **Run the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm start
   # Frontend will be available at http://localhost:4200
   ```

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo-now-fullstack
```

### 2. Backend Setup

```bash
cd backend
dotnet restore src/TodoApi.csproj
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## 🏃 Running Locally

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure Cosmos DB connection string using user secrets:
   ```bash
   # Initialize user secrets (first time only)
   dotnet user-secrets init --project src/TodoApi.csproj
   
   # Set your connection string
   dotnet user-secrets set "CosmosDb:ConnectionString" "AccountEndpoint=https://your-account.documents.azure.com:443/;AccountKey=your-key-here;" --project src/TodoApi.csproj
   ```
   
   **Note:** User secrets are stored outside the project directory and never committed to Git, ensuring your credentials remain secure.
   
   **Alternative (Development Only):** You can also set it in `appsettings.json` (located at `backend/appsettings.json`), but **do not commit** the actual connection string:
   ```json
   {
     "CosmosDb": {
       "ConnectionString": ""  // Leave empty, use user secrets instead
     }
   }
   ```

3. Run the backend:
   ```bash
   dotnet run --project src/TodoApi.csproj
   ```

   The API will be available at: `http://localhost:5000`

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   
   Or using Angular CLI:
   ```bash
   ng serve
   ```

3. Open your browser and navigate to: `http://localhost:4200`

   The frontend will automatically connect to the backend API at `http://localhost:5000`

## 🔌 Frontend-Backend Connection

### How It Works

The frontend connects to the backend using environment-specific configuration:

- **Development** (`environment.ts`): Points to `http://localhost:5000`
- **Production** (`environment.prod.ts`): Points to the deployed Azure App Service URL

### Customizing the API URL

To connect to a different backend, edit the appropriate environment file:

**Development:**
```typescript
// frontend/src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'  // Change this to your backend URL
}
```

**Production:**
```typescript
// frontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.azurewebsites.net'
}
```

### Port Configuration

- **Frontend:** Runs on `http://localhost:4200` (Angular default)
- **Backend:** Runs on `http://localhost:5000` (configured in `launchSettings.json`)

### CORS Configuration

In development, CORS is configured to allow `http://localhost:4200` to call the backend API. In production, both frontend and backend are served from the same domain, so CORS is not required.

## ⚙️ Environment Variables Configuration

### Backend Environment Variables

The backend uses the following configuration:

#### Development (User Secrets)

**First-time setup:**
```bash
cd backend
dotnet user-secrets init --project src/TodoApi.csproj
```

**Set connection string:**
```bash
dotnet user-secrets set "CosmosDb:ConnectionString" "AccountEndpoint=...;AccountKey=...;"
```

**Why user secrets?** User secrets are stored outside the project directory and never committed to Git, ensuring your credentials remain secure.

#### Alternative: appsettings.json (Development Only)

You can also set it in `appsettings.json` (located at `backend/appsettings.json`), but **do not commit** the actual connection string:
```json
{
  "CosmosDb": {
    "ConnectionString": ""  // Leave empty, use user secrets instead
  }
}
```

#### Production (Azure App Settings)

In Azure Portal → App Service → Environment variables → App settings → Add:
- **Name:** `CosmosDb__ConnectionString` (use double underscore `__`, which .NET converts to `:`)
- **Value:** Your Cosmos DB connection string

### Frontend Environment Variables

The frontend uses environment files located in `frontend/src/environments/`:

#### Development (`environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
}
```

#### Production (`environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://todo-now-gveva8cbaqffe9gr.canadacentral-01.azurewebsites.net'
}
```

**Note:** In production, the frontend is served from the same Azure App Service as the backend (via `wwwroot`), so both frontend and API share the same domain. This eliminates CORS issues and simplifies deployment.

The production build automatically uses `environment.prod.ts` when building with:
```bash
ng build --configuration production
```

## 📁 Project Structure

```
todo-now-fullstack/
├── backend/
│   ├── src/
│   │   ├── Controllers/     # API controllers
│   │   ├── Models/          # Data models
│   │   ├── Services/        # Business logic
│   │   └── Program.cs       # Application entry point
│   └── appsettings.json     # Configuration
├── frontend/
│   ├── src/
│   │   ├── app/            # Angular application
│   │   ├── assets/          # Static assets
│   │   └── environments/   # Environment configurations
│   └── angular.json         # Angular configuration
└── .github/
    └── workflows/           # CI/CD workflows
```

## 🛠️ Technology Stack

- **Frontend:** Angular 19, TypeScript, SCSS
- **Backend:** ASP.NET Core 8.0, C#
- **Database:** Azure Cosmos DB
- **Deployment:** Azure App Service
- **CI/CD:** GitHub Actions

## 📝 API Endpoints

- `GET /todos` - Get all todos
- `GET /todos/{id}` - Get a specific todo
- `POST /todos` - Create a new todo
- `PUT /todos/{id}` - Update a todo
- `DELETE /todos/{id}` - Delete a todo

### X-User-Id Header

All endpoints support multi-user isolation using the `X-User-Id` header:

- **Purpose:** Enables multi-user support by using `userId` as the Cosmos DB partition key
- **Usage:** 
  - Send as HTTP header: `X-User-Id: your-user-id`
  - Or as query parameter: `?userId=your-user-id`
  - If neither is provided, defaults to `"demo"` for development/testing
- **Production:** In a real application, this should be set based on authenticated user session
- **Default behavior:** When the header is missing, the API automatically uses `"demo"` as the userId

Example request:
```bash
curl -H "X-User-Id: alice" http://localhost:5000/todos
```

## 🚀 Deployment

The application is automatically deployed to Azure via GitHub Actions when changes are pushed to the `main` branch.

**Architecture:** The frontend is built and copied to the backend's `wwwroot` directory, so both are served from the same Azure App Service instance. This means:
- Single deployment endpoint
- No CORS configuration needed in production
- Simplified infrastructure

The deployment process:
1. Builds the Angular frontend
2. Copies frontend files to backend `wwwroot`
3. Builds and publishes the .NET backend
4. Deploys to Azure App Service
