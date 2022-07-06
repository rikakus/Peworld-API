<h3 align="center">Peworld API</h3>
<p align="center">
  <a href="https://peworld-app-api.herokuapp.com/">View API Demo</a>
  ·
  <a href="https://github.com/rikakus/Peworld-API/issues">Report Bug</a>
  <br />
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

This is a Restful API repository for Peworld. This Restful API is built using ExpressJS and PostgreSQL.

### Technology Used

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)

## Getting Started

### Installation

- Clone this project with `git clone https://github.com/rikakus/Peworld-API`
- Install package required with `npm install`
- Setting .env

```bash

PORT=
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=
NODE_ENV=
JWT_SECRET=
```

### Executing program

- Run program with `npm run dev` for development and `npm run start` for production

## Endpoint List

### User

#### Auth

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `post`      | `/register/worker` | user register as worker|
| `post`      | `/register/recruiter` | user register as recruiter|
| `post`      | `/login` | user login |

#### Worker

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `get`      | `/worker` | get list worker |
| `get`      | `/worker/:id` | get detail worker |
| `put`      | `/worker/:id` | update data worker |
| `put`      | `/worker/:id/photo` | update data photo worker |

#### Recruiter

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `get`      | `/recruiter` | get all recruiter |
| `get`      | `/recruiter/:id` | get detail recruiter |
| `put`      | `/recruiter/:id` | update data recruiter |
| `put`      | `/recruiter/:id/photo` | update data photo recruiter |

#### Worker Addition

| Method | API     | Description                       |
| :-------- | :------- |:-------------------------------- |
| `get`      | `/job` | get all worker job |
| `post`      | `/skill` | input skill worker |
| `post`      | `/experience` | input experience worker |
| `post`      | `/portofolio` | input portofolio worker |
| `delete`      | `/skill/:id` | delete skill worker |
| `delete`      | `/experience/:id` | delete experience worker |
| `delete`      | `/portofolio/:id` | delete portofolio worker |


<!-- RELATED PROJECT -->
## Related Project

- [Peworld FrontEnd](https://github.com/rikakus/Peworld)
- [Peworld Demo](https://peworld-rikakus.vercel.app/)

## License

This project is licensed under the MIT License - see the LICENSE file for details
