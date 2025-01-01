import React from 'react';

const BorderedParagraph = () => {
    return (
        <div style={{
            border: '2px solid black',
            padding: '10px',
            margin: '20px',
            width: 'fit-content'
        }}>
            <p>
                The spacious double room provides air conditioning, a mini-bar, a terrace with a quiet street view as well as a private bathroom featuring a bath. The unit offers 2 beds.
            </p>
        </div>
    );
};

export default BorderedParagraph;
