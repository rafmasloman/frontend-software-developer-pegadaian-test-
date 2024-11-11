import axios from 'axios';
import { IApiBaseResponse } from '../BaseApiInterface';
import {
  ICustomerApiRequestData,
  ICustomerApiResponseData,
} from './CustomerInterface';

class CustomerService {
  async getAllCustomers(): Promise<
    IApiBaseResponse<ICustomerApiResponseData[]>
  > {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data: IApiBaseResponse<ICustomerApiResponseData[]> = response.data;

      return { ...data, statusCode: response.status };
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  async getCustomerDetail(
    customerId: string,
  ): Promise<IApiBaseResponse<ICustomerApiResponseData>> {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/${customerId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data: IApiBaseResponse<ICustomerApiResponseData> = response.data;
      console.log('response : ', data.data);

      return data;
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  async createCustomer(
    payload: ICustomerApiRequestData,
  ): Promise<IApiBaseResponse<ICustomerApiResponseData>> {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/customer/`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data: IApiBaseResponse<ICustomerApiResponseData> = response.data;

      return {
        ...data,
        statusCode: response.status,
      };
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  async updateCustomer(
    customerId: string,
    payload: ICustomerApiRequestData,
  ): Promise<IApiBaseResponse<ICustomerApiResponseData>> {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/customer/${customerId}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data: IApiBaseResponse<ICustomerApiResponseData> = response.data;

      return {
        ...data,
        statusCode: response.status,
      };
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }

  async deleteCustomer(
    customerId: string,
  ): Promise<IApiBaseResponse<ICustomerApiResponseData>> {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/customer/${customerId}`,

        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data: IApiBaseResponse<ICustomerApiResponseData> = response.data;

      return { ...data, statusCode: response.status };
    } catch (error) {
      console.log('error : ', error);

      throw error;
    }
  }
}

const customerApiService = new CustomerService();

export default customerApiService;
