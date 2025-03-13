# Shazle

Shazle is a game that combines Shazam and Heardle. In Shazle, you scan a song and try to guess its release date. [Try it](https://shazle.thaeazzy.workers.dev/) and test your music knowledge.

## Installation

To install Shazle, follow these steps:

1. Clone the repository:
2. Navigate to the project directory:

```bash
cd shazle
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the backend directory and add your apidojo's Shazam API key from [RapidAPI](https://rapidapi.com/apidojo/api/shazam) :

```bash
SHAZAM_API_KEY=your_shazam_api_key
```

## Usage

To start playing Shazle, you need to start both the backend and frontend. Run the following commands in separate terminal windows:

1. Start the backend:

```bash
npm run build-only
```

2. Start the frontend:

```bash
npm run dev:back
```

3. Open app in browser [127.0.0.1:8787](http://127.0.0.1:8787)

## License

This project is licensed under the MIT License.
