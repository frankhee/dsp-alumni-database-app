import AlumniServices from '../../services/api/AlumniServices';

export const LOAD_ALUMNI_START = "LOAD_ALUMNI_START";
export const LOAD_ALUMNI_SUCCESS = "LOAD_ALUMNI_SUCCESS";
export const MOER_ALUMNI_TO_LOAD = "MOER_ALUMNI_TO_LOAD";
export const CLEAR_ALUMNI_INFO = "CLEAR_ALUMNI_INFO";
export const REQUEST_IS_SEARCH = "REQUEST_IS_SEARCH";
export const IS_VALID_SEARCH = "IS_VALID_SEARCH";

//Load all alumni or specified alumni
export const loadAlumni = (input = null) => {
  return function(dispatch) {
    dispatch(loadAlumniStart())
    if(input) {
      dispatch(requestIsSearch(true))
      dispatch(clearAlumniInfo())
      return AlumniServices.searchAlumni(input)
      .then((result) => {
          dispatch(isValidSearch(result.isValidSearch))
          dispatch(moreAlumniToLoad(result.moreAlumni))
          for(let alumnus of result.alumni) {
            dispatch(loadAlumniSuccess(alumnus))
          }
        })
        .catch((err) => {
          throw err;
        }) 
      } else {
        dispatch(requestIsSearch(false))
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

export const clearAlumniInfo = () => {
  return {
    type: CLEAR_ALUMNI_INFO,
  }
};

export const requestIsSearch = (result) => {
  return {
    type: REQUEST_IS_SEARCH,
    payload: result
  };
};

export const isValidSearch = (result) => {
  return {
    type: IS_VALID_SEARCH,
    payload: result
  };
};

