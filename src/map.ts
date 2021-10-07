import { ICoordinate } from ".";

type IDistanceUnit = "M" | "KM" | "Miles";

export const Map = {
  /**
   * A function to calculate distance between 2 point
   *
   * @param origin          ICoordinate
   * @param destination     ICoordinate
   * @param data        any
   * @example
   *
   *    Map.distance(
   *      { lat: 0, long: 0 },
   *      { lat: 0, long: 0 }
   *    )
   */
  distance: (
    origin: ICoordinate,
    destination: ICoordinate,
    unit: IDistanceUnit = "M"
  ): number => {
    if (
      origin.latitude == destination.latitude &&
      origin.longitude == destination.longitude
    ) {
      return 0;
    } else {
      var radlat1 = (Math.PI * origin.latitude) / 180;
      var radlat2 = (Math.PI * destination.latitude) / 180;
      var theta = origin.longitude - destination.longitude;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "KM") {
        dist = dist * 1.609344;
      }
      if (unit == "Miles") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  },
};
