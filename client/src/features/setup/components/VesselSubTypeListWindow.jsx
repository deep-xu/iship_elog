import DescriptionListWindow from '@/features/work-management/components/DescriptionListWindow.jsx'

const ROWS = [
  '1112 TEU',
  '13700 TEU',
  '13828 TEU',
  '13894 TEU',
  '13900 TEU',
  '13932 TEU',
  '1708 TEU',
  '3015 TEU',
  '4253 TEU',
  '4432 TEU',
  '4500 TEU',
  '4520 TEU',
  '5610 TEU',
  '6320 TEU',
  '6326 TEU',
  '6350 TEU',
  '6724 TEU',
  '8102 TEU',
  '8212 TEU',
  '8614 TEU',
  '8930 TEU',
  '8974 TEU',
  '9040 TEU',
  '9592 TEU',
]

export default function VesselSubTypeListWindow(props) {
  return <DescriptionListWindow {...props} title="Vessel Sub-Type List" rows={ROWS} />
}
