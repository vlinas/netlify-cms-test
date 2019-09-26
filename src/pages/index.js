import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'

const HomePage = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Homepage | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">Products</h1>
            <BlogRoll/>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default HomePage

export const homePageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
