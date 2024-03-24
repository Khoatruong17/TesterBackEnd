- Command start: npm run dev
- localhost: 8081
-
- User:
- Login ----> POST http://localhost:8081/v1/login
- Register ----> POST http://localhost:8081/v1/register
- Get All Users ----> GET http://localhost:8081/v1/user/read
-
- Group:
- Get ALL Group ----> GET http://localhost:8081/v1/group
- Add Group ----> POST http://localhost:8081/v1/group
- Delete Group ----> DELETE http://localhost:8081/v1/group/(id)
- Update Group ----> PUT http://localhost:8081/v1/group/(id)
-

Role:

- Add Role ----> POST http://localhost:8081/v1/role

Group with Role:

- Add ----> POST http://localhost:8081/v1/

Faculty:

- Get ALL Faculty ----> GET http://localhost:8081/v1/faculty
- Add Faculty ----> POST http://localhost:8081/v1/faculty
- Delete Faculty ----> DELETE http://localhost:8081/v1/faculty/(id)
- Update Faculty ----> PUT http://localhost:8081/v1/faculty/(id)
