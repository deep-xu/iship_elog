import QueryWindow from '@/components/ui/QueryWindow.jsx'
import { QUERY_SECTIONS, RESULT_COLUMNS } from '@/data/complianceJobQuery.js'

export default function ComplianceJobQueryWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Compliance Job Query"
      menus={[{ label: 'Compliance Job' }, { label: 'Tag' }, { label: 'Help' }]}
      toolbar={['open', 'find', 'refresh']}
      sections={QUERY_SECTIONS}
      columns={RESULT_COLUMNS}
    />
  )
}
