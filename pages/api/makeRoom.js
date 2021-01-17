import { initDatabase } from "../../utils/mongodb";

export default async function(req, res) {
  const name = req.body.name;
  const user = await initDatabase();
  await user.createCollection(String(name));
  res.end("{}");
}
