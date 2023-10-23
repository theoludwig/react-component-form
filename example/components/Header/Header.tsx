import { Language } from "./Language"
import { SwitchTheme } from "./SwitchTheme"

export const Header: React.FC = () => {
  return (
    <header className="flex justify-center mt-6">
      <Language />
      <SwitchTheme />
    </header>
  )
}
