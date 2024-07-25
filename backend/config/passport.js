// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import User from '../models/User.js';

// passport.use(
//   'google-login',
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/api/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const user = await User.findOne({ googleId: profile.id });
//         if (user) {
//           return done(null, user);
//         }
//         return done(null, false, { message: 'User not found' });
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET,
// };

// passport.use(
//   new JwtStrategy(opts, async (jwt_payload, done) => {
//     try {
//       const user = await User.findById(jwt_payload.id);
//       if (user) {
//         return done(null, user);
//       }
//       return done(null, false);
//     } catch (err) {
//       return done(err, false);
//     }
//   })
// );

// export default passport;
