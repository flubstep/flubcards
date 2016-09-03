import React from 'react'
import UserInfo from '../game/UserInfo'
import CircleButton from '../components/CircleButton'

import doneSvg from '../static/ic_done_black_24px.svg'

class AskNameScreen extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.onSubmit = (e) => this._onSubmit(e)
    this.onChange = (e) => this._onChange(e)
    this.state = {
      name: ''
    }
  }

  _onChange(e) {
    this.setState({
      name: e.nativeEvent.target.value
    })
  }

  _onSubmit(e) {
    e.preventDefault()
    if (this.state.name) {
      UserInfo.set({
        name: this.state.name
      })
    }
  }

  render() {
    return (
      <section className="screen flex-centered">
        <form className="flex-centered" onSubmit={this.onSubmit}>
          <input onChange={this.onChange} ref="name" placeholder="What's your name?" />
          <CircleButton disabled={!this.state.name} onClick={this.onSubmit} icon={doneSvg} />
        </form>
      </section>
    )
  }
}

export default AskNameScreen;