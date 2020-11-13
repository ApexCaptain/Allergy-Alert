import React, { Component } from 'react'
import {
    HallNumber
} from "../reducers/HallNumberReducer"
import "./Contents.css"

interface ContentsProps {
    currentHallNumber : HallNumber
}

export class ContentsComponent extends Component<ContentsProps> {
    render(): JSX.Element {
        return (
            <div id="contents_container">
                <div id="contents_box">
                    <h2>오늘 주의해야 할 음식은?</h2>
                    <h1>제 {this.props.currentHallNumber} 학생회관</h1>
                </div>
            </div>
        )
    }
}
