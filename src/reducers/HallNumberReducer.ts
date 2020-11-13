export enum HallNumberActionType {
    CHANGE = "hallNumber/change"
}
export enum HallNumber {
    HALL_1 = 1,
    HALL_2 = 2
}
export const changeHallNumber = (hallNumber : HallNumber) : {type : HallNumberActionType, hallNumber : HallNumber} => ({
    type : HallNumberActionType.CHANGE,
    hallNumber : hallNumber
})

type HallNumberAction = ReturnType<typeof changeHallNumber>

type HallNumberState = {
    currentHallNumber : HallNumber
}

const initialiState : HallNumberState = {
    currentHallNumber : HallNumber.HALL_1
}

export default function hallNumberReducer(state : HallNumberState = initialiState, action : HallNumberAction) {
    switch(action.type) {
        case HallNumberActionType.CHANGE :
            return {...state, currentHallNumber : action.hallNumber}
            break;
        default :
            return {...state}
    }
}