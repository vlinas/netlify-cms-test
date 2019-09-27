import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import GuidesRoll from '../../components/GuidesRoll'

const GuidesPage = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Guides | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">Guides</h1>
            <GuidesRoll/>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default GuidesPage

export const guidesPageQuery = graphql`
  query GuidesQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
