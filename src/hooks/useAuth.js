import {
  completeProfile,
  deleteAccount,
  fetchProfile,
  forgotPassword,
  login,
  logout,
  resendForgotOtp,
  resendSignupOtp,
  resetPassword,
  signup,
  verifySignup,
} from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.user);

  return {
    ...state,
    signup: (d) => dispatch(signup(d)).unwrap(),
    verifySignup: (d) => dispatch(verifySignup(d)).unwrap(),
    resendSignupOtp: (d) => dispatch(resendSignupOtp(d)).unwrap(),
    login: (d) => dispatch(login(d)).unwrap(),
    completeProfile: (d) => dispatch(completeProfile(d)).unwrap(),
    fetchProfile: (d) => dispatch(fetchProfile(d)).unwrap(),
    logout: () => dispatch(logout()).unwrap(),
    forgotPassword: (d) => dispatch(forgotPassword(d)).unwrap(),
    resetPassword: (d) => dispatch(resetPassword(d)).unwrap(),
    resendForgotOtp: (d) => dispatch(resendForgotOtp(d)).unwrap(),
    deleteAccount: () => dispatch(deleteAccount()).unwrap(),
  };
};
