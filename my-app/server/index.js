// Explicitly load .env.local (Next.js style) or fallback to .env
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
dotenv.config(); // fallback if .env.local not found
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Member = require('./models/Member');
const Event = require('./models/Event');
const Project = require('./models/Project');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gravity123';
const ADMIN_ID = process.env.ADMIN_ID || '123456';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

if (!MONGO_URI) {
  console.error('\n[Config] MONGO_URI is undefined. Create a .env.local file at project root with:\nMONGO_URI=your_mongo_connection_string\n');
  console.error('Example (DO NOT commit real credentials):');
  console.error('MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.giuswdc.mongodb.net/?appName=Cluster0');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { dbName: 'gravity' })
  .then(() => console.log('[MongoDB] Connected'))
  .catch((err) => {
    console.error('[MongoDB] Connection error', err.message);
  });

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });
  const token = authHeader.replace('Bearer ', '');
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/admin/login', (req, res) => {
  const { id, password } = req.body;
  if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true, id }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Members CRUD
// Public read-only endpoints (no auth) for site pages
app.get('/api/public/members', async (_req, res) => {
  const members = await Member.find().sort({ createdAt: -1 }).lean();
  res.json(members);
});

app.get('/api/public/events', async (_req, res) => {
  const events = await Event.find().sort({ date: 1 }).lean();
  res.json(events);
});

app.get('/api/members', auth, async (_req, res) => {
  const members = await Member.find().sort({ createdAt: -1 }).lean();
  res.json(members);
});

app.post('/api/members', auth, async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/members/:id', auth, async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/api/members/:id', auth, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/api/events', auth, async (_req, res) => {
  const events = await Event.find().sort({ date: 1 }).lean();
  res.json(events);
});

app.post('/api/events', auth, async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/events/:id', auth, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/api/events/:id', auth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


app.get('/api/projects', auth, async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  res.json(projects);
});

app.post('/api/projects', auth, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/projects/:id', auth, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/api/projects/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`[Backend] Listening on port ${PORT}`));
