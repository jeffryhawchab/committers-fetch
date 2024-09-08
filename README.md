# GitHub Top Contributors by Location

This project identifies the top GitHub contributors based on their location and contribution metrics.

## Prerequisites

- Node.js (v14.x or later)
- npm (Node Package Manager)
- A GitHub Personal Access Token with `public_repo` scope

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```

2. **Install dependencies**

   Install the required Node.js packages using npm:

   ```bash
   npm install axios
   ```

3. **Configure your GitHub Personal Access Token**

   Open `script.js` and replace the empty string for the `TOKEN` variable with your GitHub Personal Access Token:

   ```js
   const TOKEN = 'your_personal_access_token';
   ```

## Usage

To run the script and get the top GitHub contributors for a specific location:

1. Open `script.js` and modify the `location` variable with your desired location:

   ```js
   getUsersByLocation('desired_location');
   ```

2. Run the script:

   ```bash
   node script.js
   ```

## Script Details

- **`getUsersByLocation(location)`**: Fetches GitHub users based on their location, retrieves detailed information and contributions, and then outputs the top contributors.

## Notes

- Make sure your GitHub token has the necessary permissions to access user and repo data.
- The script uses the GitHub Search API and User Repos API to gather data.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
