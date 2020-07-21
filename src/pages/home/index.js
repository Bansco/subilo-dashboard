import React from "react";
import logoImg from "../../assets/logo.png";
import { Button } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import "./index.css";

const profiles = [
  {
    name: "Christian",
    gh: "gillchristian",
    link: "https://gillchristian.xyz",
  },
  {
    name: "Jonas",
    gh: "Jonasjonathan",
    link: "https://www.behance.net/Jonathanjonas",
  },
  {
    name: "Joni",
    gh: "jonidelv",
    link: "https://twitter.com/jonidelv",
  },
  {
    name: "Mati",
    gh: "matiastucci",
    link: "https://github.com/matiastucci",
  },
  {
    name: "Nico",
    gh: "ndelvalle",
    link: "https://github.com/ndelvalle",
  },
];

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
              window.location.href = "/agents";
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
                .scrollIntoView({ block: "start", behavior: "smooth" });
            }}
          />
        </section>
      </div>
      <div className="description-section">
        <div className="description-section-title" id="scroll-hook">
          How it works
        </div>
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
      </div>
      <div className="footer">
        <span>by</span>
        <div className="avatars">
          {profiles.map(({ gh, link, name }) => (
            <a href={link} rel="noopener noreferrer" target="_blank">
              <img
                key={name}
                src={`https://github.com/${gh}.png?size=60`}
                width="30"
                alt={name}
              />
            </a>
          ))}
        </div>
        <span>
          <span className="icon">©</span> {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}

export default Home;
