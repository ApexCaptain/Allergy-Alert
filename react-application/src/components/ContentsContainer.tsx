import {
    ContentsComponent
} from "./Contents"
import {
    connect
} from "react-redux"
import {
    HallNumber
} from "../reducers/HallNumberReducer"
import {
    RootState
} from "../ReduxStore"

export const ContentsContainer = connect(
    (state : RootState) => ({
        currentHallNumber : state.hallNumberReducer.currentHallNumber
    })
)(ContentsComponent)