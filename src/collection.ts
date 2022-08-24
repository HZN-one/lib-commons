import { IServiceTypeCategory, IVehicleTypeCategory, HZNDeliveryStatus } from '.';

const ServiceTypeCategoryCollection: IServiceTypeCategory[] = ['instant', 'sameday', 'regular', 'nextday', 'economy'];
const VehicleTypeCategoryCollection: IVehicleTypeCategory[] = ['bike', 'car', 'other'];
const HznStatusCollection: HZNDeliveryStatus[] = [
  '',
  'NEW ORDER',
  'ALLOCATING',
  'REJECTED',
  'DRIVER ASSIGNED',
  'PICKING UP',
  'DRIVER NOT FOUND',
  'ITEM PICKED',
  'ON DELIVERY',
  'RECEIVED',
  'COMPLETED',
  'REACTIVATED',
  'ON HOLD',
  'CANCELLED',
  'DELAYED',
  'EXPIRED',
  'RETURNED',
  'FAILED',
  'ON HOLD',
];

export const Collection = { ServiceTypeCategoryCollection, VehicleTypeCategoryCollection, HznStatusCollection };
