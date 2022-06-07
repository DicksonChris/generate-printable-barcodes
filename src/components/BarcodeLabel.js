import Barcode from "react-jsbarcode" 
import { useRef, useEffect } from "react"
import { useBarcodeDispatch } from "./BarcodeContext"

const BarcodeLabel = ({ itemName, barcodeDims: { height, textSize, marginX } }) => { 
    const dispatch = useBarcodeDispatch()

    const barcodeParentRef = useRef(null)

    const value = itemName

    const options = {
        width: 1,
        height,
        displayValue: true,
        margin: 0,
        marginLeft: marginX,
        marginRight: marginX,
        textAlign: "center",
        textMargin: 0,
        fontSize: textSize,
        font: "sans-serif"
    }
    const wrapperStyle = {
        border: "white 2px solid",
        backgroundColor: "white",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        display: "flex",
        flexDirection: "row",
        flex: "1 1 auto",
        padding: "0.3rem"
    }

    useEffect(() => {
        dispatch({
            type: "SET_BARCODE_REF",
            ref: barcodeParentRef.current
        })
    }, [barcodeParentRef, dispatch])


    return (
        <>
            <div id='parent-of-barcode-ref' style={wrapperStyle} ref={barcodeParentRef}>
                {value ? (
                    <Barcode value={value} options={options} />
                ) : (
                    <span className='d-inline-flex p-0 text-center w-100 align-self-center'>
                        Input item #
                    </span>
                )}
            </div>
        </>
    )
}
export default BarcodeLabel
