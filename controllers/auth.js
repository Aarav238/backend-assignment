import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';


export const register = async (req,res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ user });
      } catch (error) {
        res.status(400).send(error);
      }
}

export const login = async(req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
          return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
        res.send({ user, token });
      } catch (error) {
        res.status(400).send(error);
      }
}