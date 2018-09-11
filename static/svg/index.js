import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default () => {
  const requireComponent = require.context(
    '.',
    // Do not look in subdirectories
    false,
    // Only include "_" prefixed .svg files
    /\.\/_[\w-]+\.icon\.svg$/
  )

  // For each matching file name...
  requireComponent.keys().forEach(fileName => {
    // Get the component config
    const componentConfig = requireComponent(fileName)
    // Get the PascalCase version of the component name
    const componentName = upperFirst(
      camelCase(
        fileName
          // Remove the "./_" from the beginning
          .replace(/^\.\/_/, '')
          // Remove the ".icon" in the middle
          .replace(/\.icon/, '')
          // Remove the file extension from the end
          .replace(/\.\w+$/, '')
      )
    )
    // Globally register the component

    // console.log(`svg:'${componentName}' has been registed as Svg${componentName}`)
    Vue.component(`Svg${componentName}`, componentConfig.default || componentConfig)
  })
}
