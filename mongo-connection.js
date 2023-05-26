import { MongoClient, ServerApiVersion }  from 'mongodb';
const uri = "mongodb+srv://thamires2022:thamirespm50@cluster0.wsel3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
export const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });