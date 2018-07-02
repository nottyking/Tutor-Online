import React from 'react';

export class Success extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>
                    Success to change your profile
                    </h1>
                <a href={"./Student"}>Click here to go back to Profile Page</a>

            </div>
        );
    };
}
