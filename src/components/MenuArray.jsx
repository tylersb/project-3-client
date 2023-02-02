import Section from './Section'

export default function MenuArray({ menu, section, currentProduct }) {
  return (
    <div>
      {menu.map((s) => {
        return (
          <Section
            key={s.sectionName}
            section={s}
          />
        )
      })}
      {section.sectionName.length > 0 ? (
        <Section section={section} currentProduct={currentProduct} />
      ) : null}
    </div>
  )
}
