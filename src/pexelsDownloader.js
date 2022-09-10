import { createClient } from "pexels";

const client = createClient(
  "563492ad6f917000010000019dfd5c125264439e9b6bc90fec4226d1"
);
const query = "Nature";

client.photos.search({ query, per_page: 1 }).then((photos) => {
  console.log(photos);
});
