import { createContext, useContext, useReducer } from "react"

const BarcodeContext = createContext()

const BarcodeDispatchContext = createContext()

export const BarcodeProvider = ({ children }) => {
    const [barcodeRef, dispatch] = useReducer(barcodeReducer, null)

    return (
        <BarcodeContext.Provider value={barcodeRef}>
            <BarcodeDispatchContext.Provider value={dispatch}>
                {children}
            </BarcodeDispatchContext.Provider>
        </BarcodeContext.Provider>
    )
}

export function useBarcode() {
    return useContext(BarcodeContext)
}

export function useBarcodeDispatch() {
    return useContext(BarcodeDispatchContext)
}

function barcodeReducer(barcodeRef, action) {
    switch (action.type) {
        case "SET_BARCODE_REF":
            return action.ref
        default:
            return barcodeRef
    }
}
