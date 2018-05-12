// @flow
import styled from 'styled-components'

export const Button = styled.button`
  display: inline-block;
  font-size: 1rem;
  color: #fff;
  padding: 1rem;
  background-color: #FF5A5F;
  border: 0;
  border-radius: 3px;
  opacity: ${props => props.disabled ? .5 : 1};
`

export const AltButton = Button.extend`
  color: #FF5A5F;
  border: 1px solid #FF5A5F;
  background-color: #fff;
`;