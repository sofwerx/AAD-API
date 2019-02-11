/**
 * @api {get} /tools Lists all Tools
 * @apiGroup Tools
 * @apiSuccess {Object[]} tools Tools's List
 * @apiSuccess {Object[]} tools.tool Tool
 * @apiSuccess {Number} tools.tool.id Tool id
 * @apiSuccess {String} tools.tool.tool_name Tool's name
 * @apiSuccess {String} tools.tool.description Tool's description
 * @apiSuccess {Date} users.user.updated_at Update's date
 * @apiSuccess {Date} users.user.created_at Register's date
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
    "tools": [
        {
            "id": 1,
            "tool_name": "Test Tool",
            "description": "Tool used for testing purposes.",
            "updated_at": "2019-02-10T00:46:19.648Z",
            "created_at": "2019-02-10T00:46:19.648Z"
        }
    ]
}
 */
