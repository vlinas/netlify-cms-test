import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class ProductRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: products } = data.allMarkdownRemark;
    return (
      <div className="columns is-multiline">
        {products &&
          products.map(({ node: product }) => (
            <div className="column is-4" key={product.id}>
              <div className="product-box box">
                <Link to={product.fields.slug}>
                  <div className="product-image">
                    {product.frontmatter.image ? (
                      <div className="featured-thumbnail">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: product.frontmatter.image,
                            alt: `featured image thumbnail for post ${product.title}`
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="product-title">
                    <h2>{product.frontmatter.title}</h2>
                  </div>
                </Link>
                <div className="product-meta">
                  <p>{product.frontmatter.description}</p>
                  <p>
                    GBP {product.frontmatter.pricepounds} / USD{" "}
                    {product.frontmatter.pricedollars} / EUR{" "}
                    {product.frontmatter.priceeuros}
                  </p>
                  {!product.frontmatter.stock ? (
                    <Link className="button" to={product.fields.slug}>
                      {" "}
                      Buy Now{" "}
                    </Link>
                  ) : (
                    <h3>SOLD OUT</h3>
                  )}
                </div>
              </div>
              {/* {JSON.stringify(products)} */}
              {/* {(!product.frontmatter.live) == false && <p>asdasd</p>} */}
            </div>
          ))}
      </div>
    );
  }
}

ProductRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query ProductRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "product-page" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              excerpt
              frontmatter {
                title
                description
                pricepounds
                pricedollars
                priceeuros
                templateKey
                variant
                stock
                live
                image {
                  childImageSharp {
                    fluid(maxWidth: 300, quality: 80) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ProductRoll data={data} count={count} />}
  />
);
