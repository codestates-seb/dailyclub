import axios, { AxiosResponse } from 'axios';

interface ProgramType {
  id: string;
  title: string;
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_DEV_URL,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.post(url).then(responseBody),
};

export const API = {
  // User

  // login: <T>(data: T) => {
  //   return requests({ method: 'POST' as Method, url: REQUEST_URL.LOGIN, data });
  // },
  login: <T>(data: T): Promise<ProgramType[]> =>
    requests.post('/login', { data }),

  // Program
  getProgram: (): Promise<ProgramType[]> => requests.get('program'),
  getAProgram: (id: number): Promise<ProgramType> =>
    requests.get(`programs/${id}`),
  createPost: (post: ProgramType): Promise<ProgramType> =>
    requests.post('programs', post),
  updatePost: (post: ProgramType, id: number): Promise<ProgramType> =>
    requests.put(`programs/${id}`, post),
  deletePost: (id: number): Promise<void> => requests.delete(`programs/${id}`),
};

/* 사용할 때
	useEffect(() => {
		Program.getProgram()
			.then((data) => {
				setPosts(data);
			})
			.catch((err) => {
				setIsError(true);
			});
		return () => {};
	}, []);

*/
