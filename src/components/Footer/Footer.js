import PropTypes from 'prop-types'
import React from 'react'
import styles from './Footer.module.scss'

const Footer = ({ siteMetadata }) => (
  <footer className={styles.footer}>
    <div>
      <span>© Copyright 2020 </span>
      <a href={siteMetadata.githubLink} className={styles.link} target="blank">
        {siteMetadata.fullName}
      </a>
    </div>
  </footer>
)

Footer.propTypes = {
  siteMetadata: PropTypes.object,
}

export default Footer
