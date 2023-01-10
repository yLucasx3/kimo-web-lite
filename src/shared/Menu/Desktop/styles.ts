import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    h1 {
        font-size: 45px;
        letter-spacing: 6.5px;
        cursor: pointer;
    }

    .options {
        display: flex;

        span {
            display: flex;
            align-items: center;
            margin: 20px;
            font-weight: 600;
            cursor: pointer;

            .option-icon {
                margin: 0px;
                padding-left: 20px;
            }
        }
    }
`;
