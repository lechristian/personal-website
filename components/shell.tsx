import React from 'react'

const Shell = () => (
  <div className="shell">
    <div className="window">
      <div className="close">
        &#215;
      </div>
      <div className="windowTitle">
        cle
      </div>
    </div>

    <div className="input">

    </div>

    <style jsx>{`
      .shell {
        position: fixed;
        background: #0d1622;
        top: 24px;
        left: 24px;
        bottom: 24px;
        right: 24px;
        border-radius: 8px;
        overflow: hidden;
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

      .input {
        position: absolute;
        top: 36px;
        right: 0;
        left: 0;
        bottom: 0;
        padding: 16px;
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
    `}</style>
  </div>
);

export default Shell;
