import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
// import ProductRoll from '../../components/ProductRoll'
import BundlesRoll from '../../components/BundlesRoll'

const BundlesPage = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Bundles | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">Bundles</h1>
            <BundlesRoll/>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default BundlesPage

export const bundlesPageQuery = graphql`
  query BundlesQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
