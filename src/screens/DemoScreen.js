import React from 'react';

import UserName from '../components/UserName';
import BlackCard from '../components/BlackCard';
import WhiteCard from '../components/WhiteCard';
import CircleButton from '../components/CircleButton';
import Carousel from '../components/Carousel';

import './DemoScreen.css';
import cardSvg from '../static/ic_crop_portrait_black_24px.svg';

class DemoScreen extends React.Component {

  render() {
    let blackCardText = "Donald Trump’s first act as president was to outlaw _________.";
    let whiteCardText = "Trying to wake up from this nightmare.";
    return (
      <section>
        <ul className={"flex-centered component-list"}>
          <li><section className={"component-title"}>UserName</section>
            <UserName>Albert</UserName>
          </li>
          <li><section className={"component-title"}>Carousel</section>
            <Carousel>
              <WhiteCard>Card number one (1)</WhiteCard>
              <WhiteCard>Card number two (2)</WhiteCard>
              <WhiteCard>Card number three (3)</WhiteCard>
            </Carousel>
          </li>
          <li><section className={"component-title"}>BlackCard</section>
            <BlackCard>{blackCardText}</BlackCard>
          </li>
          <li><section className={"component-title"}>WhiteCard</section>
            <WhiteCard>{whiteCardText}</WhiteCard>
          </li>
          <li><section className={"component-title"}>CircleButton</section>
            <CircleButton icon={cardSvg} opacity={0.2} color={"#FFFFFF"} />
            <CircleButton icon={cardSvg} color={"#FFFFFF"} />
            <CircleButton icon={cardSvg} color={"#AAAAAA"} />
          </li>
        </ul>
      </section>
    );
  }
}

export default DemoScreen;
