const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { UserModel, LandloardModel, TenantsModel } = new PrismaClient();
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
  const infosSignup = req.body;
  let userRole =
    landLordRouteParams &&
    landLordRouteParams === process.env.LANDLORD_SECRET_SIGNUP_PARAMS_ROUTE
      ? "lessor"
      : "tenant";
  console.log(userRole);
  try {
    const newUser = await UserModel.create({
      data: {
        username: infosSignup.usernameOnRegister,
        password: await bcrypt.hash(infosSignup.passwordOnRegister, 10),
        email: infosSignup.emailOnRegister,
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
  const infosSignin = req.body;

  try {
    // Rechercher un utilisateur par email
    const user = await UserModel.findUnique({
      where: {
        email: infosSignin.email,
      },
    });

    console.log(user);

    // Vérification si l'utilisateur existe
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(
      infosSignin.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //recuperer le locataire ou bailleur qui a l'email saisi

    const lessor = await LandloardModel.findUnique({
      where: {
        email: user.email,
      },
      include: {
        houses: {
          include: {
            bails: true,
          },
        },
        tenants: {
          include: {
            bails: true,
            payements: true,
          },
        },
      },
    });

    const tenant = await TenantsModel.findUnique({
      where: {
        email: user.email,
      },
      include: {
        payements: true,
        bails: true,
      },
    });

    // Générer un token JWT
    const token = jwt.sign(
      { email: user.email, userId: user.id, role: user.role },
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
    console.log(lessor.id);
    return res.status(201).json({
      message: "Logged in successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        lessorId: lessor.id,
      },
      lessor: lessor,
      tenant: tenant,
      token,
    });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res, next) {
  const infosLogin = req.body;

  try {
    // Rechercher un utilisateur par email
    const user = await UserModel.findUnique({
      where: {
        email: infosLogin.tenantEmail,
      },
    });
    const tenant = await TenantsModel.findUnique({
      where: {
        email: user.email,
      },
      include: {
        payements: true,
        bails: true,
      },
    });

    const lessor = await LandloardModel.findUnique({
      where: {
        id: tenant.lessorId,
      },
    });

    console.log(user);
    console.log(tenant);

    // Vérification si l'utilisateur existe
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(
      infosLogin.tenantPassword,
      user.password
    );
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const isCodeLandLordValid = await LandloardModel.findUnique({
      where: {
        code_landLoard: infosLogin.codeLandlord,
      },
    });

    if (!isCodeLandLordValid) {
      return res.status(400).json({ message: "Invalid code of the LandLord" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { email: user.email, userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // res.cookie("token", token, {
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    // Définir la session
    // req.session.authenticated = true;
    // req.session.user = {
    //   email: user.email,
    //   username: user.username,
    //   role: user.role,
    // };

    // Répondre avec les informations de l'utilisateur et le token
    return res.status(201).json({
      message: "Logged in successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        tenantId: tenant.id,
      },
      lessor: lessor,
      tenant: tenant,
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
