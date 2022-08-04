export const uploadImg = (ev) => {
  //Defining our variables
  const UPLOAD_PRESET = 'casa_like'; //insert yours
  const CLOUD_NAME = 'dpwyhvd1e'; //insert yours
  const DOWNLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const FORM_DATA = new FormData();
  // https://res.cloudinary.com/dpwyhvd1e/image/upload/v1648473465/casaLike/stays/${005}.jpeg
  //Building the request body
  FORM_DATA.append('file', ev.target.files[0]); // form data kind of key : file, add the file we get
  FORM_DATA.append('upload_preset', UPLOAD_PRESET); // add the upload_preset
  //Sending a post method request to Cloudinary`s API
  return fetch(DOWNLOAD_URL, {
    // add the img to Cloudinary
    method: 'GET',
    body: FORM_DATA,
  })
    .then((res) => res.json())
    .then((res) => res) //return the res
    .catch((err) => console.error(err));
};
