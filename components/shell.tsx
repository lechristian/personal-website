import React, { Component } from 'react';
import update from 'immutability-helper';

type ShellProps = {
  isOpen: boolean,
  toggleTerminal: (isOpen: boolean) => void
}

type ShellState = {
  isTerminalOpened: boolean,
}

class Shell extends Component<ShellProps, ShellState> {

  componentDidMount() {
    this.props.toggleTerminal(true);
  }

  openTerminal() {
    this.props.toggleTerminal(true);
  }

  closeTerminal() {
    this.props.toggleTerminal(false);
  }

  toggleTerminal() {
    if (this.props.isOpen) {
      this.closeTerminal();
    } else {
      this.openTerminal();
    }
  }

  shellClassName() {
    let className = 'shell';
    if (!this.props.isOpen) {
      className += ' shell-closed';
    }
    return className;
  }

  dockClassName() {
    let className = 'dock';
    if (this.props.isOpen) {
      className += ' dock-hidden';
    }
    return className;
  }

  render() {
    return (
      <div className="terminal">
        <div className={this.shellClassName()}>
          <div className="window">
            <div className="close" onClick={this.toggleTerminal.bind(this)}>
              &#215;
            </div>
            <div className="windowTitle">
              cle
            </div>
          </div>
        </div>

        <div className={this.dockClassName()} onClick={this.toggleTerminal.bind(this)}>
          <div className="icon">
            <div className="bar"></div>
            <div className="arrow">
              $ &#62;
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 1080px) {
            .terminal {
              display: none;
            }
          }

          .shell {
            position: fixed;
            background: #0d1622;
            top: 24px;
            left: 24px;
            bottom: 24px;
            right: 24px;
            border-radius: 8px;
            overflow: hidden;
            transition: 0.25s;
          }

          .shell-closed {
            top: 100%;
            bottom: 0;
            left: 50%;
            right: 50%;
          }

          .window {
            position: absolute;
            top: 0;
            left: 0;
            height: 36px;
            width: 100%;
            background: #6d737a;
          }

          .windowTitle {
            text-align: center;
            width: 100%;
            line-height: 36px;
          }

          .close {
            position: absolute;
            top: 8px;
            left: 8px;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
            background: #e94057;
            text-align: center;
            color: rgba(0, 0, 0, 0);
            font-weight: bold;
            font-size: 20px;
            line-height: 20px;
            transition: 0.2s;
            cursor: pointer;
          }

          .close:hover {
            color: #101010;
          }

          .input {
            position: absolute;
            top: 36px;
            right: 0;
            left: 0;
            bottom: 0;
            padding: 16px;
          }

          .dock {
            position: fixed;
            bottom: 0px;
            left: 0;
            right: 0;
            height: 64px;
            cursor: pointer;
            transition: 0.2s;
          }

          .dock-hidden {
            bottom: -72px;
          }

          .icon {
            margin: 0 auto;
            height: 48px;
            width: 48px;
            overflow: hidden;
            background: #0d1622;
            border-radius: 4px;
          }

          .bar {
            height: 8px;
            width: 100%;
            background: #6d737a;
          }

          .arrow {
            color: #6d737a;
            font-size: 18px;
            font-weight: bold;
            padding: 4px;
          }
        `}</style>
      </div>
    );
  }
}

export default Shell;

