const userRepository = require('../repository/user.repository');
const { generateToken } = require('../auth');
const bcrypt = require('bcrypt');

const signup = async (userData) => {

    const { username, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await userRepository.create(username, hashedPassword);
    const token = generateToken(userId);

    return { token };
};

const update = async (user, userData) => {
    const { username, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    await userRepository.update(user.id, username, hashedPassword);
};

const deleteUser = async (user) => {
    await userRepository.deleteUser(user.id);
};

const login = async (credentials) => {
    const { username, password } = credentials;

    const user = await userRepository.findByUsername(username);

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id);
    return { token };
};

module.exports = {
    signup,
    update,
    deleteUser,
    login
};
