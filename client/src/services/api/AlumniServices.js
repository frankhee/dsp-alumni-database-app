import HttpRequest from './HttpRequest';

//GET request to load all alumni info
function getAlumni() {
  return HttpRequest({
    url: `/api/alumni/allalumni`,
    method: `GET`,
  });
};

//POST request to load specified alumni info
function searchAlumni(input) {
  return HttpRequest({
    url: '/api/alumni/searchalumni',
    method: 'POST',
    data: input
  })
}

const AlumniServices = {
  getAlumni,
  searchAlumni
};

export default AlumniServices;