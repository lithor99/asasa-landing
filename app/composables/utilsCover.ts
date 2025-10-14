export const coverArea = (val: number) => {
  let result: number;
  let unit: string;

  if (val >= 10000) {
    // 1 hectare or more
    result = val / 10000; // round to 2 decimal places
    unit = "ha";
  } else {
    result = val; // round to 2 decimal places
    unit = "m²";
  }
  const formatted = result.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatted + " " + unit;
};

export const coverPrice = (val: number) => {
  let result: number;
  let unit: string;
  let formatted: string = "0";

  if (val >= 1000000) {
    result = val / 1000000; // up to 2 decimals
    unit = "M";
    formatted = result.toLocaleString('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  } else if (val >= 1000) {
    result = val / 1000; // up to 2 decimals
    unit = "K";
    formatted = Math.floor(result).toLocaleString()
  } else {
    result = val;
    unit = "";
    formatted = Math.floor(result).toLocaleString()
  }
  return formatted + (unit ? "" + unit : "");
};

export const meterToKm = (value: any) => {
  const val = Number(value);
  if (val < 1000) {
    return `${val.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} m`;
  } else {
    return `${(val / 1000).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} km`;
  }
};

export const  getYouTubeVideoId = (url: string) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}