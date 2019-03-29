import React from 'react';
import Layout from './Layout';

export default ({children}) =>
    <div className="app-container" id="app-container">
        <Layout>
        {children}
      </Layout>
    </div>