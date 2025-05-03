const fs = require('fs');
const path = require('path');
const https = require('https');

// Create the directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images/books');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Sample book covers with placeholder URLs
const bookCovers = [
  { 
    filename: 'psychology-of-money.jpg',
    url: 'https://placehold.co/400x600/3a3a3a/FFFFFF?text=Psychology+of+Money'
  },
  { 
    filename: 'atomic-habits.jpg',
    url: 'https://placehold.co/400x600/3a3a3a/FFFFFF?text=Atomic+Habits'
  },
  { 
    filename: 'deep-work.jpg',
    url: 'https://placehold.co/400x600/3a3a3a/FFFFFF?text=Deep+Work'
  },
  { 
    filename: 'thinking-fast-slow.jpg',
    url: 'https://placehold.co/400x600/3a3a3a/FFFFFF?text=Thinking+Fast+and+Slow'
  },
  { 
    filename: 'zero-to-one.jpg',
    url: 'https://placehold.co/400x600/3a3a3a/FFFFFF?text=Zero+to+One'
  },
  { 
    filename: 'sapiens.jpg',
    url: 'https://placehold.co/400x600/3a3a3a/FFFFFF?text=Sapiens'
  }
];

// Download each image
bookCovers.forEach(book => {
  const filePath = path.join(imagesDir, book.filename);
  const file = fs.createWriteStream(filePath);
  
  https.get(book.url, response => {
    response.pipe(file);
    
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${book.filename}`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading ${book.filename}: ${err.message}`);
  });
});

console.log('Starting download of sample book covers...');
