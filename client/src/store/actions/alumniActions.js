import AlumniServices from '../../services/api/AlumniServices';

export const LOAD_ALUMNI_START = "LOAD_ALUMNI_START";
export const LOAD_ALUMNI_SUCCESS = "LOAD_ALUMNI_SUCCESS";
export const MOER_ALUMNI_TO_LOAD = "MOER_ALUMNI_TO_LOAD";

//Load product catalog
export const loadAlumni = () => {
  return function(dispatch) {
    dispatch(loadAlumniStart())
    return AlumniServices.getAlumni()
      .then((result) => {
        dispatch(moreAlumniToLoad(result.moreAlumni))
        for(let alumnus of result.alumni) {
          dispatch(loadAlumniSuccess(alumnus))
        }
      })
      .catch((err) => {
        throw err;
      }) 
  }
};

export const loadAlumniStart = () => ({
  type: LOAD_ALUMNI_START,
});


export const loadAlumniSuccess = (result) => {
  return {
    type: LOAD_ALUMNI_SUCCESS,
    payload: result
  };
};

export const moreAlumniToLoad = (result) => {
  return {
    type: MOER_ALUMNI_TO_LOAD,
    payload: result
  };
};

