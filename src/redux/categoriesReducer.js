const ADD_POST = 'ADD_POST'
const UPDATE_TEXT_AREA = 'UPDATE_TEXT_AREA'

let initialState = {
    posts:[
        {id:1, value:'text1', likes:0},
        {id:2, value:'text2', likes:1},
    ],
    currentValueOfPost: 'Введите текст',
}

const contentReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let value = state.currentValueOfPost
            return {
               ...state,
                posts: [...state.posts, {id:state.posts.length+1, value:value, likes:0}],
                currentValueOfPost: '',
            }
        case UPDATE_TEXT_AREA:
            return {
                ...state,
                currentValueOfPost: action.text
            }
        default:
            return state
    }
}

export const addPostActionCreator = ()=>{
    return {
        type: ADD_POST,
    }
}

export const updateTextAreaActionCreator = (text)=>{
    return {
        type: UPDATE_TEXT_AREA,
        text: text

    }
}

export default contentReducer