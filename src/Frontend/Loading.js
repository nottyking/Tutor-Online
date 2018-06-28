import React from 'react'
import './Loading.css'
import loading from './Image/Blocks-2s-200px.gif';
// Todo Change path to charge omise  & use Prop instead of cData

export class Loading extends React.Component {
      

    render() {
        return (
            <div className="loadingModal"><img src={loading} className='middle'/></div>
        );
    }
}