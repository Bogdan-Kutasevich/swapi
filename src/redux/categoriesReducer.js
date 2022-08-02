const SET_CATEGORIES = 'SET_CATEGORIES'

let initialState = {
    categories:[]
}

const categoriesReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_CATEGORIES:

            return{
                ...state,
                categories: action.categories,
            }


        default:
            return state
    }
}

export const setCategoriesAC = (categories)=>{

    return {
        type: SET_CATEGORIES,
        categories
    }
}

export default categoriesReducer