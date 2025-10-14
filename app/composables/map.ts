export const useMapAPI = () => {
    return "U2FsdGVkX19tYOzG/6BKcdSn46nHtd1jLesmkjJ2OSIV2JyWMDMeS6QohPGRiEI+hsSXqL6kFKihGWN8TnoKTQ==";
};

export const getGoogleMapURL = (destinationLat: number, destinationLng: number, originLat: number = 0, originLng: number = 0 ) => {
    let googleUrl: string;

    if (originLat && originLng) {
      googleUrl =
          `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}&travelmode=driving`;
    } else {
      googleUrl =
          `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&travelmode=driving`;
    }
    return googleUrl;
}

export const openGoogleMap = (lat: number, lng: number) => {
  const mainStore = useMainStore();
  const mapUrl = getGoogleMapURL(lat, lng, mainStore.currentlatlng.lat, mainStore.currentlatlng.lng);
  console.log('mapUrl ', mapUrl)
  useStartNativeApplicationByURL(mapUrl)
};
