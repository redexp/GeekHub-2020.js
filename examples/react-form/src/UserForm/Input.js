import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    background-color: ${p => p.valid === true ? '#C2E0C6' : p.valid === false ? '#F9D0C4' : '#FFF'};
`;

export default Input;