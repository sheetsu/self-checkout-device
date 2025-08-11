import api from "@/api/client";
import type { CreateOrderDTO } from "@/api/types/api.dto";
import type { CreateOrderResponse } from "@/api/types/api.response";

export class OrderService {
  static async createOrder(data: CreateOrderDTO): Promise<CreateOrderResponse> {
    return await api.post<CreateOrderResponse, CreateOrderDTO>('self_checkout_devices/orders', "v2", data);
  }
}
