import React from 'react';
import {Spinner} from 'react-bootstrap';


const SpinnerDiv = () => {

    return(
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '35%', marginBottom: '35%'}}>
            <Spinner size="large" animation="grow" variant="dark"/> {/* Kan også bruke animation="border" */}
        </div>
    )
}


export default SpinnerDiv;