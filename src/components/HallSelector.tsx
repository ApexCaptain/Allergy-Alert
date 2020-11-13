import React, { Component } from "react"
import {
    HallNumber
} from "../reducers/HallNumberReducer"
import './HallSelector.css'


interface HallSelectorProps {
    onSelected : (hallNumber : HallNumber) => void | Promise<void>,
    currentHallNumber : HallNumber
}

enum HallClass {
    ACTIVATED = "active",
    DEACTIVATED = "deactive"
}



export class HallSelectorComponent extends Component<HallSelectorProps> {

    public render(): JSX.Element {
        return (
            <div>
                <div id="hall_container">
                    <div id="hall_box">
                        {[HallNumber.HALL_1, HallNumber.HALL_2].map(eachHall =>
                            <div
                                key={eachHall.toString()}
                                className={this.props.currentHallNumber === eachHall ? HallClass.ACTIVATED : HallClass.DEACTIVATED}
                                onClick={async (_) => {
                                    this.props.onSelected(eachHall)

                                }}
                            >제 {eachHall} 학생 회관
                    </div>
                        )}
                    </div>
                </div>
                <hr/>
            </div>


        )
    }
}