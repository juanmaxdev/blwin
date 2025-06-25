interface PersonajeProps {
  imagen: string
  className?: string
}

const Personaje = ({ imagen, className = "w-64 h-64" }: PersonajeProps) => {
  return (
    <div className={className}>
      <img src={imagen || "/placeholder.svg"} alt="Personaje" className="w-full h-full object-contain drop-shadow-lg" />
    </div>
  )
}

export default Personaje
