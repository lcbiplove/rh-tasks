# Structure

The project is structured such that both the frontend and backend reside together inside this repository. The root project is a Django project, while React is located in a subdirectory. This structure was chosen due to the project's low complexity and to include both parts (frontend and backend) in one repository.

Folder Structure:
- data_type_infer: Django app where main logic of the apis are
- info: Project description file (that was provided by Rhombus)
- logs: Logs folder of the backend app
- rhombus: Default core app created by django (settings, wsgis)
- rhombus-ui: `Frontend`of the web app (react running)


## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/lcbiplove/rh-tasks.git
    ```

2. Install the required dependencies for the Django backend. In the root directory, run:
    ```bash
    python3 -m venv .venv # virutal environment preferred
    pip install -r requirements.txt
    mkdir logs # for log outputs
    python manage.py migrate
    python manage.py createsuperuser  --user admin --email admin@admin.com # For admin portal
    python manage.py runserver
    ```

3. Install the required dependencies for the React frontend. Navigate to the `rhombus-ui` directory and run:
    ```bash
    npm install
    ```

4. Start the Django development server. In the root directory, run:
    ```bash
    python manage.py runserver
    ```

5. Start the React development server. In the `rhombus-ui` directory, run:
    ```bash
    npm start
    ```

6. Open your web browser and visit `http://localhost:5173` to access the application.

## Features

All the basic requirements of the task is completed.

- Data Processing: Upload CSV/Excel files, submit for processing, and view processed data.
- Backend API: Handle data input and output, interact with frontend.
- Mapping Data Types: Map backend (Pandas) data types to user-friendly names (e.g., 'object' to 'Text', 'datetime64' to 'Date').
- Custom Data Type Override: Allow users to set their own data types for columns if needed.
- Django Integration: Seamless integration of Django project with Python data processing script.
- React Frontend: Developed frontend application using React for smooth user interaction.
- User-friendly Interface: Intuitive interface for easy data uploading, processing, and viewing.

## Further improvement

The project has covered overall requirements but few things can be included in the version second version of the project:

- Use of docker to manage container in both frontend and backend (*Note: It is okay for now, but is a must when project gets complicated)
- Test cases for both ends