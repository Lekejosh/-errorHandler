# @errorhandler/middleware

## Description

`@errorhandler/middleware` is a middleware package designed to handle errors in Express applications. It provides a convenient way to catch and handle errors globally within your application.

## Installation

You can install the package via npm or yarn:

```bash
npm install @errorhandler/middleware
```

or

```bash
yarn add @errorhandler/middleware
```

## Usage

1. Import the middleware in your `app.ts` file:

```typescript
import express from "express";
import "express-async-errors";
import { errorHandler } from "@errorhandler/middleware/build/middlewares/error.middleware";

export const app = express();

// Calling the middleware function
errorHandler(app);
```

2. Use the `CustomError` class to throw custom errors within your application:

```typescript
import CustomError from "@errorhandler/middleware/build/utils/custom-error";

const auth = (roles: string[] = []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // How to use the function in your services
        if (!req.headers.authorization) throw new CustomError("Unauthorized access: Token not found", 401);
      

        next();
    };
};
```

3. Use the `response` function for consistent response formatting:

```typescript
import { response } from "@errorhandler/middleware/build/utils/response";
import type { Request, Response } from "express";

class UserController {
    async getMe(req: Request, res: Response) {
        // Send response with formatted data
        res.status(200).send(response("User data", req.$user));
    }

    async updateMe(req: Request, res: Response) {
        // Example of sending response after updating user
        const result = await UserService.update(req.$user?.id as string, req.body);
        res.status(200).send(response("User updated", result));
    }
}
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/Lekejosh/-errorHandler).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

