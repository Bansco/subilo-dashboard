import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  DoubleRightOutlined,
  CopyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import logoImg from "../../assets/logo.png";
import "./index.css";
import { useCopy } from "../../util/useCopy";

function Home() {
  return (
    <div className="home">
      <div className="title-section">
        <section className="presentation">
          <img className="logo" src={logoImg} width={50} alt="logo" />
          <h1 className="title">
            <strong>Subilo</strong>
          </h1>
          <div className="title-description">Deployment automation agent</div>
          <div className="presentation-description">
            Subilo is what happens after CI is done.
            <br />A perfect fit to setup continous deployments for applications
            running on IoT devices and VPSs.
          </div>
          <div className="hero-buttons">
            <Link to="/jobs">
              <Button type="primary" className="see-demo-button">
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
          Subilo is a small server that listens on a <code>/webhook</code>{" "}
          endpoint for HTTP calls to trigger a deployment job for a project. The
          status and logs of those jobs can be easily checked here in the
          Dashboard.
        </div>
        <div className="platform-description">
          Useful to deploy projects running on a private server where CI does
          not have access to. Just push an event to the webhook after the CI
          finishes and your project will be deployed.
        </div>
      </div>

      <InstallScript />
      <RunDeployment />
      <SeeItInAction />
      <Footer />
    </div>
  );
}

function InstallScript() {
  const [installStatus, copyInstall] = useCopy(
    "curl -s -L https://raw.githubusercontent.com/Huemul/subilo/master/install.sh | bash"
  );

  const [tomlStatus, copyToml] = useCopy("TODO !!!");

  return (
    <div className="install-section">
      <div className="install-section-title">Install and Setup</div>
      <div className="platform-description">
        On any Linux machine you want to deploy an application to. Run this
        command:
      </div>
      <div className="install-script">
        <div className="code-block">
          <pre>
            curl -s -L
            https://raw.githubusercontent.com/Huemul/subilo/master/install.sh |
            bash
          </pre>
        </div>
        {installStatus === "copy" && (
          <CopyOutlined onClick={copyInstall} className="copy-icon" />
        )}
        {installStatus === "copied" && (
          <CheckCircleOutlined className="copy-icon" />
        )}
      </div>

      <div className="platform-description">
        Configure the app you want to be deployed.
      </div>

      <div className="install-script">
        <div className="code-block">
          <pre>
            [[projects]]
            <br />
            name = "my-project"
            <br />
            path = "~/www/my-project"
            <br />
            commands = [<br />
            {"  "}"git pull --rebase",
            <br />
            {"  "}"docker pull johndoe/my-project:latest",
            <br />
            {"  "}"docker-compose down",
            <br />
            {"  "}"docker-compose up -d",
            <br />]
          </pre>
        </div>
        {tomlStatus === "copy" && (
          <CopyOutlined onClick={copyToml} className="copy-icon" />
        )}
        {tomlStatus === "copied" && (
          <CheckCircleOutlined className="copy-icon" />
        )}
      </div>
    </div>
  );
}

function RunDeployment() {
  const [copyStatus, copyToClipboard] = useCopy("TODO !!!");

  return (
    <div className="install-section">
      <div className="install-section-title">Deploy an app</div>
      <div className="platform-description">
        Trigger the deployment job by send a webhook event to the agent.
      </div>

      <div className="install-script">
        <div className="code-block">
          <pre>
            curl -H 'Authorization: Bearer ....' \<br />
            {"  "}-H 'Content-Type: application/json' \<br />
            {"  "}-data '{"{"} "name": "my-project" {"}"}' \<br />
            {"  "}-X POST https://subilo.my-vps-url.com/webhook
          </pre>
        </div>
        {copyStatus === "copy" && (
          <CopyOutlined onClick={copyToClipboard} className="copy-icon" />
        )}
        {copyStatus === "copied" && (
          <CheckCircleOutlined className="copy-icon" />
        )}
      </div>
    </div>
  );
}

function SeeItInAction() {
  return (
    <div className="install-section">
      <div className="install-section-title">See it in action</div>
      <div className="platform-description">
        Configure the agent here in the dashboard and see the deployments jobs
        status and logs.
      </div>
    </div>
  );
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
      <span>© {new Date().getFullYear()}</span>
    </div>
  );
}

export default Home;
