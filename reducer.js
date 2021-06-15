export const initialState = {
    basket: '',
    product: '',
    status: '',
}


export const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_ALL_PRODUCTS':
            return {
                ...state,
                basket: [...action.items]
            }
        
        case 'GET_A_PRODUCT':
            return {
                ...state,
                product: {...action.item}
            }

        case 'UPDATE_STATUS':
            return {
                ...state,
                status: action.item
            }

        default:
            return state;
    }
}

export default reducer;
