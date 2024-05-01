const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { UserModel } = new PrismaClient();
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
/*
--------------------------
Create and save a new user
in the database
--------------------------
*/
async function signup(req, res) {
  const { landLordRouteParams } = req.params;
  const { username, password, email, role } = req.body;
  let userRole =
    landLordRouteParams &&
    landLordRouteParams === process.env.LANDLORD_SECRET_SIGNUP_PARAMS_ROUTE
      ? "lessor"
      : "tenant";
  try {
    const newUser = await UserModel.create({
      data: {
        username: username,
        password: await bcrypt.hash(password, 10),
        email: email,
        role: userRole,
      },
    });
    return res.status(201).json({
      message: "user is created",
      newUser: newUser,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

/*
--------------------------
Activate user account
--------------------------
*/
function activateAccount(req, res) {
  return res.send("User account is activated");
}

/*
--------------------------
Signin if user have an account 
and roles 
--------------------------
*/
async function signin(req, res, next) {
  const { email, password } = req.body;
  console.log(email);

  try {
    // Rechercher un utilisateur par email
    const user = await UserModel.findUnique({
      where: {
        email: email,
      },
    });

    console.log(user);

    // Vérification si l'utilisateur existe
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { email: user.email, userId: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Définir la session
    // req.session.authenticated = true;
    // req.session.user = {
    //   email: user.email,
    //   username: user.username,
    //   role: user.role,
    // };

    // Répondre avec les informations de l'utilisateur et le token
    return res.json({
      message: "Logged in successfully",
      user: { username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res, next) {
  const { email, password, codeLandLord } = req.body;
  console.log(email);

  try {
    // Rechercher un utilisateur par email
    const user = await UserModel.findUnique({
      where: {
        email: email,
      },
    });

    console.log(user);

    // Vérification si l'utilisateur existe
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const isCodeLandLordValid = await LandloardModel.findUnique({
      where: {
        code_landLoard: codeLandLord,
      },
    });

    if (!isCodeLandLordValid) {
      return res.status(400).json({ message: "Invalid code of the LandLord" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { email: user.email, userId: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Définir la session
    // req.session.authenticated = true;
    // req.session.user = {
    //   email: user.email,
    //   username: user.username,
    //   role: user.role,
    // };

    // Répondre avec les informations de l'utilisateur et le token
    return res.json({
      message: "Logged in successfully",
      user: { username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
/*
--------------------------
Logout if user is logged 
--------------------------
*/
async function logout(req, res) {
  return res.send("logout true");
}

/*
--------------------------
Recover user account 
--------------------------
*/
async function recoverAccount(req, res) {
  return res.send("User account is recovered");
}

/*
--------------------------
Delete user account 
--------------------------
*/
async function deleteAccount(req, res) {
  const { userId } = req.params;
  console.log(id);

  try {
    const accompteTodelete = await UserModel.delete({
      where: { id: +userId },
    });
    if (accompteTodelete) {
      return res.status(202).send("Tu as suprimer avec success");
    } else {
      return res.status(202).send("not found");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

module.exports = {
  activateAccount,
  deleteAccount,
  logout,
  recoverAccount,
  signin,
  signup,
  login,
};
