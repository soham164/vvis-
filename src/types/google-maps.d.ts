declare namespace google {
  namespace maps {
    class Map {
      constructor(element: HTMLElement, options: MapOptions);
    }
    class Marker {
      constructor(options: MarkerOptions);
    }
    interface MapOptions {
      zoom: number;
      center: LatLngLiteral;
      styles?: MapTypeStyle[];
    }
    interface MarkerOptions {
      position: LatLngLiteral;
      map: Map;
      title?: string;
      icon?: string | Icon;
    }
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    interface Icon {
      url: string;
    }
    interface MapTypeStyle {
      elementType?: string;
      featureType?: string;
      stylers: { [key: string]: string }[];
    }
  }
}
