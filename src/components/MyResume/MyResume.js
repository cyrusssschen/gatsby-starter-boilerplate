import React from 'react'
import styles from './MyResume.module.scss'
import showdown from 'showdown'
import Prism from 'prismjs'

const styleFirst = require('raw-loader!../../data/res/style1.txt')
const styleSecond = require('raw-loader!../../data/res/style2.txt')
const resume = require('raw-loader!../../data/res/resume.txt')

export default class MyResume extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      styleText: ``,
      DOMStyleText: ``,
      resumeText: ``,
      DOMResumeText: ``,
    }
    this.interval = 0
    this._isMounted = false
  }
  async componentDidMount() {
    this._isMounted = true
    if (this._isMounted) {
      await this.writeTo('workArea', 0, styleFirst)
      await this.writeTo('resume', 0, resume)
      await this.writeTo('workArea', 0, styleSecond)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  writeChars = (nodeName, char) =>
    new Promise(resolve => {
      setTimeout(() => {
        if (nodeName === 'workArea') {
          const origin = this.state.DOMStyleText + char
          const html = Prism.highlight(origin, Prism.languages.css)
          this._isMounted &&
            this.setState({
              styleText: html,
              DOMStyleText: origin,
            })

          if (this.contentNode) {
            this.contentNode.scrollTop = this.contentNode.scrollHeight
          }
        } else if (nodeName === 'resume') {
          const originResume = this.state.resumeText + char
          const converter = new showdown.Converter()
          const markdownResume = converter.makeHtml(originResume)
          this._isMounted &&
            this.setState({
              resumeText: originResume,
              DOMResumeText: markdownResume,
            })

          if (this.resumeNode) {
            this.resumeNode.scrollTop = this.resumeNode.scrollHeight
          }
        }

        if (char === '？' || char === '，' || char === '！') {
          this.interval = 800
        } else {
          this.interval = 25
        }
        resolve()
      }, this.interval)
    })

  writeTo = async (nodeName, index, text) => {
    let speed = 1
    let char = text.slice(index, index + speed)
    index += speed
    if (index > text.length) {
      return
    }
    await this.writeChars(nodeName, char)
    await this.writeTo(nodeName, index, text)
  }

  render() {
    return (
      <div className={styles.main}>
        <div
          className={styles.workArea}
          ref={node => {
            this.contentNode = node
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: this.state.styleText }}></div>
          <style
            dangerouslySetInnerHTML={{ __html: this.state.DOMStyleText }}
          ></style>
        </div>
        <div
          className={styles.resume}
          dangerouslySetInnerHTML={{ __html: this.state.DOMResumeText }}
          ref={node => {
            this.resumeNode = node
          }}
        ></div>
      </div>
    )
  }
}
