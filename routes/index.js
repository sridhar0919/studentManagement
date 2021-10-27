const { ObjectId } = require('bson');
var express = require('express');
var router = express.Router();
const { dbUrl, mongodb, MongoClient } = require('../dbConfig');

router.get('/all-students', async (req, res) => {
  // Get all student details

  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db('studentManagement');
    let data = await db.collection('students').find().toArray();
    res.send({
      message: 'OK',
      details: data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      message: 'Error in connection',
    });
  } finally {
    client.close();
  }
});

router.get('/:id', async (req, res) => {
  // Get a student with id

  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db('studentManagement');
    let data = await db
      .collection('students')
      .findOne({ _id: ObjectId(req.params.id) });
    res.send({
      message: 'OK',
      details: data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      message: 'Error in connection',
    });
  } finally {
    client.close();
  }
});

router.post('/add-student', async (req, res) => {
  // Add one student

  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db('studentManagement');
    let data = await db.collection('students').insertOne(req.body);
    res.send({
      message: 'OK',
      details: data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      message: 'Error in connection',
    });
  } finally {
    client.close();
  }
});

router.post('/add-many-student', async (req, res) => {
  // Add many student

  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db('studentManagement');
    let data = await db.collection('students').insertMany(req.body);
    res.send({
      message: 'OK',
      details: data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      message: 'Error in connection',
    });
  } finally {
    client.close();
  }
});

router.put('/edit-student/:id', async (req, res) => {
  // Update one student

  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db('studentManagement');
    let data = await db.collection('students').updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          location: req.body.location,
        },
      }
    );
    res.send({
      message: 'OK',
      details: data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      message: 'Error in connection',
    });
  } finally {
    client.close();
  }
});

router.delete('/delete-student/:id', async (req, res) => {
  // delete one student

  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db('studentManagement');
    let data = await db
      .collection('students')
      .deleteOne({ _id: ObjectId(req.params.id) });
    res.send({
      message: 'OK',
      details: data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      message: 'Error in connection',
    });
  } finally {
    client.close();
  }
});

router.patch('/edit-one-student/:id', async (req, res) => {
  // Update one student

  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db('studentManagement');
    let data = await db.collection('students').updateOne(
      { _id: ObjectId(req.params.id) },
      {
        $set: {
          class: req.body.class,
        },
      }
    );
    res.send({
      message: 'OK',
      details: data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      message: 'Error in connection',
    });
  } finally {
    client.close();
  }
});

router.delete('/delete-many-student', async (req, res) => {
  // Delete many students

  const client = await MongoClient.connect(dbUrl);

  try {
    const db = client.db('studentManagement');

    let deleteArray = [];

    req.body.map((e) => {
      deleteArray.push(ObjectId(e.id));
    });

    let data = await db
      .collection('students')
      .deleteMany({ _id: { $in: deleteArray } });
    res.send({
      message: 'OK',
      details: data,
    });
  } catch (e) {
    console.log(e);
    res.send({
      message: 'Error in connection',
    });
  } finally {
    client.close();
  }
});

module.exports = router;
