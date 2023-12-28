import { MongoClient, ServerApiVersion } from 'mongodb';

const connectDatabase = async () => {
  const uri =
    'mongodb+srv://yunghsiang:870725@cluster0.ir9rqex.mongodb.net/my-blog?retryWrites=true&w=majority';
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client;
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();
    console.log({ db });

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      console.log(result);
      newMessage.id = result.insertedId;
    } catch (error) {
      console.log(error);
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage });
  }
};

export default handler;
