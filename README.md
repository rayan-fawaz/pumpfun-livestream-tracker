# Node Server
This project is a Node.js server that tracks live streams from Pump.Fun and sends notifications to a Telegram chat when a token starts a live stream. It uses Express for the server, Axios for HTTP requests, and node-cron for scheduling tasks.


## Project Structure

```
node-server/
  ├── package.json
  ├── tsconfig.json
  ├── src/
  │   ├── server.ts
  │   ├── routes/
  │   ├── service/
  │   │   ├── pumpfun/
  │   │   │   ├── livestream-action.ts
  │   │   │   ├── livestream.ts
  │   │   │   ├── query.ts
  │   │   │   ├── types.ts
  │   │   ├── telegram/
  │   │   │   ├── server-bot.ts
```

## Getting Started

### Prerequisites

- Node.js
- Yarn or npm

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/rayan-fawaz/pumpfun-livestream-tracker
    ```
2. Navigate to the project directory:
    ```bash
    cd pumpfun-livestream-bot
    ```
3. Install the dependencies:
    ```bash
    yarn
    ```
4. Create a `.env` file in the root directory and add your environment variables. An example `.env` file is provided for reference.

### Getting Bot Token and Chat ID

To get the bot token and chat ID, follow the instructions in this [gist](https://gist.github.com/nafiesl/4ad622f344cd1dc3bb1ecbe468ff9f8a).


### Build

To build the project, run:
```bash
yarn build
```

### Start

To start the server, run:
```bash
yarn start
```
The server will be running on `http://localhost:<PORT>`.

## Scripts

- `yarn start`: Start the server.
- `yarn build`: Build the project.
- `yarn clean`: Clean the build directory.

## API Endpoints

- `GET /`: Health check route to verify the server is running.

## Functionality

- Fetches live streams from Pump.Fun every second.
- Sends a Telegram message when a new live stream is detected.
- Cleans up old live stream entries every 5 minutes.

## Note

Pump.Fun has temporarily disabled livestream capabilities for the unforeseeable future, but this will be useful for when it comes back.

Originally built in Jan 2025. Uploaded in May for portfolio visibility.
