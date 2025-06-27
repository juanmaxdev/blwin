import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Comodin, { ComodinScrum, ComodinJefeMamon } from "../../../../preguntas/contenedor/contenedorComodines/comodin"
import { vi } from 'vitest'

describe("Componente Comodin básico", () => {
  const mockRecuperarVida = vi.fn()
  const mockDanyo = vi.fn()
  const mockCincuenta = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test("Renderiza los tres botones y sus estados", () => {
    render(
      <Comodin
        vida={true}
        danyo={false}
        cincuentaPorCiento={true}
        onRecuperarVida={mockRecuperarVida}
        onDanyo={mockDanyo}
        onCincuentaPorCiento={mockCincuenta}
      />
    )

    const btnVida = screen.getByRole("button", { name: /poción de vida/i })
    const btnDanyo = screen.getByRole("button", { name: /daño elemental/i })
    const btnCincuenta = screen.getByRole("button", { name: /sabiduría del 50%/i })

    expect(btnVida).toBeEnabled()
    expect(btnDanyo).toBeDisabled()
    expect(btnCincuenta).toBeEnabled()
  })

  test("Llama a las funciones onClick cuando los botones están habilitados", async () => {
    render(
      <Comodin
        vida={true}
        danyo={true}
        cincuentaPorCiento={true}
        onRecuperarVida={mockRecuperarVida}
        onDanyo={mockDanyo}
        onCincuentaPorCiento={mockCincuenta}
      />
    )

    await userEvent.click(screen.getByRole("button", { name: /poción de vida/i }))
    await userEvent.click(screen.getByRole("button", { name: /daño elemental/i }))
    await userEvent.click(screen.getByRole("button", { name: /sabiduría del 50%/i }))

    expect(mockRecuperarVida).toHaveBeenCalledTimes(1)
    expect(mockDanyo).toHaveBeenCalledTimes(1)
    expect(mockCincuenta).toHaveBeenCalledTimes(1)
  })
})

describe("Componente ComodinScrum", () => {
  const mockRecuperarVida = vi.fn()
  const mockRetro = vi.fn()
  const mockDaily = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test("Renderiza botones con estados correctos", () => {
    render(
      <ComodinScrum
        vida={false}
        retro={true}
        daily={false}
        onRecuperarVida={mockRecuperarVida}
        onRetro={mockRetro}
        onDaily={mockDaily}
      />
    )

    const btnVida = screen.getByRole("button", { name: /poción de vida/i })
    const btnRetro = screen.getByRole("button", { name: /retrospectiva/i })
    const btnDaily = screen.getByRole("button", { name: /reiniciar pregunta/i })

    expect(btnVida).toBeDisabled()
    expect(btnRetro).toBeEnabled()
    expect(btnDaily).toBeDisabled()
  })

  test("Llama a las funciones onClick", async () => {
    render(
      <ComodinScrum
        vida={true}
        retro={true}
        daily={true}
        onRecuperarVida={mockRecuperarVida}
        onRetro={mockRetro}
        onDaily={mockDaily}
      />
    )

    await userEvent.click(screen.getByRole("button", { name: /poción de vida/i }))
    await userEvent.click(screen.getByRole("button", { name: /retrospectiva/i }))
    await userEvent.click(screen.getByRole("button", { name: /reiniciar pregunta/i }))

    expect(mockRecuperarVida).toHaveBeenCalledTimes(1)
    expect(mockRetro).toHaveBeenCalledTimes(1)
    expect(mockDaily).toHaveBeenCalledTimes(1)
  })
})

describe("Componente ComodinJefeMamon", () => {
  const mockRecuperarVida = vi.fn()
  const mockBuscarInternet = vi.fn()
  const mockEscapar = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test("Renderiza botones con estados correctos", () => {
    render(
      <ComodinJefeMamon
        vida={true}
        buscarInternet={false}
        escapar={true}
        onRecuperarVida={mockRecuperarVida}
        onBuscarInternet={mockBuscarInternet}
        onEscapar={mockEscapar}
      />
    )

    const btnVida = screen.getByRole("button", { name: /poción de vida/i })
    const btnBuscar = screen.getByRole("button", { name: /sr.chatgpt/i })
    const btnEscapar = screen.getByRole("button", { name: /escapar/i })

    expect(btnVida).toBeEnabled()
    expect(btnBuscar).toBeDisabled()
    expect(btnEscapar).toBeEnabled()
  })

  test("Llama a las funciones onClick", async () => {
    render(
      <ComodinJefeMamon
        vida={true}
        buscarInternet={true}
        escapar={true}
        onRecuperarVida={mockRecuperarVida}
        onBuscarInternet={mockBuscarInternet}
        onEscapar={mockEscapar}
      />
    )

    await userEvent.click(screen.getByRole("button", { name: /poción de vida/i }))
    await userEvent.click(screen.getByRole("button", { name: /sr.chatgpt/i }))
    await userEvent.click(screen.getByRole("button", { name: /escapar/i }))

    expect(mockRecuperarVida).toHaveBeenCalledTimes(1)
    expect(mockBuscarInternet).toHaveBeenCalledTimes(1)
    expect(mockEscapar).toHaveBeenCalledTimes(1)
  })
})
