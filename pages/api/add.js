import { initDatabase } from "../../utils/mongodb";

// async api endpoint to create a new song
// handles the case where a dupicate song is attempted to be added
async function createPulse(req, res) {
  const request = req.body;
  // if the song passed is null
  // deal with this edge case
  if (!request) {
    throw {
      status: 400,
      message: "request was not found"
    };
  }
  // create MongoDB client as well as reference to MongoDB collection
  const client = await initDatabase();
  const users = client.collection(request.collection + "");

  let mutation = {
    // The $set operator replaces the value of a field with the specified value.
    $set: {
      username: request.username,
      pulse: request.pulse,
      poll_response: request.poll_response
    }
  };

  // first search for document in MongoDB database that matches the guid.
  // If none is found, document with mutation is added as it is simply
  // either adding a tag to an exisiting document or creating a new one.
  const result = await users.findOneAndUpdate(
    { guid: request.guid },
    mutation,
    {
      upsert: true, // allows for insertion of new document
      returnOriginal: false
    }
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ result }));
}

async function performAction(req, res) {
  if (req.method == "POST") {
    return createPulse(req, res);
  }
  // request is not a GET or POST;
  // in the context of this spike throw an exception but
  // in the full application you should also write out a delete
  // note: status 405 stands for indicating that the specified request HTTP method was received and recognized by the server,
  // but the server has rejected that particular method for the requested resource.
  throw { status: 405 };
}

export default performAction;
