export const initialState = {
  basket: "",
  adminToken: "",
  status: "",
  product: "",
  get_queryy: {},
  groupId: '',
  exist_mem: false,
  openDialog: false,
};

export const reducer = (state, action) => {
    switch (action.type) {
      case "GET_ALL_PRODUCTS":
        return {
          ...state,
          basket: [...action.items],
        };

      case "GET_A_PRODUCT":
        return {
          ...state,
          product: { ...action.item },
        };

      case "UPDATE_STATUS":
        return {
          ...state,
          status: action.item,
        };

      case "SAVE_TOKEN":
        return {
          ...state,
          adminToken: action.item,
        };

      case "GET_QUERY_VALUE":
        return {
          ...state,
          get_query: { ...action.item },
        };

      case "GET_GROUP_ID":
        return {
          ...state,
          groupId: action.item ,
        };

      case "EXIST_MEMBER":
        return {
          ...state,
          exist_mem: action.item,
        };

      case "OPEN_DIALOG_BOX":
        return {
          ...state,
          openDialog: action.item,
        };

      default:
        return state;
    }
}

export default reducer;
