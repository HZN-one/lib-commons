export interface IPriceStandarObject {
  name: string;
  service_type: string;
  vehicle_type: string;
  currency: string;
  amount: string;
  distance: number;
}

export const Delivery = {
  /**
   * A function to standarize a price object
   *
   * @param data     Object reference IPriceStandarObject (This interface exported)
   * @example
   *
   *    const standarizeData = Delivery.toPriceStandarObject(data);
   */
  toPriceStandarObject(data: IPriceStandarObject) {
    return data;
  },
};
