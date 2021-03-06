import { environment as env } from '../../environments/environment';

// File contains all the app constants
export const apiUrls = {
  // Define Api Base Url
  baseUrl: env.apiBaseUrl,
  attachmentsBaseUrl: env.attachmentsBaseUrl,
  endpoints: {
    lists: '/lists',
    todos: '/todos',
    taskCompletedPerDay: '/reports/tasks-completed-per-day',
    attachments: '/attachments',
  }
};
