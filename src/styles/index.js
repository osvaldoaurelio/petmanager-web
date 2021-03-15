import { createGlobalStyle } from 'styled-components';

import bg from '../assets/img/bg.jpeg';

export const Styles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-weight: 400;
    font-family: 'Comfortaa', sans-serif;
  }

  body {
    background-image: url(${bg});
    color: #333;
  }

  .active-link {
    color: #80ef8a !important;
  }

  .fc-day-past {
    background-color: #8888;
    pointer-events: none;
  }

  .fc-day-sat:not(th), .fc-day-sun:not(th) {
    background-color: #ff08;
    pointer-events: none;
  }

`;
