// // server/routes/users.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const verifyToken = require('../middleware/auth');

// // User registration
// router.post('/register', async (req, res) => {
//   try {
//     // Implement user registration logic here
//     // Save user data to MongoDB
//     res.json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // User login
// router.post('/login', async (req, res) => {
//   try {
//     // Implement user login logic here
//     // Generate and send a JWT token on successful login
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

// server/routes/users.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');
import Webcam from 'react-webcam';

// server/routes/users.js
router.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ email, password });
  
      // Save the user to the database
      await newUser.save();
  
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      // Save the image or send it to your server for further processing
    },
    [webcamRef]
  );

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture Photo</button>
    </div>
  );
};

  });
  


// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check the password (insecure, use bcrypt in production)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ user: { id: user.id } }, 'your_secret_key', {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;