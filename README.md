- Command start: npm run dev
- localhost: 8081

User:

- Login ---------> POST http://localhost:8081/v1/login
- Register ---------> POST http://localhost:8081/v1/register
- Get All Users ---------> GET http://localhost:8081/v1/user/read

Contributions:

- Create new contribution ------> POST http://localhost:8081/v1/contribution/create

* requirements: topic_id, name, description, file in body

- Get All Contributors -------> GET http://localhost:8081/v1/contribution/read

Group:

- Get ALL Group ----> GET http://localhost:8081/v1/group
- Add Group ----> POST http://localhost:8081/v1/group/create
- Delete Group ----> DELETE http://localhost:8081/v1/group/delete/(id)
- Update Group ----> PUT http://localhost:8081/v1/group/upadte/(id)

Faculty:

- Get ALL Faculty ----> GET http://localhost:8081/v1/faculty
- Add Faculty ----> POST http://localhost:8081/v1/faculty/create
- Delete Faculty ----> DELETE http://localhost:8081/v1/faculty/delete/(id)
- Update Faculty ----> PUT http://localhost:8081/v1/faculty/update/(id)

Role:

- Add Role ----> POST http://localhost:8081/v1/role/create

Group with Role:

- Add ----> POST http://localhost:8081/v1/grouprole

Upload files

- Upload Single File ----> POST http://localhost:8081/v1/file/single (ko dung)
- Upload Multiple File ----> POST http://localhost:8081/v1/file/multiple (ko dung)

sendMail

- Send Email ----> POST http://localhost:8081/v1/sendmail

Topic:

- Create new topic ----> POST http://localhost:8081/v1/topic/create
- Get All Topic ----> GET http://localhost:8081/v1/topic/read

-
comment:
- Get ALL Comment ----> GET http://localhost:8081/v1/comment
- Add Comment ----> POST http://localhost:8081/v1/comment
- Delete Comment ----> DELETE http://localhost:8081/v1/comment/delete/(id)
- Update Comment ----> PUT http://localhost:8081/v1/comment/upadte/(id)

- document:
- Get ALL document ----> GET http://localhost:8081/v1/document
- Add document ----> POST http://localhost:8081/v1/document/create
- Delete document ----> DELETE http://localhost:8081/v1/document/delete/(id)
- Update document ----> PUT http://localhost:8081/v1/document/upadte/(id)
- 
