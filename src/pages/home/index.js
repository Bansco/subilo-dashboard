import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { DoubleRightOutlined } from "@ant-design/icons";

import logoImg from "../../assets/logo.png";
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
          <div className="title-description">Deployment automation agent</div>
          <div className="presentation-description">
            Subilo is a tool to setup continuous deployments for applications
            running on machines with no external integrations like IoT devices
            and VPSs.
            <br />
            Filling this gap you can enjoy automated deployments and a cool
            dashboard to check what is going on!
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
          Subilo is a small server that lives on your app's machine and
          listens for authenticated HTTP webhooks.
          These webhooks have information about what project should be deployed
          matching the Subilo configuration file (<code>.subilorc</code>).
          This configuration file also defines what steps should be taken
          to successfully deploy a project, for example: 
          <code>git pull</code>, <code>./restart-server</code> and <code>./notify</code>.

          <br />
          <br />
          Status and logs of these deployments can be checked in the Dashboard
          using the URL and authentication token provided by the Subilo agent.
        </div>
      </div>

      <SeeItInAction />
      <Footer />
    </div>
  );
}

function SeeItInAction() {
  return (
    <div className="install-section">
      <div className="install-section-title">See it in action</div>
      <iframe
        title="video"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
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
