export interface IPriceStandarObject {
  name: string;
  service_type: string;
  vehicle_type?: string;
  currency: string;
  amount: number;
  distance: number;
}
export interface ICoordinate {
  latitude: number;
  longitude: number;
}
export interface IAddress {
  address?: string;
  keywords?: string;
  coordinate: ICoordinate;
  city?: string;
  district?: string;
  postalCode?: string;
}

export interface IContact {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  title?: string;
  companyName?: string;
  instruction?: string;
}

export interface IItem {
  name?: string;
  quantity: number;
  description?: string;
  price: number;
  invoiceNo?: string;
  dimension: {
    height: number;
    width: number;
    depth: number;
    weight: number;
  };
}
export interface IDestination extends IAddress {
  deliveryID?: string;
  recipient: IContact;
  items: IItem[];
}
export interface IPriceRequestBody {
  sender: IContact;
  origin: IAddress;
  destinations: IDestination[];
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
