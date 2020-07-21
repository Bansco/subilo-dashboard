import React from "react";
import logoImg from "../../assets/logo.png";
import { Button } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import chris from "../../assets/chris.png";
import jona from "../../assets/jona.jpg";
import joni from "../../assets/joni.jpg";
import mati from "../../assets/mati.jpg";
import nico from "../../assets/nico.png";

import "./index.css";

function Home() {
  return (
    <div className="home">
      <div className="title-section">
        <section className="presentation">
          <img className="logo" src={logoImg} width={50} alt="logo" />
          <h1 className="title">
            <strong>Best Platform</strong>
            <br />
            to develop your works
          </h1>
          <div className="title-description">
            Easy development for virtualmachines
          </div>
          <Button
            type="primary"
            className="see-demo-button"
            onClick={() => {
              window.location.href = "https://github.com/huemul/subilo";
            }}
          >
            See Demo
          </Button>
          <div className="presentation-description">
            Subilo is a deployment agent that allows executing predefined bash
            commands on the server where it is running (VPS, raspberry PI, any
            Linux machine)
          </div>
          <DoubleRightOutlined
            className="icon-down-arrow"
            rotate={90}
            onClick={() => {
              document
                .getElementById("scroll-hook")
                .scrollIntoView({ block: "end", behavior: "smooth" });
            }}
          />
        </section>
      </div>
      <div className="description-section">
        <div className="description-section-title">How it works</div>
        <div className="platform-description">
          Subilo It's a small server that listens on a specified port for HTTP
          requests (the port should be open to the internet). It exposes a
          /webhook endpoint that receives a project name that is matched against
          the Subilo configuration file (.subilorc) to check what commands
          should be run.
        </div>
        <div className="platform-description">
          Useful to deploy projects running on a private server where a normal
          CI does not have access to. Just push a webhook after the CI finishes
          and your project will be deployed.
        </div>
      </div>
      <div className="install-section">
        <div className="install-section-title">Install and Setup</div>
        <div className="install-section-subtitle">Install Script</div>
        <div className="code-block">
          <pre>
            <code>
              curl -s -L
              https://raw.githubusercontent.com/Huemul/subilo/master/install.sh
              | bash
            </code>
          </pre>
        </div>
        <div className="install-description">
          This command runs the install script. The script downloads the latest
          Subilo release and attempts to add the Subilo bin path to the $PATH
          variable in the correct profile file (~/.profile, ~/.bashrc,
          ~/.bash_profile, ~/.zshrc or ~/.config/fish/config.fish)
        </div>
        <div
          className="install-section-subtitle install-subtitle"
          id="scroll-hook"
        >
          Cargo
        </div>
        <div className="code-block">
          <pre>
            <code>$ cargo install subilo</code>
          </pre>
        </div>
        <div className="install-section-subtitle manually">Manually</div>
        <div className="install-description">
          Download the latest released binary and add executable permissions:
        </div>
        <div className="code-block left">
          <pre>
            <code>
              $ wget -O subilo
              "https://github.com/Huemul/subilo/releases/download/v0.0.1/subilo-x86-64-linux"
            </code>
          </pre>
          <pre>$ chmod +x subilo</pre>
        </div>
      </div>
      <div className="footer">
        <span>by</span>
        <div className="avatars">
          <a
            href="https://gillchristian.xyz"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={chris} width="30" alt="christian" />
          </a>
          <a
            href="https://www.linkedin.com/in/jonathan-jonas-677301114/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={jona} width="30" alt="jonatan" />
          </a>
          <a
            href="https://twitter.com/jonidelv"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={joni} width="30" alt="joni" />
          </a>
          <a
            href="https://github.com/matiastucci"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={mati} width="30" alt="matias" />
          </a>
          <a
            href="https://github.com/ndelvalle"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={nico} width="30" alt="nico" />
          </a>
        </div>
        <span>
          <span className="icon">©</span> {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}

export default Home;
