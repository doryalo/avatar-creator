# Avatar Creator

A simple service that generates user avatars from initials.

## Features

- Creates 100x100 pixel avatars with user's initials
- Customizable background color
- Automatically selects contrasting text color for better readability
- Returns avatar as PNG image

## Setup

1. Install dependencies:
```
npm install
```

2. Build the project:
```
npm run build
```

3. Start the server:
```
npm start
```

Alternatively, run in development mode with hot reloading:
```
npm run dev
```

## Usage

Use the `/user-avatar` endpoint with the following query parameters:

- `name` (required): The user's name from which to generate initials
- `backgroundColor` (optional): Hex color code for the avatar background (default: #3498db)

Example:
```
http://localhost:3000/user-avatar?name=John+Doe&backgroundColor=FF5733
```

## Response

The endpoint returns a PNG image directly. If an error occurs, it returns a JSON object with an error message. 