import type { Getters } from "@/stores/globalStore/getters";
import type { Mutations } from "@/stores/globalStore/mutations";
import type { CreateOrderResponse, GetPaymentFundsResponse } from "@/api/types/api.response";
import { EmployeeService } from "@/services/employeeService";
import type { Order } from "@/views/menu/subViews/cart/models/CartItem";
import { OrderService } from "@/services/orderService";

export interface Actions {
  changeLanguage(lang: string): void;
  getEmployeePaymentFunds(userId: number): Promise<GetPaymentFundsResponse>;
  createOrder(data: Order): Promise<CreateOrderResponse>;
}

const createActions = (mutations: Mutations, getters: Getters): Actions => {
  const changeLanguage = (lang: string): void => {
    mutations.SET_LANGUAGE(lang);
  };

  const getEmployeePaymentFunds = async (userId: number): Promise<GetPaymentFundsResponse> => {
    return await EmployeeService.getPaymentFunds(userId);
  };

  const createOrder = async (data: Order): Promise<CreateOrderResponse> => {
    return await OrderService.createOrder(data);
  };

  return {
    changeLanguage,
    getEmployeePaymentFunds,
    createOrder,
  };
};

export default createActions;
