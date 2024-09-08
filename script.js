const axios = require('axios');

// Replace with your GitHub personal access token
const TOKEN = '';

// Function to get GitHub users in Lebanon based on their location
async function getUsersByLocation(location) {
  try {
    // Fetch users from GitHub search API with authentication
    const response = await axios.get(`https://api.github.com/search/users?q=location:${location}&type=users`, {
      headers: {
        'Authorization': `token ${TOKEN}`
      }
    });
    const users = response.data.items;

    // Fetch detailed information for each user
    const userDetailsPromises = users.map(user =>
      axios.get(user.url, {
        headers: {
          'Authorization': `token ${TOKEN}`
        }
      }).then(res => res.data)
    );
    const userDetails = await Promise.all(userDetailsPromises);

    // Fetch contributions for each user
    const userContributionsPromises = userDetails.map(user =>
      axios.get(`https://api.github.com/users/${user.login}/repos?per_page=100`, {
        headers: {
          'Authorization': `token ${TOKEN}`
        }
      }).then(res => res.data)
    );
    const userRepos = await Promise.all(userContributionsPromises);

    // Aggregate contributions
    const contributions = userDetails.map((user, index) => {
      const repos = userRepos[index];
      const totalContributions = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      return { login: user.login, contributions: totalContributions };
    });

    // Sort users by contributions in descending order
    contributions.sort((a, b) => b.contributions - a.contributions);

    // Get top contributors
    const topContributors = contributions.slice(0, 10);

    // Output top contributors
    console.log('Top Contributors in Lebanon:');
    topContributors.forEach(contributor => {
      console.log(`${contributor.login}: ${contributor.contributions} contributions`);
    });

  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

// Fetch top contributors for users in Lebanon
getUsersByLocation('Lebanon');
