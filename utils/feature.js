// import jwt from "jsonwebtoken";
// import crypto from "crypto";

// export const sendCookie = (user, res, message, statusCode = 200) => {
//   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//   res
//     .status(statusCode)
//     .cookie("token", token, {
//       httpOnly: true,
//       maxAge: (process.env.COOKIE_EXPIRE || 1) * 60 * 60 * 1000,
//     })
//     .json({
//       success: true,
//       message,
//       token,
//       user,
//     });
// };
