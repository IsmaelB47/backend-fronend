# Song Manager App

A full-stack music management application built with **Node.js**, **Express**, **MongoDB**, and **HTML/JavaScript**.  
This project allows users to create, view, update, and delete songs through a simple interface and backend API.

## Overview

The application is designed to manage a song collection. It includes a backend server built with Express and MongoDB, and frontend pages for interacting with the app. The backend exposes CRUD operations for songs, and the database stores song details such as title, artist, popularity, release date, and genre.

## Features

- View all songs
- Filter songs by genre
- Add a new song
- Edit existing song details
- Delete songs
- Store song data in MongoDB
- REST API with CRUD functionality

## Tech Stack

- **Frontend:** HTML, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Other Packages:** CORS, body-parser

## Project Structure

```bash
backend-fronend/
│── models/
│   └── song
│── scripts/
│── add_song.html
│── details.html
│── edit.html
│── index.html
│── app.js
│── db.js
│── package.json
