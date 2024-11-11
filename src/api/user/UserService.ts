import axios from 'axios';
import { IApiBaseResponse } from '../BaseApiInterface';
import { IUserApiRequestData, IUserApiResponseData } from './UserInterface';

class UserService {
  async getAllUsers(): Promise<IApiBaseResponse<IUserApiResponseData[]>> {
    try {
      const response = await axios.get(`http://localhost:8080/users/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: IApiBaseResponse<IUserApiResponseData[]> = response.data;

      return { ...data, statusCode: response.status };
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  async getUserDetail(
    userId: string,
  ): Promise<IApiBaseResponse<IUserApiResponseData>> {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data: IApiBaseResponse<IUserApiResponseData> = response.data;
      console.log('response : ', data.data);

      return data;
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  async createUser(
    payload: IUserApiRequestData,
  ): Promise<IApiBaseResponse<IUserApiResponseData>> {
    try {
      const response = await axios.post(
        `http://localhost:8080/users/`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data: IApiBaseResponse<IUserApiResponseData> = response.data;

      return {
        ...data,
        statusCode: response.status,
      };
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  async updateUser(
    userId: string,
    payload: IUserApiRequestData,
  ): Promise<IApiBaseResponse<IUserApiResponseData>> {
    try {
      const response = await axios.put(
        `http://localhost:8080/users/${userId}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data: IApiBaseResponse<IUserApiResponseData> = response.data;

      return {
        ...data,
        statusCode: response.status,
      };
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  async deleteUser(
    userId: string,
  ): Promise<IApiBaseResponse<IUserApiResponseData>> {
    try {
      const response = await axios.delete(
        `http://localhost:8080/users/${userId}`,

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data: IApiBaseResponse<IUserApiResponseData> = response.data;

      return { ...data, statusCode: response.status };
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }
}

const userApiService = new UserService();

export default userApiService;
