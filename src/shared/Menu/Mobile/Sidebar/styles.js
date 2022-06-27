import { colors } from 'config/variables';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  background: ${colors.white};
  z-index: 20;

  .header {
    display:  flex;
    justify-content: center;
    align-items: center;
    justify-self: flex-start;

    h1 {
      font-size: 20px;
      letter-spacing: 6.5px;
    }

    .close-icon {
      position: absolute;
      right: 20px;
      top: 0px;
      cursor: pointer;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .option-item {
    display: flex;
    align-items: center;
    padding: 20px;
    font-weight: 600;
    transition: 0.8s all ease-in-out;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    .option-icon {
      padding-right: 20px;
    }
  }
`;