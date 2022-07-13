import React, { useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';

const CustomIcon = styled(Icon)`
    margin-right: 0 !important;
`;

const CustomLabel = styled(Label)`
    float: right;
`;

function Temporizador({ time }) {

    const [hidden, setHidden] = useState(false);

    return (
        <CustomLabel onClick={() => setHidden(!hidden)} size='large'>
            {
                hidden ?
                    <CustomIcon name='clock outline'/> :
                    <span>
                        {time.h}h{time.m}min{time.s}s
                    </span>
            }
        </CustomLabel>
    );
}

export default Temporizador