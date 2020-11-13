import {
    HallSelectorComponent
} from "./HallSelector"
import {
    connect
} from 'react-redux'
import {
    changeHallNumber, HallNumber
} from "../reducers/HallNumberReducer"
import {
    RootState
} from "../ReduxStore"

export const HallSelectorContainer = connect(
    (state : RootState) => ({
        currentHallNumber : state.hallNumberReducer.currentHallNumber
    }),
    dispatch => ({
        onSelected : (hallNumber : HallNumber) => {
            dispatch(changeHallNumber(hallNumber))
        }
    })
)(HallSelectorComponent)