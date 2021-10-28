export interface IVehicleTypePartner {
  id: string;
  name?: string;
}

export interface IPriceStandardObject {
  name: string;
  serviceType: string;
  vehicleType: string;
  currency: string;
  amount: number;
  distance: number;
  vehicleTypePartner?: IVehicleTypePartner;
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
  dimension: {
    height: number;
    width: number;
    depth: number;
    weight: number;
  };
}

export interface IDestination extends IAddress {
  recipient: IContact;
  items: IItem[];
}

export interface IPriceRequestBody {
  serviceType?: string;
  sender: IContact;
  origin: IAddress;
  destinations: IDestination[];
  packages?: IItem[];
}

export interface IOrderRequestBody {
  merchantOrderId: string;
  serviceType: string;
  origin: IAddress;
  destinations: IDestination[];
  sender: IContact;
  recipient: IContact;
  hasInsurance: Boolean;
  insuranceAmount: number;
  insuranceAmountFee: number;
}

export interface IOrderStandardObject {
  deliveryId: string;
}

export namespace IOrderDetail {
  export interface StandardObject {
    deliveryId?: string;
    trackingUrl?: string;
    status?: string;
    driver?: {
      id?: string;
      name?: string;
      phone?: string;
      photo?: string;
    };
    estimatedTimeline?: {
      pickup?: string;
      dropoff?: string;
    };
  }
}

export namespace IOrderCancellation {
  export interface StandardObject {
    isSuccess?: boolean;
    isCancelled?: boolean;
    message?: string;
  }
}

export const Delivery = {
  /**
   * A function to standarize a price object
   *
   * @param data     Object reference IPriceStandardObject (This interface exported)
   * @example
   *
   *    const standarizeData = Delivery.toPriceStandarObject(data);
   */
  toPriceStandardObject(data: IPriceStandardObject) {
    return data;
  },
  toOrderStandardObject(data: IOrderStandardObject) {
    return data;
  },
  toOrderDetailStandardObject(data: IOrderDetail.StandardObject) {
    return data;
  },
  toOrderCancellationStandardObject(data: IOrderCancellation.StandardObject) {
    return data;
  },
};
