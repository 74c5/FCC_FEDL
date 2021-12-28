const { PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase, {defaultConfig} ) => {
  
  /*  use basepath for github.io page */
  if (phase === PHASE_PRODUCTION_BUILD) {
            
      return {
          ...defaultConfig,
          basePath: '/demos/FEDL/TwentyFiveAndFiveTimer',
          assetPrefix: '/demos/FEDL/TwentyFiveAndFiveTimer'
      }

  
  }

  /* All other phases */
    
    return { 
      ...defaultConfig,
      reactStrictMode: true 
    };
}
