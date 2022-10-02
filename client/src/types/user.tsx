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

export interface UserVal extends SignUpVal {
  id: number;
  loginId: string;
  nickname: string;
  introduction: string;
  kind: any;
  userImages: Blob | undefined;
}
