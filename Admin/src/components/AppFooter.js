import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="" target="_blank" rel="noopener noreferrer">
          
        </a>
        <span className="ms-1">&copy; Admin Dashboard.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <p href="" target="_blank" rel="noopener noreferrer">
          <span>E</span>-Mart Admin Dashboard
        </p>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
