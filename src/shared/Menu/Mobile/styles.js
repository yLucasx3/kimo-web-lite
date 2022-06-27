import { colors } from 'config/variables';
import styled from 'styled-components';

export const Container = styled.div`

  .header-mobile {
    text-align: center;
    font-size: 20px;
    letter-spacing: 6.5px;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: ${colors.black};
    
    .actions {
      display: flex;
      align-items: center;

      .search-icon {
        margin-right: 20px;
      }
    }
  }

  .invert {
    filter: invert();
  }
`;