# Employee Offboarding System

This project is an Angular 19 application that manages the employee offboarding process, focusing on the return and management of company equipment.

## Features

- **Employee Dashboard**
  - View a list of all employees with their status
  - Search/filter employees by name or department
- **Employee Details**
  - View detailed employee information
  - View assigned equipment
- **Offboarding Process**
  - Process employee offboarding with form validation
  - Update employee status without page reload
  - Collect shipping address and contact information

## Environment Configuration

The application uses different environment configurations:

- **Development Mode**: Uses a mock API interceptor to simulate backend responses
- **Production Mode**: Connects to a real backend API (requires backend implementation)

Environment files are located in `src/environments/`:

- `environment.ts` - Used during development
- `environment.production.ts` - Used for production builds

## Setup and Running

1. Install dependencies:

```
npm install
```

2. Start the development server:

```
ng serve
```

3. Open your browser and navigate to `http://localhost:4200/`

## Building for Production

To build the application for production:

```
ng build --configuration=production
```

This will:

- Use the production environment configuration
- Disable the mock API interceptor
- Optimize the application for deployment

**Note**: You'll need to implement a real backend API or update the `apiUrl` in the production environment file.

## Mock API Endpoints

- `GET /employees` - Retrieves list of employees
- `GET /employees/{id}` - Retrieves a specific employee by ID
- `POST /users/{id}/offboard` - Offboards an employee with the provided details
