const fs = require('fs')

fs.copyFileSync('.env.sample', '.env')

fs.mkdirSync('data/db', { recursive: true })
