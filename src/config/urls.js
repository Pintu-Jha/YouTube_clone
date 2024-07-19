export const url =
  'https://pxkejxwftytuarcqafrb.supabase.co/storage/v1/object/public/';

export const getApiURL = endpoint => url + endpoint;
export const videoEndpoint = getApiURL('videos/');
export const ProfileImageEndPoint = getApiURL('profile/');
