import { ICoordinate } from ".";

type IDistanceUnit = "M" | "KM" | "Miles";

type RecommendationRouteParam = Array<ICoordinate & { id: string }>;
type DetailRoute = {
  key: string;
  distance: number;
};

interface IRoute {
  totalDistance: number;
  detailRoutes: DetailRoute[];
  sortedLocations: RecommendationRouteParam[];
}
interface IRecommendationRouteReturn {
  possibilityRoutes: IRoute[];
  recommendationRoute: IRoute;
}

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
   *      { latitude: 0, longitude: 0 },
   *      { latitude: 0, longitude: 0 }
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
  /**
   * A function that used for find optimize route between some locations
   *
   * @param coordinates          RecommendationRouteParam[]
   * @example
   *
   *    Map.recommendationRoute([
   *      { id: "Tangerang", latitude: number, longitude: number },
   *      { id: "Jakarta", latitude: number, longitude: number }
   *    ])
   */
  recommendationRoute: (
    coordinates: RecommendationRouteParam
  ): IRecommendationRouteReturn => {
    const coordinate = {};

    const distanceMap = {};
    const distanceMaps: DetailRoute[] = [];

    //  Get distance for origin - destination, ex: ABC-GHZ: 10km
    coordinates.forEach((originCoordinate) => {
      coordinate[originCoordinate.id] = originCoordinate;
      // Collecting distances based on lat long
      coordinates
        .filter(({ id }) => id !== originCoordinate.id)
        .forEach((destinationCoordinate) => {
          const distanceKey = [
            `${originCoordinate.id}-${destinationCoordinate.id}`,
            `${destinationCoordinate.id}-${originCoordinate.id}`,
          ];
          if (
            typeof distanceMap[distanceKey[0]] === "undefined" &&
            typeof distanceMap[distanceKey[1]] === "undefined"
          ) {
            distanceMap[distanceKey[0]] = true;
            distanceMap[distanceKey[1]] = true;

            distanceMaps.push({
              key: distanceKey[0],
              distance: Map.distance(originCoordinate, destinationCoordinate),
            });
          }
        });
    });

    // Short by distance
    distanceMaps.sort((a, b) => a.distance - b.distance);

    const getDetailRouteBasedOnFirstRoute = (distanceMap) => {
      const detailRoutes = [distanceMap];
      const tempKeys = [distanceMap.key];

      // Determine Next Route ex: ABC-GHZ, is the next GHZ-... or ABC-...
      distanceMaps.forEach((_, index) => {
        const detailRoutesLength = detailRoutes.length;
        const lastTempRoute = detailRoutes[detailRoutesLength - 1];
        const lastTempRouteIds = lastTempRoute.key.split("-"); // ex: ["ABC", "GHZ"]

        const usedIds: string[] = [];

        if (detailRoutesLength >= 2) {
          const duplicateDetailRoutes = [...detailRoutes];
          duplicateDetailRoutes.pop();
          duplicateDetailRoutes.forEach((duplicateTempRoute) => {
            duplicateTempRoute.key.split("-").forEach((id) => {
              usedIds.push(id);
            });
          });
        }

        const remainingRoute = distanceMaps.filter((el) => {
          const elKeys: string[] = el.key.split("-");
          const possibleKeyFirst = `${elKeys[0]}-${elKeys[1]}`;
          const possibleKeySecond = `${elKeys[1]}-${elKeys[0]}`;

          return (
            !tempKeys.includes(possibleKeyFirst) &&
            !tempKeys.includes(possibleKeySecond) &&
            !usedIds.includes(elKeys[0]) &&
            !usedIds.includes(elKeys[1])
          );
        });

        const shortestBasedOnFirstId = remainingRoute.filter(
          (el) => el.key.includes(lastTempRouteIds[0]) // ex: ABC
        );

        const shortestBasedOnSecondId = remainingRoute.filter(
          (el) => el.key.includes(lastTempRouteIds[1]) // ex: GHZ
        );

        let selectedTempRoute;

        if (shortestBasedOnFirstId.length && shortestBasedOnSecondId.length) {
          const firstDistance = shortestBasedOnFirstId[0];
          const secondDistance = shortestBasedOnSecondId[0];

          if (firstDistance.distance < secondDistance.distance) {
            selectedTempRoute = firstDistance;
          } else {
            selectedTempRoute = secondDistance;
          }
        } else if (shortestBasedOnFirstId.length) {
          selectedTempRoute = shortestBasedOnFirstId[0];
        } else if (shortestBasedOnSecondId.length) {
          selectedTempRoute = shortestBasedOnSecondId[0];
        }

        if (selectedTempRoute) {
          detailRoutes.push(selectedTempRoute);
          tempKeys.push(selectedTempRoute.key);
        }
      });

      const sortedLocations: RecommendationRouteParam[] = [];
      const usedSortedId: string[] = [];
      let totalDistance = 0;

      detailRoutes.forEach((detailRoute, index, arr) => {
        const [firstId, secondId]: string[] = detailRoute.key.split("-");
        if (index === 0) {
          usedSortedId.push(firstId);
          usedSortedId.push(secondId);
          if (!arr[index + 1].key.includes(firstId)) {
            sortedLocations.push(coordinate[firstId]);
            sortedLocations.push(coordinate[secondId]);
          } else {
            sortedLocations.push(coordinate[secondId]);
            sortedLocations.push(coordinate[firstId]);
          }

          totalDistance += detailRoute.distance;
        } else {
          const isFirstIDAlreadyUsed = usedSortedId.includes(firstId);
          const iSecondIDAlreadyUsed = usedSortedId.includes(secondId);
          if (isFirstIDAlreadyUsed || iSecondIDAlreadyUsed) {
            totalDistance += detailRoute.distance;
          }

          if (!isFirstIDAlreadyUsed) {
            usedSortedId.push(firstId);
            sortedLocations.push(coordinate[firstId]);
          }

          if (!iSecondIDAlreadyUsed) {
            usedSortedId.push(secondId);
            sortedLocations.push(coordinate[secondId]);
          }
        }
      });

      return { detailRoutes, sortedLocations, totalDistance };
    };

    const possibilityRoutes = distanceMaps.map((distanceMap) => {
      return getDetailRouteBasedOnFirstRoute(distanceMap);
    });

    // Short by possibility route
    possibilityRoutes.sort((a, b) => a.totalDistance - b.totalDistance);

    return {
      possibilityRoutes,
      recommendationRoute: possibilityRoutes[0],
    };
  },
};
