const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const authService= require('./auth.service');
const tokenService = require('./token.service')
const orgService = require("../organization/organization.service")
const { sendResponse } = require('../../utils/responseHandler');
const pick = require('../../utils/pick');

const register = catchAsync(async (req, res) => {

  try {
    const {
      orgName,
      network,
      chainId,
      subDomain,
      email,
      password,
      name,
    } = pick(req.body, [
      "orgName",
      "network",
      "chainId",
      "subDomain",
      "email",
      "password",
      "name",
    ]);
    const isEmailTaken = await authService.checkEmail(email)
    if (isEmailTaken) {
			sendResponse(res, httpStatus.BAD_REQUEST, "Email Already taken", null, null);
			return
		}
    const orgObj = {
      orgName,
      chainId,
      network,
      subDomain
    }
    const organization = await orgService.orgRegistration(orgObj)
    if(organization){
      let userObj = {
        email,
        password,
        name,
        orgId:organization.data.id
      };
      const user = await authService.signup(userObj);
      if(user){
        const tokens = await tokenService.generateAuthTokens(user);
        res.status(httpStatus.CREATED).send({ organization,user, tokens });
      }else{
        return { data: "User was not get register.", status:false,code:400 };
      }
    }else{
      return { data: "Organization was not get register.", status:false,code:400 };
    }
    
  } catch (error) {
    console.error("Error in registration", error);
  }

});



const adminHost = process.env.adminHost
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
    let reqOrigin = req.headers && req.headers.origin ? new URL(req.headers.origin) : ''
    let isAdmin = reqOrigin.host == adminHost
    const user = await authService.loginUserWithEmailAndPassword(email, password, isAdmin);
    /* INFO: Send error message in data directly just like below to maintain consistensy in APP */
    if(user && !user.user){
      sendResponse(res, httpStatus.FORBIDDEN, null,user.msg);
      return;
    }
    const tokens = await tokenService.generateAuthTokens(user.user);
    sendResponse(res, httpStatus.OK, { user:user.user, tokens }, null);
});



const getCurrentUser = catchAsync(async (req, res) => {
  try {
    const { token } = req.body;
    const userRes = await authService.getCurrentUser(token);
    if (userRes.status) {
      res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        status:true,
        data: { userData: userRes.userData, profileData:userRes.profileData }
      });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        status:false,
        data: 'something went wrong',
      });
    }
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      data: err.message,
    });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  getCurrentUser,
};
