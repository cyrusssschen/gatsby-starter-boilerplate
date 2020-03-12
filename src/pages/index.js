import React from 'react'
import Layout from '@components/Layout'
import SEO from '@components/seo'
import MyResume from '@components/MyResume'

const IndexPage = ({ data }) => (
  <Layout showHome={false}>
    <SEO
      title="Cyrus Chen"
      keywords={[`developer`, `javascript`, `react`, `gatsby`]}
    />
    <MyResume />
  </Layout>
)

export default IndexPage
