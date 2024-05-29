import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'

type ContextType = {
  searchTxt: string
  setSearchTxt: Dispatch<SetStateAction<string>>
}

const SearchContext = createContext<ContextType>({ searchTxt: '', setSearchTxt: () => {} })

export const useSearchContext = () => useContext(SearchContext)

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTxt, setSearchTxt] = useState<string>('')

  return (
    <SearchContext.Provider value={{ searchTxt, setSearchTxt }}>{children}</SearchContext.Provider>
  )
}
