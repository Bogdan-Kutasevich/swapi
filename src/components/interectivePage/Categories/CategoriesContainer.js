import {setCategoriesAC} from "../../../redux/categoriesReducer"
import {connect} from "react-redux";
import Categories from "./Categories";

const mapStateToProps = (state)=>{
    return{
        state:state.Categories,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setCategories:(categories) => {
            dispatch(setCategoriesAC(categories));
        },
    }
}
const CategoriesContainer = connect(mapStateToProps, mapDispatchToProps)(Categories)

export default CategoriesContainer;

