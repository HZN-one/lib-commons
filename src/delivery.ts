export interface IPriceStandardObject {
  name: string;
  serviceType: string;
  vehicleType: string;
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
}

export interface IOrderRequestBody {
  merchantOrderId: string;
  serviceType: string;
  origin: IAddress;
  sender: IContact;
  destinations: IDestination[];
  hasInsurance: Boolean;
  insuranceAmount: number;
  insuranceAmountFee: number;
}

export interface IOrderStandardObject {
  deliveryId: string;
}

export namespace IOrderDetail {
  interface Item {
    name?: string;
    quantity?: string;
    desecription?: string;
    price?: number;
    invoiceNo?: string;
    dimensons?: {
      height?: number;
      width?: number;
      depth?: number;
      weight?: number;
    };
  }

  interface Destination {
    deliveryId?: string;
    address?: string;
    keywords?: string;
    coordinates?: {
      latitude?: number;
      longitude?: number;
    };
    city?: string;
    district?: string;
    postalCode?: string;
    recipient?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      title?: string;
      companyName?: string;
    };
    items?: Item[];
  }

  export interface StandardObject {
    orderId?: string;
    status?: 'NEW' | 'EXPIRED' | 'CANCELLED' | 'SUBMITTED';
    driver?: {
      id?: string;
      name?: string;
      phone?: string;
      photo?: string;
    };
    vehicleType?: {
      id?: string;
      number?: string;
      name?: string;
    };
    serviceType?: string;
    currency?: {
      code?: 'IDR' | 'USD';
      symbol?: 'Rp' | 'US$';
      exponent?: 2;
    };
    amount?: number;
    discountAmount?: number;
    finalAmount?: number;
    distance?: number;
    sender?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      title?: string;
      companyName?: string;
      instruction?: string;
    };
    origin?: {
      address?: string;
      keywords?: string;
      coordinate?: {
        latitude?: number;
        longitude?: number;
      };
      city?: string;
      district?: string;
      postalCode?: string;
    };
    destinations?: Destination[];
    estimatedTimeline?: {
      pickup?: string;
      dropoff?: string;
    };
    isUseInsurance?: boolean;
    insuranceAmount?: number;
    isCancellable?: boolean;
    submittedAt?: string;
    completedAt?: string;
    cancelledAt?: string;
  }
}

export namespace IOrderCancellation {
  export interface StandardObject {
    isSuccess?: boolean;
    isCancelled?: boolean;
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
