import React, { useState } from "react";
import logoImg from "../../assets/logo.png";
import { Button } from "antd";
import { Link } from 'react-router-dom';
import { DoubleRightOutlined, CopyOutlined, CheckCircleOutlined  } from "@ant-design/icons";
import "./index.css";

function Home() {
  return (
    <div className="home">
      <div className="title-section">
        <section className="presentation">
          <img className="logo" src={logoImg} width={50} alt="logo" />
          <h1 className="title">
            <strong>Subilo</strong>
          </h1>
          <div className="title-description">
            Tiny continuous deployment agent
          </div>
          <div className="presentation-description">
            Subilo improves the deployment process for projects where normal
            CI's cannot reach, like IoT devices and VPS not attached to an
            orchestration service.
          </div>
          <div className="hero-buttons">
            <Link to="/jobs">
              <Button
                type="primary"
                className="see-demo-button"
              >
                See Demo
              </Button>
            </Link>
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
          Subilo it's a small server that listens on a specified port for HTTP
          requests. It exposes a <div className="code-word">/webhook</div> endpoint that receives a project name that is matched against
          the Subilo configuration file to check what commands should run.
        </div>
        <div className="platform-description">
          Useful to deploy projects running on a private server where a normal
          CI does not have access to. Just push a webhook after the CI finishes
          and your project will be deployed.
        </div>
      </div>

      <InstallScript />
      <Footer />

    </div>
  );
}

function InstallScript() {
  const [ copyStatus, setCopyStatus ] = useState('copy')

  function copyToClipboard() {
    const command = 'curl -s -L https://raw.githubusercontent.com/Huemul/subilo/master/install.sh | bash'
    const txtArea = document.createElement('textarea');
    txtArea.innerHTML = command;
    document.body.appendChild(txtArea);
    txtArea.select();
    document.execCommand('copy');
    document.body.removeChild(txtArea);

    setCopyStatus('copied')

    setTimeout(() => setCopyStatus('copy'), 1200)
  }

  return (
    <div className="install-section">
      <div className="install-section-title">Install</div>
      <div className="install-script">
        <div className="code-block">
          <pre>
            <code>
              curl -s -L
              https://raw.githubusercontent.com/Huemul/subilo/master/install.sh
              | bash
            </code>
          </pre>
        </div>
        { copyStatus === 'copy' && <CopyOutlined onClick={copyToClipboard} className="copy-icon" />}
        { copyStatus === 'copied' && <CheckCircleOutlined className="copy-icon" />}
      </div>
    </div>
  )
}

function Footer() {
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

  return (
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
        © {new Date().getFullYear()}
      </span>
    </div>
  )
}

export default Home;
