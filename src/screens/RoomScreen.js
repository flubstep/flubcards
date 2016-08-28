import React from 'react';

import UserName from '../components/UserName';
import BlackCard from '../components/BlackCard';
import WhiteCard from '../components/WhiteCard';
import Carousel from '../components/Carousel';

const blackCardText = "Donald Trump’s first act as president was to outlaw $ANSWER";
const whiteCardTexts = [
  "Being on fire.",
  "Racism.",
  "Old people smell.",
  "A micropenis.",
  "Women in yogurt commercials.",
  "Classist undertones.",
  "Not giving a shit about the Third World."
];

import './RoomScreen.css';

class RoomScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedCard: null
    }
    this.unselectCard = () => this._unselectCard();
  }

  _unselectCard() {
    this.setState({ selectedCard: null });
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
    return (
      <section className="screen">
        <section className="room-screen">
          <UserName>Albert</UserName>
          <BlackCard
            onClick={this.unselectCard}
            checked={this.state.selectedCard}
            text={blackCardText}
            answer={this.state.selectedCard}
          />
          <Carousel>
            {
              whiteCardTexts.map((text) => (
                <WhiteCard
                  key={text}
                  active={text !== this.state.selectedCard}
                  onRelease={(e) => this.checkCard(e, text)}
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

export default RoomScreen;
