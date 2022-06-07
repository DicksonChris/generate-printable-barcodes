import { saveSvgAsPng } from "save-svg-as-png"
import { RiSave3Fill } from "react-icons/ri"
import { useBarcode } from "./BarcodeContext"
import timeout from "../utils/timeout"

const SaveBarcode = ({ itemName, setShowAlert, setAlertText }) => {
    const contextElement = useBarcode()

    return (
        <div>
            <button
                id='save-barcode-button'
                className='btn link-danger p-0 m-0'
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
                onMouseDown={(event)=>{
                    event.preventDefault()
                }}
            >
                <span title="Download barcode as image">
                    <RiSave3Fill size='40'/>
                </span>
            </button>
        </div>
    )
}

export default SaveBarcode
