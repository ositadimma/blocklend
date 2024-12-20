const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'blocklend';

(async () => {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Select database
    const db = client.db(dbName);

    // Create or select a collection
    const collection = db.collection('myCollection');

    // Insert a document
    const insertResult = await collection.insertOne({ name: 'John Doe', age: 30 });
    console.log('Document inserted:', insertResult.insertedId);

    // Query the collection
    const documents = await collection.find({}).toArray();
    console.log('Documents found:', documents);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    // Close the connection
    await client.close();
  }
})();
