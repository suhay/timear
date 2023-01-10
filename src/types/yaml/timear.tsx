import { App } from '../../component/app'

export const TimearYamlType = (_yaml: any, explicitName?: string) =>
  new _yaml.Type(`!${explicitName ?? 'timear'}`, {
    kind: 'mapping',
    construct() {
      return <App key='timear' />
    },
    instanceOf: App,
  })
