import { User } from "../models/user.js";

export const checkCredentials = async (userInfo) => {
  for (let prop in userInfo) {
    if (!userInfo[prop] || String(userInfo[prop]).trim() === "") {
      return false;
    }
  }
  return true;
};

export const checkUserSignUpInfo = async (key, value) => {
  const user = await User.findOne({ where: { [key]: value } });
  if (!user) {
    return true;
  } else {
    return false;
  }
};

export const checkUserSignInInfo = async (key, value) => {
    const user = await User.findOne({ where: { [key]: value } });
    return user;
}

export const validEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email);
};

export const validPhone = (phone) => {
  const regex = /^[+]?[\d\s\-()]{7,20}$/;
  return regex.test(phone);
};

export const validDOB = (dob) => {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
  if (!regex.test(dob)) return false;

  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18;
};
