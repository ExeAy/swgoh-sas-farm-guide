import { Notes } from "../../model/farm-guide"

const NoteBlock = (props: { notes?: Notes }) => {
  const { notes } = props

  if (!notes) {
    return null
  }

  const { header, texts } = notes

  return (
    <div className="text-base">
      {header ? <h3 className="font-bold mb-2">{header}</h3> : null}
      <ul>{texts?.map((text, index) => <li key={index}>{text}</li>)}</ul>
    </div>
  )
}

export default NoteBlock
