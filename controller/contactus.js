import { contactus } from "../model/contactUs.js";
import bcrypt from "bcrypt";

export const contact = async (req, res, next) => {
  try {
    const { name, email, contactno, message } = req.body;
    console.log(name, email, contactno, message);
    await contactus.create({
      name,
      email,
      contactno,
      message
    });
    return res.status(200).send({
        message: `countact us form filled !!!!!!`,
        success: true,
      });
  } catch (error) {
    return res.status(500).send({
      message: `InternalServer error:${error}`,
      success: false,
    });
  }
};
