import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import favicon from '../../assets/photos/favicon.png'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="Blog by John Doe">
          <link rel="shortcut icon" type="image/png" href={favicon} />
        </Helmet>

        {children}
      </div>
    )
  }
}

export default Layout
