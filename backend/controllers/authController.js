import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { firstName , lastName ,email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ firstName, lastName, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// export const googleLogin = (req, res) => {
//   const token = jwt.sign({ user: { id: req.user.id } }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });
//   res.json({ token });
// };

// export const googleSignIn = async(user)=> {

//   let use = await User.findOne({email: user.email})
//   req.user.id = use._id
//   if (!user) {
//    user = await User.create({email: user.email})
//    req.user.id = use._id
//     // return res.status(400).json({ msg: 'Invalid credentials' })
//   }
  
//   try {
//     const payload = {
//       user: {
//         id: use._id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// } 
export const googleSignIn = async (req, res) => {
  const { email, displayName } = req.body;
  const [firstName, lastName] = displayName.split(" ");

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ firstName, lastName, email });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('JWT signing error:', err);
          return res.status(500).send('Server error');
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error in googleSignIn function:', err.message);
    res.status(500).send('Server error');
  }
};
