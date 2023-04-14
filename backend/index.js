import {app, /*Datastore*/} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import {object, date, string, boolean, /*number*/} from 'yup';

const toDoYup = object({
  // id: number().required(), // unique identifier for todo object, apparently not required because of _id
  userToken: string().required(), // user token (from Clerk) of author of todo object
  body: string().required(), // content of to do
  // category: string().required(), // category of to do (might not implement?)
  done: boolean().default(false).required(), // representation if to do is finished or not
  createdOn: date().default(() => new Date()).required(), // date todo was created on
})

// https://codehooks.io/docs/nosql-database-query-language

// const db = await Datastore.open();
// const options = {
//   useIndex: "createdOn"
// }

// // handle creating new todos using Database api
// app.post("/new", async (req, res) => {
//   const conn = await Datastore.open();
//   const todo = await conn.insertOne("toDo", req.body);
//   res.status(201).json(todo);
// });

// // set done for a todo, should only affect a single todo
// app.post("/done/:id", async (req, res) => {
//   const conn = await Datastore.open();
//   const todo = await conn.updateOne("toDo", req.params.id, req.body);
//   res.json(todo);
// });

// // handle getting todos using Database api
// app.get("/:userToken", async (req, res) => {
//   const conn = await Datastore.open();
//   const query = {"userToken": req.params.userToken};
//   const options = {
//     filter: query,
//     useIndex: "createdOn"
//   }
//   conn.getMany("toDo", options).json(res);
// });

// // used for debugging db, probably wont be included in production
// app.get("/", async (req, res) => {
//   const conn = await Datastore.open();
//   const options = {
//     // useIndex: "createdOn"
//   }
//   conn.getMany("toDo", options).json(res);
// });

// Use Crudlify to create a REST API for any collection
crudlify(app, {toDo: toDoYup});

// bind to serverless runtime
export default app.init();