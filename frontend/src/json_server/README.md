To start the json-server:
json-server --port 3030 --watch json_server/db.json

To fetch data, use, for example:
url: http://localhost:3030/staff

List of endpoints:
GET /staff
GET /staff/id
POST /staff
...