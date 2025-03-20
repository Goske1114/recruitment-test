import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwr.js";  // Assuming this is your custom function for JWT
import { database, adminAuth } from '../db.js';
import { push, ref, get, equalTo, query, orderByChild } from 'firebase/database'

// Register
export const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const { key } = await push(ref(database, 'users'), {email, username, password});

    const user = await get(ref(database, 'users/' + key))

    const token = await createAccessToken({ id: key });
    // Set Cookie with Firebase token for auth
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,  // Change to httpOnly true for better security
    });

    res.json(user.val());
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRef = ref(database, 'users')
    const userQuery = query(userRef, orderByChild('email'), equalTo(email))
    const users = await get(userQuery)
    if (!users.exists()) {
      res.status(400).json("User doesn't exist")
      return
    }

    const firstKey = Object.keys(users.val())[0]
    if (users.val()[firstKey].password !== password) {
      res.status(400).json('Password is incorrect')
      return
    }

    // Set Cookie with Firebase token for auth
    const token = await createAccessToken({ id: firstKey });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,  // Change to httpOnly true for better security
    });

    res.json(users.val()[firstKey]);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// Verify Token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No authorization" });

    const userRef = ref(database, 'users/' + user.id)
    const userFound = await get(userRef)
    if (!userFound) return res.status(401).json({ message: "No autorization" });
    return res.json({
      id: userFound.key,
      username: userFound.val().username,
      email: userFound.val().email,
    });
  });
};

// Profile
export const profile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    // Verify the token and get the user info
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Find the user in the database using the decoded uid
    const userFound = await User.findById(decodedToken.uid);
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving profile' });
  }
};