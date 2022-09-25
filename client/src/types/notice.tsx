export interface LoginVal {
  loginId: string;
  password: string;
}

export interface SignUpVal extends LoginVal {
  //   loginId: string;
  //   password: string;
  email: string;
  nickname: string;
}
