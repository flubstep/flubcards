import React from 'react'

import UserName from '../components/UserName'
import BlackCard from '../components/BlackCard'
import WhiteCard from '../components/WhiteCard'
import Carousel from '../components/Carousel'

import './ChooseCardScreen.css'

class ChooseCardScreen extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      leftOffset: 0
    }
    this.selectCard = (e) => this._selectCard(e)
    this.unselectCard = () => this._unselectCard()
    this.setCarousel = (c) => this._setCarousel(c)
    this.onCardDrag = (e) => this._onCardDrag(e)
  }

  _unselectCard() {
    this.props.room.emit({
      type: 'PLAYER_CHOOSE_CARD',
      player: this.props.user,
      card: null
    })
  }

  _selectCard(card) {
    this.props.room.emit({
      type: 'PLAYER_CHOOSE_CARD',
      player: this.props.user,
      card: card
    })
    this.setState({ hovering: false })
  }

  _setCarousel(c) {
    // HACK: Need to compensate for mobile Safari in order
    // to get the carousel to still render centered when
    // in absolute positioning.
    let windowWidth = window.innerWidth
    let carouselWidth = c.getBoundingClientRect().width
    this.setState({
      leftOffset: (carouselWidth - windowWidth) / 2
    })
  }

  _onCardDrag(e) {
    let hovering = (e.dy < -150)
    if (hovering !== this.state.hovering) {
      this.setState({ hovering })
    }
  }

  checkCard(e, text) {
    if (e.dy < -150) {
      this.selectCard(text)
      return false
    } else {
      return true
    }
  }

  render() {
    let leftOffset = { left: -this.state.leftOffset }
    return (
      <section className="choose-card-container">
        <section className="margin-10">
          <UserName>Albert</UserName>
        </section>
        <section className="margin-10">
          <BlackCard
            hover={this.state.hovering}
            onClick={this.unselectCard}
            checked={this.props.player.chosen}
            text={this.props.blackCard}
            answer={this.props.player.chosen}
          />
        </section>
        <section
          ref={this.setCarousel}
          style={leftOffset}
          className="card-carousel"
          >
          <Carousel>
            {
              this.props.player.hand.map((text) => (
                <WhiteCard
                  key={text}
                  active={text !== this.props.player.chosen}
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
    )
  }
}

export default ChooseCardScreen
