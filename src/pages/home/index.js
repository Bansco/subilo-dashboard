import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { DoubleRightOutlined } from '@ant-design/icons'

import logoImg from '../../assets/logo.png'
import './index.css'

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
            <Link to="/agents">
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
                .getElementById('scroll-hook')
                .scrollIntoView({ block: 'start', behavior: 'smooth' })
            }}
          />
        </section>
      </div>
      <div className="description-section">
        <div className="description-section-title" id="scroll-hook">
          How it works
        </div>
        <div className="platform-description">
          Status and logs of these deployments can be checked in the Dashboard
          using the URL and authentication token provided by the Subilo agent.
          The Subilo agent is a small server that lives on your application's
          machine and listens for secure HTTP webhooks.
        </div>
        <div className="platform-description">
          These webhooks have information about what application to deploy
          matching the Subilo configuration file (<code>.subilorc</code>). The
          file also defines what steps should be taken to successfully deploy an
          application, for example: <code>git pull</code> or pull the latest
          Docker image, restart the application and send a notification.
        </div>

        <div className="platform-description">
          Once Subilo is running on your server, you can register it{' '}
          <a href="/agents">here in the dashboard</a> to see the status and logs
          of each deployment.
        </div>
      </div>

      <GetStarted />

      <Footer />
    </div>
  )
}

function GetStarted() {
  return (
    <div className="install-section">
      <div className="install-section-title">Get started</div>
      <div className="platform-description">
        Follow the installation and usage guide in{' '}
        <a href="https://github.com/Huemul/subilo">github.com/Huemul/subilo</a>{' '}
        to run Subilo and start deploying your applications.
      </div>

      <div className="platform-description">
        <a
          href="https://github.com/Huemul/subilo#subilo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button type="primary" className="see-demo-button">
            Get started
          </Button>
        </a>
      </div>
    </div>
  )
}

function Footer() {
  const profiles = [
    {
      name: 'Christian',
      gh: 'gillchristian',
      link: 'https://gillchristian.xyz',
    },
    {
      name: 'Jonas',
      gh: 'Jonasjonathan',
      link: 'https://www.behance.net/Jonathanjonas',
    },
    {
      name: 'Joni',
      gh: 'jonidelv',
      link: 'https://twitter.com/jonidelv',
    },
    {
      name: 'Mati',
      gh: 'matiastucci',
      link: 'https://github.com/matiastucci',
    },
    {
      name: 'Nico',
      gh: 'ndelvalle',
      link: 'https://github.com/ndelvalle',
    },
  ]

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
  )
}

export default Home
