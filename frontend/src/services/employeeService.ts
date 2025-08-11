import api from "@/api/client";
import type { GetPaymentFundsResponse } from "@/api/types/api.response";

export class EmployeeService {
  static async getPaymentFunds(userId: number): Promise<GetPaymentFundsResponse> {
    return await api.get<GetPaymentFundsResponse>(`self_checkout_devices/employees/${userId}/payment_funds`, "v2");
  }
}
