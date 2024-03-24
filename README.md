# Siemens Submission

Welcome to my Siemens Submission! This is a gamified task manager built using Vue.js and Firebase Firestore database. It allows users to manage their goals and tasks efficiently in a gamified environment.

## Features

- **User Authentication**: Users can log in using their Google account and log out when necessary.

- **Goal Management**: Users can add goals to the task manager. Each goal has its own progress bar, and when the progress reaches 100%, the goal is automatically removed from the list.

- **Task Management**: Users can add tasks to their goals, edit task details such as title, description, and due date, delete tasks, and mark tasks as complete.

- **Sorting**: Tasks in the "Done Tasks" page are sorted by difficulty to provide better organization and overview.

- **Filtering**: In the "My Tasks" page, users can filter tasks based on their difficulty, allowing for easier task management.

## How to Use

1. **Login**: Sign in using your Google account to access the task manager.

2. **Add Goals**: Start by adding your goals using the provided interface.

3. **Manage Tasks**: For each goal, add tasks, edit task details, mark tasks as complete (easy tasks increase your progress by 10%, medium by 20% and hard by 30%), or delete them as needed.

4. **Track Progress**: Monitor the progress of your goals using the progress bar provided.

5. **Sort and Filter**: Utilize the sorting and filtering options to organize and manage your tasks effectively.

## Technologies Used

- **Vue.js**: Frontend framework for building user interfaces.
  
- **Firebase Firestore**: Cloud-hosted NoSQL database used for real-time data storage and synchronization.

## Getting Started

To get started with Siemens Submission, follow these steps:

1. Clone the repository to your local machine.
  
    ```
    git clone https://github.com/your-username/siemens-submission.git
    ```

2. Install dependencies using npm or yarn.

    ```
    npm install
    ```

    or

    ```
    yarn install
    ```

3. Set up Firebase project and configure Firebase Firestore database.

4. Update Firebase configuration in your project.

## Note:

You do not need to perform steps 3 and 4 since the Firebase project keys have been included in the project. While this is not the best practice and I should have used environment files, I did this to make it easier for the reviewer to review the project.

5. Run the project locally.

    ```
    npm run serve
    ```

    or

    ```
    yarn serve
    ```

6. Access the application through your web browser at `http://localhost:8080`.

## Note:
Logging in for the first time may take a while

