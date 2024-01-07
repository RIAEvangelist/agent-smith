import {GITHUB_USERNAME,GITHUB_TOKEN} from '.pill';
import {notifications} from 'consts/endpoints.js';

const headers = {
  Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
};

async function fetchNotifications() {
  try {
    const response = await fetch(
        notifications, 
        { headers }
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Process the fetched notifications here
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
}

// Periodically fetch notifications (e.g., every 5 minutes)
setInterval(fetchNotifications, 5 * 60 * 1000);