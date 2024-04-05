- Command start: npm run dev
- localhost: 8081

Login/Register

- Login ---------> POST http://localhost:8081/v1/login
- Register ---------> POST http://localhost:8081/v1/register

User

- Get All Users ---------> GET http://localhost:8081/v1/user/read

Comment:

- Get ALL Comment ----> GET http://localhost:8081/v1/comment/readAll
- Add Comment ----> POST http://localhost:8081/v1/comment/create
- Delete Comment ----> DELETE http://localhost:8081/v1/comment/delete/(id)

Comments for Student (Không trả về time)

- Get Comment for Student ----> GET http://localhost:8081/v1/commentforS/read ---> truyền vào contributions_id

Comments for Coordinator (Trả về time còn lại)

- Get Comment for Coordinator ----> GET http://localhost:8081/v1/commentforC/read ---> truyền vào contributions_id

Contributions:

- Create new contribution ------> POST http://localhost:8081/v1/contribution/create
  (requirements: topic_id, name, description, file in body)
- Show contribution for Faculty ------> GET http://localhost:8081/v1/contribution/readbyfaculty
  \*(truyền vào contributions_id, và status(0,1,2))

- Get All Contributors -------> GET http://localhost:8081/v1/contribution/read
- Download Contribution -------> GET http://localhost:8081/v1/contribution/download/id
- Delete Contribution ----> DELETE http://localhost:8081/v1/contribution/delete/:id

Faculty:

- Get ALL Faculty ----> GET http://localhost:8081/v1/faculty/readAll
- Add Faculty ----> POST http://localhost:8081/v1/faculty/create
- Delete Faculty ----> DELETE http://localhost:8081/v1/faculty/delete/id
- Update Faculty ----> PUT http://localhost:8081/v1/faculty/update/id

Group:

- Get ALL Group ----> GET http://localhost:8081/v1/group/readAll
- Add Group ----> POST http://localhost:8081/v1/group/create
- Delete Group ----> DELETE http://localhost:8081/v1/group/delete/id
- Update Group ----> PUT http://localhost:8081/v1/group/upadte/id

Role:

- Add Role ----> POST http://localhost:8081/v1/role/create
- GetAll Role ----> GET http://localhost:8081/v1/role/readAll

Topic:

- Create new topic ----> POST http://localhost:8081/v1/topic/create
- Get All Topic ----> GET http://localhost:8081/v1/topic/readAll
- Delete Topic ----> DELETE http://localhost:8081/v1//topic/delete/id

Group with Role:

- Add ----> POST http://localhost:8081/v1/grouprole

Upload files

- Upload Single File ----> POST http://localhost:8081/v1/file/single (ko dung)
- Upload Multiple File ----> POST http://localhost:8081/v1/file/multiple (ko dung)

sendMail

- Send Email ----> POST http://localhost:8081/v1/sendmail
