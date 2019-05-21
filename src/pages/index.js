import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import UserList from '../smart-components/UserList'
import GlobalStyles from '../components/GlobalStyles'
import Container from '../components/Container'
import TwoCol from '../components/TwoCol'
import Hero from '../components/Hero'
import Sidebar from '../components/Sidebar'
import FriendsList from '../smart-components/FriendsList'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GlobalStyles />
    <Sidebar>
      <FriendsList />
    </Sidebar>
    <Hero
      title='OT Fitness App'
      subtitle='add some friends below and add them to our network'
    />
    <Container>
      <TwoCol>
        <div>
          <h3 style={{textAlign: 'center', fontSize: '2rem'}}>Add a Funky Fella</h3>
          <hr />
          <UserList gender='male'/>
        </div>
        <div>
        <h3 style={{textAlign: 'center', fontSize: '2rem'}}>Add a Groovy Girl</h3>
          <hr />
          <UserList gender='female'female />
        </div>
      </TwoCol>
      <div style={{marginBottom: '4rem'}}></div>
    </Container>
  </Layout>
)

export default IndexPage
