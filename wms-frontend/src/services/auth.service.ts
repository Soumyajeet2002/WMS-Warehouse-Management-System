import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'VENDOR';
  vendorId: string | null;
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

export const login = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    '/auth/login',
    data,
  );

  return response.data;
};

export const signup = async (
  data: SignupRequest,
) => {
  const response = await api.post(
    '/auth/signup',
    data,
  );

  return response.data;
};

export const getMe = async (): Promise<AuthUser> => {
  const response = await api.get<AuthUser>(
    '/auth/me',
  );

  return response.data;
};