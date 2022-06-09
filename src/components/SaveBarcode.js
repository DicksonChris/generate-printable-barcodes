import { saveSvgAsPng } from "save-svg-as-png"
import { RiSave3Fill } from "react-icons/ri"
import { useBarcode } from "./BarcodeContext"
import timeout from "../utils/timeout"

const SaveBarcode = ({ itemName, setShowAlert, setAlertText }) => {
    const contextElement = useBarcode()

    return (
        <RiSave3Fill
            id='save-barcode-button'
            title='Download barcode as image'
            className='btn link-danger p-0 m-0'
            flex='1'
            onClick={(event) => {
                event.preventDefault()
                if (timeout(itemName, setShowAlert, setAlertText)) {
                    return
                }

                const svg = contextElement.querySelector("svg")
                const svgOuterHeight = parseInt(svg.getAttribute("height"), 10) + 2
                const svgOuterWidth = parseInt(svg.getAttribute("width"), 10) + 2

                saveSvgAsPng(svg, `${itemName}-barcode.png`, {
                    scale: 8,
                    backgroundColor: "white",

                    height: svgOuterHeight,
                    width: svgOuterWidth
                })
            }}
            onMouseDown={(event) => {
                event.preventDefault()
            }}
        />
    )
}

export default SaveBarcode
