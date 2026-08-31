import DescriptionListWindow from './DescriptionListWindow.jsx'

const ROWS = []

export default function JsaIdentifierListWindow(props) {
  return <DescriptionListWindow {...props} title="JSA Identifier List" rows={ROWS} />
}
