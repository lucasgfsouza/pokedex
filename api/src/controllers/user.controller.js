const authService = require('../services/user.service');

const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const update = async (req, res) => {
  try {
    await authService.update(req.user, req.body);
    res.status(200).send('User updated');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await authService.deleteUser(req.user);
    res.status(200).send('User deleted');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  signup,
  update,
  deleteUser,
  login
};
