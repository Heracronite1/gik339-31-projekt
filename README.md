# Videogame Library

This project is a simple single-page application created as part of the **GIK339 course assignment**.

The application allows users to manage a small videogame library using a frontend built with HTML and JavaScript, and a backend built with Express and SQLite.

---

## What the application does

* Displays a list of videogames from a database
* Allows the user to add, edit, and delete games
* Updates the UI dynamically without page reloads
* Stores all data persistently in an SQLite database

---

## Technologies

* HTML
* JavaScript
* Tailwind CSS
* Node.js
* Express
* SQLite

---

## How to run the project

### Backend

```bash
cd server
npm install
npm start
```

The server runs on `http://localhost:3000`.

---

### Frontend

Open `index.html` in a browser (directly or using Live Server).

---

## Database

The project uses SQLite. Example data can be added by running:

```sql
.read games.sql
```

inside the SQLite CLI.

---

## API endpoints

* GET /games
* POST /games
* PUT /games
* DELETE /games/:id

---

Created for the GIK339 cour
