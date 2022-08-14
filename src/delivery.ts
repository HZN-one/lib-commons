export interface IVehicleTypePartner {
  id: string;
  name?: string;
}

export type IServiceTypeCategory =
  | "instant"
  | "sameday"
  | "regular"
  | "nextday"
  | "economy";

export type IVehicleTypeCategory = "bike" | "car" | "other";

export interface IPriceStandardObject<
  TServiceType = string,
  TVehicleType = string
> {
  name: string;
  serviceType: TServiceType;
  vehicleType: TVehicleType;
  currency: string;
  amount: number;
  distance: number;
  vehicleTypePartner?: IVehicleTypePartner;
  serviceTypeCategory?: IServiceTypeCategory;
  vehicleTypeCategory?: IVehicleTypeCategory;
  meta?: any;
}

export interface ICoordinate {
  latitude: number;
  longitude: number;
}

export interface IAddress {
  address?: string;
  keywords?: string;
  coordinate: ICoordinate;
  province?: string;
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

export interface IPriceRequestBody<
  TServiceType = string,
  TVehicleType = string
> {
  serviceType?: TServiceType;
  vehicleType?: TVehicleType;
  sender?: IContact;
  origin: IAddress;
  destinations: IDestination[];
}

export interface IOrderRequestBody {
  merchantOrderId: string;
  serviceType: string;
  vehicleType?: string;
  origin: IAddress;
  destinations: IDestination[];
  sender: IContact;
  hasInsurance?: boolean;
  insuranceAmount?: number;
  insuranceAmountFee?: number;
  meta?: any;
}

export interface IOrderStandardObject {
  /**
   * Possibly the value same as the receipt number.
   */
  deliveryId: string;
  /**
   * Must fill this property when AWB/receipt exists in order creation result.
   * Some partners use the same value between delivery ID and receipt number
   */
  receiptNumber?: string;
  /**
   * A final fee that will not change until an order complete
   */
  finalFee?: number;
  meta?: any;
}

export namespace IOrderDetail {
  export interface StandardObject {
    /**
     * Possibly the value same as the receipt number.
     */
    deliveryId?: string;
    /**
     * Must fill this property when AWB/receipt exists in order creation result.
     * Some partners use the same value between delivery ID and receipt number
     */
    receiptNumber?: string;
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
    photo?: {
      deliveryProofs?: string[];
      signatures?: string;
    };
  }
}

export interface ICancelRequestBody {
  reason?: string;
}

export namespace IOrderCancellation {
  export interface StandardObject {
    isSuccess?: boolean;
    isCancelled?: boolean;
    message?: string;
  }
}

export namespace IOrderWebhook {
  export type HZNStatus =
    | ""
    | "NEW ORDER"
    | "ALLOCATING"
    | "REJECTED"
    | "DRIVER ASSIGNED"
    | "PICKING UP"
    | "DRIVER NOT FOUND"
    | "ITEM PICKED"
    | "ON DELIVERY"
    | "RECEIVED"
    | "COMPLETED"
    | "REACTIVATED"
    | "ON HOLD"
    | "CANCELLED"
    | "DELAYED"
    | "EXPIRED"
    | "RETURNED"
    | "FAILED"
    | "ORDER MANIFESTED"
    | "ALLOCATING COURRIER"
    | "COURRIER EN-ROUTE TO PICKUP"
    | "PICKUP SUCCEDED"
    | "PICKUP FAILED"
    | "REASSIGN COURRIER"
    | "ARRIVED AT SORTING HUB"
    | "ON PROCESS AT SORTING HUB"
    | "DEPARTED FROM SORTING HUB"
    | "SHIPMENT ARRIVED IN DESTINATION CITY"
    | "SHIPMENT IN TRANSIT"
    | "DEPARTED TO DESTINATION"
    | "SHIPMENT RECEIVED"
    | "SHIPMENT FAILED"
    | "CANCEL BY SYSTEM"
    | "CANCEL BY ADMIN"
    | "CANCEL BY USER"
    | "SHIPMENT RETURNED"
    | "RETURNED TO SENDER";

  export interface StandardObject extends IOrderDetail.StandardObject {
    status?: HZNStatus;
    timestamp?: number;
    meta?: any;
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
