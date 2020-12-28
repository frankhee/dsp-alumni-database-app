import { 
  LOAD_ALUMNI_START, 
  LOAD_ALUMNI_SUCCESS,
  MOER_ALUMNI_TO_LOAD,
  CLEAR_ALUMNI_INFO,
  REQUEST_IS_SEARCH,
  IS_VALID_SEARCH 
} from "../actions/alumniActions";

const initialState = {
  alumni: {},
  loading: true,
  moreAlumni: true,
  isSearch: false,
  isValidSearch: true
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
      case CLEAR_ALUMNI_INFO:
        return Object.assign({}, state, {
          ...state,
          alumni: {}
        });
        case REQUEST_IS_SEARCH:
          return {
            ...state,
            isSearch: action.payload
          };
          case IS_VALID_SEARCH:
            return {
              ...state,
              isValidSearch: action.payload
            };
    default:
      return state;
  }
}