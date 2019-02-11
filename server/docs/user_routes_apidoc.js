/**
 * @api {get} /users Lists all Users
 * @apiGroup Users
 * @apiSuccess {Object[]} users User's List
 * @apiSuccess {Object[]} users.user User's List
 * @apiSuccess {Number} users.user.id User id
 * @apiSuccess {Number} users.user.role_id User's [FK] Ties user to Role Table.
 * @apiSuccess {String} users.user.username User's unique username
 * @apiSuccess {String} users.user.email User's email address
 * @apiSuccess {String} users.user.first_name User's first name
 * @apiSuccess {String} users.user.last_name User's last name
 * @apiSuccess {String} users.user.job_title User's job title
 * @apiSuccess {String} users.user.company User's company
 * @apiSuccess {Date} users.user.updated_at Update's date
 * @apiSuccess {Date} users.user.created_at Register's date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 {
    "users": [
        {
            id: 17,
            role_id: 2,
            username: "jdoe",
            email: "John.Doe@company.org",
            first_name: "John",
            last_name: "Doe",
            job_title: "Employee",
            company: "SofWerx",
            updated_at: "2019-02-10T00:46:19.671Z",
            created_at: "2019-02-10T00:46:19.671Z"
        }
      ]
  }
 */
