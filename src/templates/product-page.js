import React from 'react'
import PropTypes from 'prop-types'
// import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ProductPageTemplate = ({
  content,
  contentComponent,
  description,
  image,
  title,
  helmet,
  pricepounds,
  pricedollars,
  priceeuros
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
        <div className="column is-6">
          <img src={image.childImageSharp.fluid.src}/>
          {/* {JSON.stringify(image.childImageSharp.fluid.src)} */}
        {/* {image ? (
                      <div className="featured-thumbnail">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: image
                          }}
                        />
                      </div>
                    ) : null} */}
        </div>
          <div className="column is-6">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>GBP {pricepounds} / USD {pricedollars} / EUR {priceeuros}</p>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  pricepounds: PropTypes.string,
  priceeuros: PropTypes.string,
  pricedollars: PropTypes.string,
  helmet: PropTypes.object
}

const ProductPage = ({ data }) => {
  const { markdownRemark: product } = data

  return (
    <Layout>
      <ProductPageTemplate
        content={product.html}
        contentComponent={HTMLContent}
        description={product.frontmatter.description}
        image={product.frontmatter.image}
        pricepounds={product.frontmatter.pricepounds}
        priceeuros={product.frontmatter.priceeuros}
        pricedollars={product.frontmatter.pricedollars}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${product.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${product.frontmatter.description}`}
            />
          </Helmet>
        }
        title={product.frontmatter.title}
      />
    </Layout>
  )
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProductPage

export const pageQuery = graphql`
  query ProductPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        pricepounds
        priceeuros
        pricedollars
        image {
                  childImageSharp {
                    fluid(maxWidth: 1000, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
      }
    }
  }
`
