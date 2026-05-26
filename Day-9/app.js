const http = require('http');

let notes = [
  { id: 1, title: 'Buy groceries', content: 'Milk, eggs, bread' },
  { id: 2, title: 'Study Node.js', content: 'Finish Day 9 notes' },
];
let nextId = 3;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { url, method } = req;

  // GET /notes — return all notes
  if (url === '/notes' && method === 'GET') {
    res.writeHead(200);
    return res.end(JSON.stringify(notes));
  }

  // GET /notes/1 — return single note
  const match = url.match(/^\/notes\/(\d+)$/);
  if (match && method === 'GET') {
    const note = notes.find(n => n.id === parseInt(match[1]));
    if (!note) { res.writeHead(404); return res.end(JSON.stringify({ error: 'Not found' })); }
    res.writeHead(200);
    return res.end(JSON.stringify(note));
  }

  // POST /notes — create note
  if (url === '/notes' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { title, content } = JSON.parse(body);
      const newNote = { id: nextId++, title, content };
      notes.push(newNote);
      res.writeHead(201);
      res.end(JSON.stringify(newNote));
    });
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(3000, () => console.log('Notes API running on port 3000'));
