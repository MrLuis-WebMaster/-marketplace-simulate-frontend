import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  FC,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from 'react'

interface DropdownContextProps {
  isOpen: boolean
  toggleDropdown: () => void
}

const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined,
)

interface DropdownProps {
  children: React.ReactNode
}

interface DropdownButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

interface DropdownBodyProps extends Props { }

interface DropdownComponent extends FC<DropdownProps> {
  Button: FC<DropdownButtonProps>
  Body: FC<DropdownBodyProps>
}

const Dropdown: DropdownComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown)

    return () => {
      document.removeEventListener('mousedown', closeDropdown)
    }
  }, [])

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown }}>
      <div ref={dropdownRef} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

const DropdownButton: FC<DropdownButtonProps> = ({
  children,
  ...buttonProps
}) => {
  const { toggleDropdown } = useContext(DropdownContext)!

  return (
    <button
      onClick={toggleDropdown}
      className="focus:outline-none"
      {...buttonProps}
    >
      {children}
    </button>
  )
}

const DropdownBody: FC<DropdownBodyProps> = ({ children, ...divProps }) => {
  const { isOpen } = useContext(DropdownContext)!

  return (
    isOpen && (
      <div
        className="absolute z-[5] top-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-md"
        {...divProps}
      >
        {children}
      </div>
    )
  )
}

Dropdown.Button = DropdownButton
Dropdown.Body = DropdownBody

export default Dropdown
