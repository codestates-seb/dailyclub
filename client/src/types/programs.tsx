export interface ProgramDetailVal {
  bookmarkId: number | null;
  createdDate: string;
  id: number;
  location: string;
  minKind: number;
  numOfRecruits: number;
  programDate: string;
  programImages: undefined | Blob;
  programStatus: string;
  text: string;
  title: string;
  writer: {
    id: number;
    introduction: null | number;
    kind: number;
    loginId: string;
    nickname: string;
    picture: null | Blob;
    role: string;
  };
}
