import React from 'react';
import { range } from 'lodash';

import UserName from '../components/UserName';
import BlackCard from '../components/BlackCard';
import WhiteCard from '../components/WhiteCard';
import Carousel from '../components/Carousel';

import Deck from '../cards/Deck';
import blackcards from '../cards/blackcards';
import whitecards from '../cards/whitecards';

const blackDeck = new Deck(blackcards);
const whiteDeck = new Deck(whitecards);

const blackCardText = blackDeck.draw();
const whiteCardTexts = range(7).map(() => whiteDeck.draw());

import './RoomScreen.css';

class RoomScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedCard: null,
      leftOffset: 0
    }
    this.unselectCard = () => this._unselectCard();
    this.setCarousel = (c) => this._setCarousel(c);
  }

  _unselectCard() {
    this.setState({ selectedCard: null });
  }

  _setCarousel(c) {
    // HACK: Need to compensate for mobile Safari in order
    // to get the carousel to still render centered when
    // in absolute positioning.
    let windowWidth = window.innerWidth;
    let carouselWidth = c.getBoundingClientRect().width;
    this.setState({
      leftOffset: (carouselWidth - windowWidth) / 2
    });
  }

  checkCard(e, text) {
    if (e.dy < -150) {
      this.setState({
        selectedCard: text
      });
      return false;
    } else {
      return true;
    }
  }

  render() {
    let leftOffset = { left: -this.state.leftOffset };
    return (
      <section className="screen">
        <section className="room-screen">
          <section className="margin-10">
            <UserName>Albert</UserName>
          </section>
          <section className="margin-10">
            <BlackCard
              onClick={this.unselectCard}
              checked={this.state.selectedCard}
              text={blackCardText}
              answer={this.state.selectedCard}
            />
          </section>
          <section
            ref={this.setCarousel}
            style={leftOffset}
            className="room-carousel"
            >
            <Carousel>
              {
                whiteCardTexts.map((text) => (
                  <WhiteCard
                    key={text}
                    active={text !== this.state.selectedCard}
                    onRelease={(e) => this.checkCard(e, text)}
                    onResetClick={this.unselectCard}
                    >
                    {text}
                  </WhiteCard>
                ))
              }
            </Carousel>
          </section>
        </section>
      </section>
    );
  }
}

export default RoomScreen;
