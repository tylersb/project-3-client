import Section from './Section'

export default function Menu({ menu, section, currentProduct }) {
  return (
    <div>
      {menu.map((s) => {
        return (
          <Section
            key={s.sectionName}
            section={s}
            currentProduct={currentProduct}
          />
        )
      })}
      {section.sectionName.length > 0 ? (
        <Section section={section} currentProduct={currentProduct} />
      ) : null}
    </div>
  )
}
