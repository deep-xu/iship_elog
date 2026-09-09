import QueryWindow from '@/components/ui/QueryWindow.jsx'
import {
  SERIALIZED_ITEM_COLUMNS,
  SERIALIZED_ITEM_SECTIONS,
} from '@/data/serializedItemQuery.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Process', accel: 0 },
  { label: 'Reports', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function SerializedItemQueryWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Serialized Item Query"
      menus={MENUS}
      toolbar={['print', 'find']}
      sections={SERIALIZED_ITEM_SECTIONS}
      columns={SERIALIZED_ITEM_COLUMNS}
      panelWidth="47%"
    />
  )
}
