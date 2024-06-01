import axios from "axios";

const imgBB_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMGBB_KEY
}`;

/**
 * Uploads an image to imgBB and calls the callback with the image URL.
 *
 * @param {File} image - The image file to upload.
 * @param {Function} callback - The callback function to execute with the image URL.
 */
const imgBB = (image, callback) => {
  const imgBBFormData = new FormData();
  imgBBFormData.append("image", image);
  axios
    .post(imgBB_url, imgBBFormData)
    .then(({ data }) => {
      callback(data.data.display_url);
    })
    .catch(console.dir);
};

export default imgBB;
