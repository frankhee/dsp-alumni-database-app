import { 
  LOAD_ALUMNI_START, 
  LOAD_ALUMNI_SUCCESS,
  MOER_ALUMNI_TO_LOAD 
} from "../actions/alumniActions";

const initialState = {
  alumni: {},
  loading: true,
  moreAlumni: true,
};

export function alumniReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALUMNI_START:
      return {
        ...state,
      };
    case LOAD_ALUMNI_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        alumni: {
          ...state.alumni,
          [action.payload.id] : action.payload.fields
        }
      });
      case MOER_ALUMNI_TO_LOAD:
        return {
          ...state,
          moreAlumni: action.payload
        };
    default:
      return state;
  }
}