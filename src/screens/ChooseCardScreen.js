import React from 'react';

import UserName from '../components/UserName';
import BlackCard from '../components/BlackCard';
import WhiteCard from '../components/WhiteCard';
import Carousel from '../components/Carousel';

import './ChooseCardScreen.css';

class ChooseCardScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedCard: null,
      leftOffset: 0
    }
    this.unselectCard = () => this._unselectCard();
    this.setCarousel = (c) => this._setCarousel(c);
    this.onCardDrag = (e) => this._onCardDrag(e);
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

  _onCardDrag(e) {
    this.setState({
      hovering: e.dy < -150
    });
  }

  checkCard(e, text) {
    if (e.dy < -150) {
      this.setState({
        selectedCard: text,
        hovering: false
      });
      return false;
    } else {
      return true;
    }
  }

  render() {
    let leftOffset = { left: -this.state.leftOffset };
    return (
      <section className="choose-card-container">
        <section className="margin-10">
          <UserName>Albert</UserName>
        </section>
        <section className="margin-10">
          <BlackCard
            hover={this.state.hovering}
            onClick={this.unselectCard}
            checked={this.state.selectedCard}
            text={this.props.blackCard}
            answer={this.state.selectedCard}
          />
        </section>
        <section
          ref={this.setCarousel}
          style={leftOffset}
          className="card-carousel"
          >
          <Carousel>
            {
              this.props.hand.map((text) => (
                <WhiteCard
                  key={text}
                  active={text !== this.state.selectedCard}
                  onDragMove={this.onCardDrag}
                  onDragRelease={(e) => this.checkCard(e, text)}
                  onResetClick={this.unselectCard}
                  >
                  {text}
                </WhiteCard>
              ))
            }
          </Carousel>
        </section>
      </section>
    );
  }
}

export default ChooseCardScreen;
