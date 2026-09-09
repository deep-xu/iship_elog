import QueryWindow from '@/components/ui/QueryWindow.jsx'
import {
  TECHNICAL_DEFECT_COLUMNS,
  TECHNICAL_DEFECT_SECTIONS,
} from '@/data/technicalDefectList.js'

const MENUS = [
  { label: 'File', accel: 0 },
  { label: 'Tag', accel: 0 },
  { label: 'Process', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function TechnicalDefectListWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Technical Defect List"
      menus={MENUS}
      toolbar={['open', 'print']}
      sections={TECHNICAL_DEFECT_SECTIONS}
      columns={TECHNICAL_DEFECT_COLUMNS}
      panelWidth="42%"
    />
  )
}
