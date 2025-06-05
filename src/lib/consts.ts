// export const SKIP_API_URL =
//   "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

export const SKIP_API_URL = `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=LE10&area=Hinckley`;

export const SKIP_IMAGE_URL = (size: number) =>
  `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`;
