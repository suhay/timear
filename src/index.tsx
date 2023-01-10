import ReactDom from 'react-dom'

import { App } from './component/app'
import { TimearYamlType } from './types/yaml/timear'

const rootNode = document.getElementById('timear')

ReactDom.render(<App />, rootNode)

// Allow to be inserted into ExothermicJS application
export const register = {
  tags: {
    timear: TimearYamlType,
  },
}
