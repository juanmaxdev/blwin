interface GradientCharacterProps {
  src: string;
  alt: string;
  gradientFrom: string;
  gradientTo: string;
}

const GradientCharacter = ({ src, alt, gradientFrom, gradientTo }: GradientCharacterProps) => (
  <div className="flex justify-center relative">
    <div
      className={`absolute w-64 h-64 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-full blur-2xl opacity-60`}
    ></div>

    <img
      src={src}
      alt={alt}
      className="max-h-[450px] w-auto object-contain drop-shadow-lg relative z-10"
    />
  </div>
);

export default GradientCharacter;
