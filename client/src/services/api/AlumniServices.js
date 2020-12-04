import HttpRequest from './HttpRequest';

//Request to load product catalog
function getAlumni() {
  return HttpRequest({
    url: `/api/alumni/allalumni`,
    method: `GET`,
  });
};

//Request to send additional product information to user
// function getProduct(id) {
//   return HttpRequest({
//     url: `/api/products/product`,
//     method: `POST`,
//     data: id
//   });
// };

const AlumniServices = {
  getAlumni,
  // getProduct
};

export default AlumniServices;