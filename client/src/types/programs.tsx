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

export interface ApplyListVal {
  id: number;
  programId: number;
  user: {
    id: number;
    introduction: string | null;
    kind: number;
    loginId: string;
    nickname: string;
    picture: null | Blob;
    role: string;
  };
  createdTime: string;
}

export interface PaginationVal {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
