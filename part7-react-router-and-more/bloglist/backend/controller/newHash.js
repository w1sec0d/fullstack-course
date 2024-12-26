const bcrypt = require('bcrypt');

(async () => {
  const passwordHash = await bcrypt.hash('Cisco123', 10)
  console.log(passwordHash)
})()

